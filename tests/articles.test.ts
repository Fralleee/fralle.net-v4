import { describe, expect, test } from "bun:test";
import { articles } from "../src/data/articles";

describe("articles data", () => {
  test("contains all three Medium posts", () => {
    expect(articles).toHaveLength(3);
    expect(articles[0]?.title).toBe("Using OpenAPI to detect breaking changes in tRPC");
    expect(articles.at(-1)?.title).toBe("Overengineering the Fibonacci sequence in JavaScript");
  });

  test("every record has the required fields populated", () => {
    for (const a of articles) {
      expect(a.title).not.toBe("");
      expect(a.subtitle).toMatch(/^Medium · \d{4}$/);
      expect(a.url).toMatch(/^https:\/\/medium\.com\//);
      expect(a.details.length).toBeGreaterThan(20);
      expect(a.tags.length).toBeGreaterThan(0);
      expect(a.logo).toMatch(/^\/articles\/[a-z0-9-]+\.webp$/);
      expect(a.links.length).toBeGreaterThan(0);
      for (const link of a.links) {
        expect(link.label).not.toBe("");
        expect(link.href).toMatch(/^https?:\/\//);
      }
    }
  });

  test("the article URL matches the first link href", () => {
    for (const a of articles) {
      expect(a.links[0]?.href).toBe(a.url);
    }
  });
});
