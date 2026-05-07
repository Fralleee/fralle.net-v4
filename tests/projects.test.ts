import { describe, expect, test } from "bun:test";
import { projects } from "../src/data/projects";

describe("projects data", () => {
  test("contains all seven projects", () => {
    expect(projects).toHaveLength(7);
    expect(projects[0]?.title).toBe("Cooking with Fralle");
    expect(projects.at(-1)?.title).toBe("VAKT");
  });

  test("only the first project is featured with a Latest badge", () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0]?.title).toBe("Cooking with Fralle");
    expect(featured[0]?.badge).toBe("Latest");
  });

  test("every record has the required fields populated", () => {
    for (const p of projects) {
      expect(p.title).not.toBe("");
      expect(p.subtitle).not.toBe("");
      expect(p.url).toMatch(/^https?:\/\//);
      expect(p.details.length).toBeGreaterThan(20);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.logo).toMatch(/^\/projects\/[a-z0-9-]+\.png$/);
      expect(p.links.length).toBeGreaterThan(0);
      for (const link of p.links) {
        expect(link.label).not.toBe("");
        expect(link.href).toMatch(/^https?:\/\//);
      }
    }
  });

  test("sparkline records carry a value, label and at least two data points", () => {
    const withSparkline = projects.filter((p) => p.sparkline);
    expect(withSparkline.length).toBeGreaterThan(0);
    for (const p of withSparkline) {
      expect(p.sparkline?.value).not.toBe("");
      expect(p.sparkline?.label).not.toBe("");
      expect(p.sparkline?.data.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });
});
