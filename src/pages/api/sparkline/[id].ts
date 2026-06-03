import type { APIRoute } from "astro";
import { allowedSparklineIds } from "../../../data/sparklines";

export const prerender = false;

const FETCH_TIMEOUT_MS = 8000;

// 24h fresh + 24h SWR + 24h stale-if-error → PostHog hit at most once per region per day.
const successCacheHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400, stale-if-error=86400",
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

interface PostHogInsightListResponse {
  results: PostHogInsightListItem[];
}

interface PostHogInsightDetail {
  result: { data?: number[] }[];
}

function isInsightListResponse(v: unknown): v is PostHogInsightListResponse {
  if (typeof v !== "object" || v === null) return false;
  const results = (v as { results?: unknown }).results;
  if (!Array.isArray(results)) return false;
  return results.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as { id?: unknown }).id === "number" &&
      typeof (item as { short_id?: unknown }).short_id === "string",
  );
}

function isInsightDetail(v: unknown): v is PostHogInsightDetail {
  if (typeof v !== "object" || v === null) return false;
  const result = (v as { result?: unknown }).result;
  if (!Array.isArray(result)) return false;
  return result.every((r) => typeof r === "object" && r !== null);
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

class UpstreamError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

async function resolveInsightSeries(
  host: string,
  projectId: string,
  apiKey: string,
  shortId: string,
): Promise<{ total: number; data: number[] }> {
  const listUrl = new URL(`/api/projects/${projectId}/insights/`, host);
  listUrl.searchParams.set("short_id", shortId);
  const list = await fetchJSON(listUrl.toString(), apiKey);
  if (!isInsightListResponse(list)) {
    throw new UpstreamError("unexpected list shape", 502);
  }
  const insightId = list.results.find((i) => i.short_id === shortId)?.id;
  if (!insightId) {
    throw new UpstreamError("insight not found", 404);
  }

  const detailUrl = new URL(`/api/projects/${projectId}/insights/${insightId}/`, host);
  detailUrl.searchParams.set("refresh", "force_blocking");
  const detail = await fetchJSON(detailUrl.toString(), apiKey);
  if (!isInsightDetail(detail)) {
    throw new UpstreamError("unexpected detail shape", 502);
  }
  const data = detail.result[0]?.data;
  if (!Array.isArray(data) || !data.every((n) => typeof n === "number")) {
    throw new UpstreamError("unexpected payload shape", 502);
  }
  return { total: data.reduce((a, b) => a + b, 0), data };
}

function errorResponse(message: string, status: number): Response {
  const headers = status === 404 ? rejectCacheHeaders : errorCacheHeaders;
  return new Response(JSON.stringify({ error: message }), { status, headers });
}

// fallow-ignore-next-line complexity — orchestrator branches reflect request/env validation + upstream error mapping; no direct unit test yet (mocked via component integration test only).
export const GET: APIRoute = async ({ params, request }) => {
  // Edge caches key on the full URL — `?t=…` cache-busters would defeat s-maxage.
  if (new URL(request.url).search !== "") {
    return new Response(JSON.stringify({ error: "no query params expected" }), {
      status: 400,
      headers: rejectCacheHeaders,
    });
  }

  const id = params.id;
  if (typeof id !== "string" || !allowedSparklineIds.has(id)) {
    return errorResponse("unknown sparkline id", 404);
  }

  const host = import.meta.env.POSTHOG_HOST;
  const apiKey = import.meta.env.POSTHOG_PROJECT_API_KEY;
  const projectId = import.meta.env.POSTHOG_PROJECT_ID;
  if (!host || !apiKey || !projectId) {
    return errorResponse("PostHog not configured", 503);
  }

  try {
    const { total, data } = await resolveInsightSeries(host, projectId, apiKey, id);
    return new Response(JSON.stringify({ value: formatTotal(total), data }), {
      status: 200,
      headers: successCacheHeaders,
    });
  } catch (error) {
    if (error instanceof UpstreamError) return errorResponse(error.message, error.status);
    const message = error instanceof Error ? error.message : "unknown error";
    return errorResponse(message, 502);
  }
};
