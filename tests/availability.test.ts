import { describe, expect, test } from "bun:test";
import { parseAvailable } from "../src/data/availability";

describe("parseAvailable", () => {
  test('returns false only for the literal string "false"', () => {
    expect(parseAvailable("false")).toBe(false);
  });

  test("returns true when the env var is missing or empty", () => {
    expect(parseAvailable(undefined)).toBe(true);
    expect(parseAvailable("")).toBe(true);
  });

  test('returns true for any value other than "false"', () => {
    expect(parseAvailable("true")).toBe(true);
    expect(parseAvailable("TRUE")).toBe(true);
    expect(parseAvailable("1")).toBe(true);
    expect(parseAvailable("yes")).toBe(true);
    expect(parseAvailable("False")).toBe(true);
  });
});
