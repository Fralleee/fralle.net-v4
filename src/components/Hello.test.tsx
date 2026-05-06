import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";

describe("Hello", () => {
  test("renders default greeting", () => {
    render(<Hello />);
    expect(screen.getByText("hello world")).toBeDefined();
  });

  test("renders custom name", () => {
    render(<Hello name="roland" />);
    expect(screen.getByText("hello roland")).toBeDefined();
  });
});
