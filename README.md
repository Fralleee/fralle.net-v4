<div align="center">

<img src="public/icon.svg" alt="fralle.net" width="96" height="96" />

# fralle.net

Personal portfolio for **Roland Chelwing** — fullstack software engineer based in Sweden.

[![Astro](https://img.shields.io/badge/Astro-6-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-1.3-000000?logo=bun&logoColor=white)](https://bun.sh)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)

[**Live site**](https://fralle.net)

</div>

---

A single-page, content-driven portfolio that ships ~zero JavaScript by default. One small React island fetches live PostHog metrics for the project sparklines; everything else is static HTML rendered at build time. Lighthouse 100, out of the box.

## Highlights

- **Astro 6 static output** with selectively hydrated React islands (`client:visible`).
- **Tailwind v4** via `@tailwindcss/vite` — CSS-first config, no PostCSS pipeline.
- **Live sparklines** from PostHog, proxied through a Vercel serverless route with edge caching (`s-maxage=600, stale-while-revalidate=86400`).
- **Env-driven availability toggle** — flip the "Open to new roles" badge by changing one Vercel env var. No code change, no third-party feature flag service.
- **Generated assets** — favicon set and OpenGraph image rebuilt from `src/assets/icon.svg` on every `dev`/`build`.
- **Strict tooling**: Biome (lint + format), Knip (unused exports/deps), Lefthook git hooks, `bun test` + `happy-dom` + Testing Library.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro 6](https://astro.build) (static output, React islands) |
| UI runtime | React 19 + TypeScript (strict) |
| Styles | [Tailwind v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Package manager + runtime | [Bun](https://bun.sh) |
| Lint + format | [Biome](https://biomejs.dev) |
| Unused deps / exports | [Knip](https://knip.dev) |
| Git hooks | [Lefthook](https://lefthook.dev) (pre-commit: Biome + typecheck · pre-push: Knip) |
| Test runner | `bun test` + `happy-dom` + Testing Library |
| CI | GitHub Actions (`bun run ci` on PRs and `main`) |
| Hosting | [Vercel](https://vercel.com) (`@astrojs/vercel` adapter) |

> [!NOTE]
> The site is one route, mostly static (about / experience / projects / articles), with one small interactive island (the project sparklines). Astro ships zero JS by default and hydrates only the React components that need it.
