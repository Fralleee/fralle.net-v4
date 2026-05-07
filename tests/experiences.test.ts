import { describe, expect, test } from "bun:test";
import { experiences } from "../src/data/experiences";

describe("experiences data", () => {
  test("contains all six roles in reverse-chronological order", () => {
    expect(experiences).toHaveLength(6);
    expect(experiences[0]?.company).toBe("GetHarley");
    expect(experiences.at(-1)?.company).toBe("Asitis");
  });

  test("only the current role is flagged live", () => {
    const liveRoles = experiences.filter((e) => e.live);
    expect(liveRoles).toHaveLength(1);
    expect(liveRoles[0]?.company).toBe("GetHarley");
  });

  test("every record has the required fields populated", () => {
    for (const e of experiences) {
      expect(e.period).not.toBe("");
      expect(e.title).not.toBe("");
      expect(e.company).not.toBe("");
      expect(e.url).toMatch(/^https?:\/\//);
      expect(e.location).not.toBe("");
      expect(e.details.length).toBeGreaterThan(20);
      expect(e.tags.length).toBeGreaterThan(0);
      expect(e.logoText.length).toBeGreaterThan(0);
      expect(e.logoBg).toMatch(/^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
    }
  });
});
