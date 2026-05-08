import type { APIRoute } from "astro";
import { projects } from "../../../data/projects";

export const prerender = false;

const FETCH_TIMEOUT_MS = 8000;

const allowedIds = new Set(projects.flatMap((p) => (p.sparkline ? [p.sparkline.posthogId] : [])));

// 10 min fresh + 24h SWR + 24h stale-if-error → PostHog hit at most ~6×/hour.
const successCacheHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400, stale-if-error=86400",
};

// 1h cache absorbs typo/probe storms; new deploys invalidate.
const rejectCacheHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=3600",
};

// Short cache stops a hot client turning an outage into an invocation fountain.
const errorCacheHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=60, stale-if-error=300",
};

interface PostHogInsightListItem {
  id: number;
  short_id: string;
}

interface PostHogInsightDetail {
  result?: { data?: number[] }[];
}

function formatTotal(total: number): string {
  if (total >= 1_000_000) return `${(total / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (total >= 1_000) return `${(total / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${total}`;
}

async function fetchJSON(url: string, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`PostHog responded ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const GET: APIRoute = async ({ params, request }) => {
  // Edge caches key on the full URL — `?t=…` cache-busters would defeat s-maxage.
  if (new URL(request.url).search !== "") {
    return new Response(JSON.stringify({ error: "no query params expected" }), {
      status: 400,
      headers: rejectCacheHeaders,
    });
  }

  const id = params.id;
  if (typeof id !== "string" || !allowedIds.has(id)) {
    return new Response(JSON.stringify({ error: "unknown sparkline id" }), {
      status: 404,
      headers: rejectCacheHeaders,
    });
  }

  const host = import.meta.env.POSTHOG_HOST;
  const apiKey = import.meta.env.POSTHOG_PROJECT_API_KEY;
  const projectId = import.meta.env.POSTHOG_PROJECT_ID;
  if (!host || !apiKey || !projectId) {
    return new Response(JSON.stringify({ error: "PostHog not configured" }), {
      status: 503,
      headers: errorCacheHeaders,
    });
  }

  try {
    const listUrl = new URL(`/api/projects/${projectId}/insights/`, host);
    listUrl.searchParams.set("short_id", id);
    const list = (await fetchJSON(listUrl.toString(), apiKey)) as {
      results?: PostHogInsightListItem[];
    };
    const insightId = list.results?.find((i) => i.short_id === id)?.id;
    if (!insightId) {
      return new Response(JSON.stringify({ error: "insight not found" }), {
        status: 404,
        headers: rejectCacheHeaders,
      });
    }

    const detailUrl = new URL(`/api/projects/${projectId}/insights/${insightId}/`, host);
    detailUrl.searchParams.set("refresh", "force_blocking");
    const detail = (await fetchJSON(detailUrl.toString(), apiKey)) as PostHogInsightDetail;
    const data = detail.result?.[0]?.data;
    if (!Array.isArray(data) || !data.every((n) => typeof n === "number")) {
      return new Response(JSON.stringify({ error: "unexpected payload shape" }), {
        status: 502,
        headers: errorCacheHeaders,
      });
    }

    const total = data.reduce((a, b) => a + b, 0);
    return new Response(JSON.stringify({ value: formatTotal(total), data }), {
      status: 200,
      headers: successCacheHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: errorCacheHeaders,
    });
  }
};
