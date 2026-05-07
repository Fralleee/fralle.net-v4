import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { Sparkline } from "./Sparkline";

describe("Sparkline", () => {
  test("renders nothing for empty or single-point data", () => {
    const { container: empty } = render(<Sparkline data={[]} />);
    expect(empty.querySelector("svg")).toBeNull();

    const { container: single } = render(<Sparkline data={[10]} />);
    expect(single.querySelector("svg")).toBeNull();
  });

  test("renders one line and one area path with the right point count", () => {
    const { container } = render(<Sparkline data={[1, 5, 3, 8, 4]} width={200} height={32} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();

    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(2);

    const linePath = paths[1]?.getAttribute("d") ?? "";
    const moveToLineSegments = linePath.match(/L /g) ?? [];
    expect(moveToLineSegments).toHaveLength(4);
  });

  test("anchors the line path to the padded edges", () => {
    const { container } = render(<Sparkline data={[10, 20, 30]} width={100} height={20} />);
    const linePath = container.querySelectorAll("path")[1]?.getAttribute("d") ?? "";

    expect(linePath.startsWith("M 2,")).toBe(true);
    expect(linePath.includes(" L 98,")).toBe(true);
  });
});
