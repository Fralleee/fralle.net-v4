# fralle.net

Personal portfolio for Roland Chelwing. Replaces [fralle.net-v3](https://fralle.net).

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro 6](https://astro.build) (static output, React islands) |
| UI runtime | React 19 + TypeScript (strict) |
| Styles | [Tailwind v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Package manager + runtime | [Bun](https://bun.sh) |
| Lint + format | [Biome](https://biomejs.dev) |
| Unused deps / exports | [Knip](https://knip.dev) |
| Git hooks | [Lefthook](https://lefthook.dev) (pre-commit Biome+typecheck, pre-push Knip) |
| Test runner | `bun test` + `happy-dom` + Testing Library *(PR 3)* |
| CI | GitHub Actions *(PR 4)* |
| Hosting | [Vercel](https://vercel.com) (`@astrojs/vercel` adapter) |

### Why Astro

The site is one route, mostly static (about / experience / projects / articles), with three small interactive islands (palette state, sparklines, availability flag). Astro ships zero JS by default and hydrates only the React components that need it — Lighthouse 100 out of the box.

### Why an env var (not a feature flag service) for availability

The "Open to new roles" toggle is a single boolean that flips a few times a year. A 30-second redeploy on a Vercel env var change is cheaper than adding a third-party SDK, runtime fetch, or first-paint flicker.

## Commands

```sh
bun install           # install dependencies (also wires lefthook git hooks)
bun dev               # start local dev server (http://localhost:4321)
bun run build         # build production output to ./dist + .vercel/output
bun run preview       # preview the built site locally
bun run lint          # biome check (lint + format check, no writes)
bun run format        # biome check --write (lint + format with autofix)
bun run typecheck     # astro check (.astro + .ts + .tsx)
bun run knip          # find unused files / deps / exports
bun run test          # bun test (passes with no tests until PR 3)
bun run ci            # lint + typecheck + knip + test + build (full local CI)
```

Pre-commit (Lefthook) runs Biome + `astro check` on staged files. Pre-push runs Knip.

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable | Effect |
| --- | --- |
| `PUBLIC_AVAILABLE_FOR_HIRE` | `true` / `false` — controls availability badge & top-nav status. Wired in PR 12. |

## Project layout

```text
.
├── public/                # static assets served as-is
├── src/
│   ├── pages/             # one .astro file per route
│   └── styles/global.css  # imports tailwindcss; design tokens land here in PR 5
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Roadmap

This repo is being built incrementally — see [`C:\Users\jolle\.claude\plans\i-want-to-create-resilient-cat.md`](https://example.invalid) for the PR-by-PR plan.

| PR | Status |
| --- | --- |
| 1 — Bootstrap framework | ✅ |
| 2 — Tooling (Biome, Knip, Lefthook) | ✅ this PR |
| 3 — Tests (`bun test` + RTL) | next |
| 4 — CI (GitHub Actions) | |
| 5 — Design tokens + global styles | |
| 6 — Layout primitives | |
| 7 — Header rail | |
| 8 — About section | |
| 9 — Experience section | |
| 10 — Projects section + Sparkline | |
| 11 — Articles section | |
| 12 — Availability env var + polish | |
