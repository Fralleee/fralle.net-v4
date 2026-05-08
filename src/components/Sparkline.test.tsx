import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { render, waitFor } from "@testing-library/react";
import { computePath, Sparkline } from "./Sparkline";

describe("computePath", () => {
  test("returns null for empty or single-point data", () => {
    expect(computePath([], 200, 32)).toBeNull();
    expect(computePath([10], 200, 32)).toBeNull();
  });

  test("anchors the line path to the padded edges", () => {
    const path = computePath([10, 20, 30], 100, 20);
    expect(path).not.toBeNull();
    const line = path?.line ?? "";
    expect(line.startsWith("M 2,")).toBe(true);
    expect(line.includes(" L 98,")).toBe(true);
  });

  test("emits N-1 line segments for N points", () => {
    const path = computePath([1, 5, 3, 8, 4], 200, 32);
    const segments = path?.line.match(/L /g) ?? [];
    expect(segments).toHaveLength(4);
  });

  test("the area path closes back to the baseline", () => {
    const path = computePath([1, 2, 3], 100, 20);
    expect(path?.area).toMatch(/L 98,20 L 2,20 Z$/);
  });
});

describe("Sparkline component", () => {
  const realFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = realFetch;
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  function getWrap(container: HTMLElement): HTMLElement {
    const wrap = container.querySelector(".sparkline-wrap");
    if (!(wrap instanceof HTMLElement)) throw new Error("wrap missing");
    return wrap;
  }

  test("renders the loading placeholder before fetch resolves", () => {
    const fetchMock = mock((_input: RequestInfo | URL, _init?: RequestInit) => new Promise<Response>(() => {}));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { container } = render(<Sparkline posthogId="abc123" label="Visitors" />);
    const wrap = getWrap(container);
    expect(wrap.dataset.status).toBe("loading");
    expect(wrap.querySelector(".sparkline-num")?.textContent).toBe("—");
    expect(wrap.querySelector(".sparkline-lbl")?.textContent).toBe("Visitors");
    expect(fetchMock.mock.calls[0]?.[0]).toBe("/api/sparkline/abc123");
  });

  test("transitions to ready and renders the value after a successful fetch", async () => {
    const fetchMock = mock(() =>
      Promise.resolve(
        new Response(JSON.stringify({ value: "1.2k", data: [1, 2, 3, 4, 5] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { container } = render(<Sparkline posthogId="abc123" label="Visitors" />);
    const wrap = getWrap(container);

    await waitFor(() => {
      expect(wrap.dataset.status).toBe("ready");
    });
    expect(wrap.querySelector(".sparkline-num")?.textContent).toBe("1.2k");
    expect(wrap.querySelectorAll("path")).toHaveLength(2);
  });

  test("transitions to error when the fetch fails", async () => {
    const fetchMock = mock(() => Promise.resolve(new Response("upstream down", { status: 502 })));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { container } = render(<Sparkline posthogId="abc123" label="Visitors" />);
    const wrap = getWrap(container);

    await waitFor(() => {
      expect(wrap.dataset.status).toBe("error");
    });
    expect(wrap.querySelector(".sparkline-num")?.textContent).toBe("—");
    expect(wrap.querySelectorAll("path")).toHaveLength(0);
  });

  test("renders the value when valid response carries fewer than 2 points", async () => {
    const fetchMock = mock(() =>
      Promise.resolve(
        new Response(JSON.stringify({ value: "0", data: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { container } = render(<Sparkline posthogId="abc123" label="Visitors" />);
    const wrap = getWrap(container);

    await waitFor(() => {
      expect(wrap.dataset.status).toBe("ready");
    });
    expect(wrap.querySelector(".sparkline-num")?.textContent).toBe("0");
    // computePath returns null for <2 points, so the SVG renders empty.
    expect(wrap.querySelectorAll("path")).toHaveLength(0);
  });

  test("rejects responses whose payload doesn't match SparklineResponse", async () => {
    const fetchMock = mock(() =>
      Promise.resolve(
        new Response(JSON.stringify({ value: 12, data: "not-an-array" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { container } = render(<Sparkline posthogId="abc123" label="Visitors" />);
    const wrap = getWrap(container);

    await waitFor(() => {
      expect(wrap.dataset.status).toBe("error");
    });
  });

  test("aborts an in-flight fetch when the component unmounts", () => {
    let signal: AbortSignal | undefined;
    const fetchMock = mock((_url: string, init?: RequestInit) => {
      signal = init?.signal ?? undefined;
      return new Promise<Response>(() => {});
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { unmount } = render(<Sparkline posthogId="abc123" label="Visitors" />);
    expect(signal?.aborted).toBe(false);
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});
