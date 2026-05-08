import { useEffect, useId, useState } from "react";

export interface SparklineProps {
  posthogId: string;
  label: string;
  width?: number;
  height?: number;
}

interface SparklineResponse {
  value: string;
  data: number[];
}

interface FetchState {
  status: "loading" | "ready" | "error";
  value: string;
  data: number[];
}

const initialState: FetchState = { status: "loading", value: "—", data: [] };
const errorState: FetchState = { status: "error", value: "—", data: [] };

function isSparklineResponse(json: unknown): json is SparklineResponse {
  if (typeof json !== "object" || json === null) return false;
  const value = (json as { value?: unknown }).value;
  const data = (json as { data?: unknown }).data;
  return typeof value === "string" && Array.isArray(data) && data.every((n) => typeof n === "number");
}

export function Sparkline({ posthogId, label, width = 200, height = 32 }: SparklineProps) {
  const gradientId = useId();
  const [state, setState] = useState<FetchState>(initialState);

  useEffect(() => {
    const controller = new AbortController();
    setState(initialState);

    fetch(`/api/sparkline/${encodeURIComponent(posthogId)}`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? (r.json() as Promise<unknown>) : Promise.reject(r.status)))
      .then((json) => {
        if (controller.signal.aborted) return;
        if (!isSparklineResponse(json)) {
          setState(errorState);
          return;
        }
        // A valid response with sparse data is still a "ready" state — we keep
        // the legitimate count and let computePath skip the line.
        setState({ status: "ready", value: json.value, data: json.data });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setState(errorState);
      });

    return () => controller.abort();
  }, [posthogId]);

  const path = computePath(state.data, width, height);

  return (
    <div className="sparkline-wrap" data-status={state.status}>
      <div className="sparkline-meta">
        <span className="sparkline-num">{state.value}</span>
        <span className="sparkline-lbl">{label}</span>
      </div>
      <svg className="sparkline-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        {path && (
          <>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={path.area} fill={`url(#${gradientId})`} />
            <path
              d={path.line}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}

interface SparklinePath {
  line: string;
  area: string;
}

export function computePath(data: readonly number[], width: number, height: number): SparklinePath | null {
  if (data.length < 2) return null;

  const pad = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (width - pad * 2) / (data.length - 1);

  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });

  const line = `M ${points.join(" L ")}`;
  const area = `${line} L ${width - pad},${height} L ${pad},${height} Z`;
  return { line, area };
}
