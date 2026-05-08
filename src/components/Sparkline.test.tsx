import { describe, expect, test } from "bun:test";
import { computePath } from "./Sparkline";

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
