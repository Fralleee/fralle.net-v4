import { describe, expect, test } from "bun:test";
import { parseAvailable } from "../src/data/availability";

describe("parseAvailable", () => {
  test('returns true only for the literal string "true"', () => {
    expect(parseAvailable("true")).toBe(true);
  });

  test("returns false when the env var is missing or empty", () => {
    expect(parseAvailable(undefined)).toBe(false);
    expect(parseAvailable("")).toBe(false);
  });

  test('returns false for any value other than "true"', () => {
    expect(parseAvailable("false")).toBe(false);
    expect(parseAvailable("TRUE")).toBe(false);
    expect(parseAvailable("True")).toBe(false);
    expect(parseAvailable("1")).toBe(false);
    expect(parseAvailable("yes")).toBe(false);
  });
});
