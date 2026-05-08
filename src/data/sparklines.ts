export const sparklines = {
  cookingWithFralle: { posthogId: "7OrpqaRG", label: "Visitors (30 days)" },
  copyContext: { posthogId: "qZPEi5DV", label: "Commands invoked (90 days)" },
} as const satisfies Record<string, { posthogId: string; label: string }>;

export const allowedSparklineIds: ReadonlySet<string> = new Set(Object.values(sparklines).map((s) => s.posthogId));
