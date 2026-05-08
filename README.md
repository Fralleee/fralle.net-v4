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
| Test runner | `bun test` + `happy-dom` + Testing Library |
| CI | GitHub Actions (`bun run ci` on PRs and `main`) |
| Hosting | [Vercel](https://vercel.com) (`@astrojs/vercel` adapter) |

### Why Astro

The site is one route, mostly static (about / experience / projects / articles), with one small interactive island (the project sparklines). Astro ships zero JS by default and hydrates only the React components that need it — Lighthouse 100 out of the box.

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
bun run test          # bun test (happy-dom + Testing Library)
bun run ci            # lint + typecheck + knip + test + build (full local CI)
```

Pre-commit (Lefthook) runs Biome + `astro check` on staged files. Pre-push runs Knip.

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable | Effect |
| --- | --- |
| `PUBLIC_AVAILABLE_FOR_HIRE` | Only the literal value `true` turns on the "Open to new roles" badge, the TopNav pulse + status text, and the About section's job-seeking copy. Any other value (or unset) renders the not-currently-looking variant. |

## Architecture

The page is one route (`src/pages/index.astro`) that composes a header rail and four content sections. Each section reads from a typed data file under `src/data/` and renders through the shared `<EntryCard>` primitive. The Sparkline next to two project cards is the only React island — it hydrates with `client:visible` so the rest of the page ships zero JS.

```text
src/
├── data/
│   ├── availability.ts    # parseAvailable(env) -> boolean (build-time)
│   ├── experiences.ts     # 6 records: period, logo, title, company, …
│   ├── projects.ts        # 7 records: subtitle, kind, links, optional sparkline
│   └── articles.ts        # 3 Medium posts: subtitle, links
├── sections/
│   ├── About.astro        # prose, paint-rect highlights, contact block
│   ├── Experience.astro
│   ├── Projects.astro
│   └── Articles.astro
└── components/
    ├── EntryCard.astro    # union props: Experience | Project | Article
    ├── Sparkline.tsx      # React island, pure SVG
    ├── HeaderRail.astro   # role / name / lede / availability badge / socials
    ├── TopNav.astro       # sticky brand bar + status row
    ├── AvailabilityBadge.astro
    ├── Section.astro      # 2-column grid with sticky head on md+
    ├── Shell.astro        # max-width container
    ├── Footer.astro
    └── Socials.astro
```

## Project layout

```text
.
├── public/                # static assets (favicon, brand logos, project shots, articles)
├── src/                   # see Architecture above
├── tests/
│   ├── register-dom.ts    # registers happy-dom globals (must preload first)
│   ├── setup.ts           # afterEach cleanup() for @testing-library/react
│   ├── experiences.test.ts
│   ├── projects.test.ts
│   ├── articles.test.ts
│   └── availability.test.ts
├── astro.config.mjs
├── bunfig.toml            # bun test preloads
├── tsconfig.json
└── package.json
```

## Deploy

`main` auto-deploys to Vercel via the `@astrojs/vercel` adapter. To flip the availability toggle without a code change: Vercel dashboard → Project → Settings → Environment Variables → set `PUBLIC_AVAILABLE_FOR_HIRE` to `true` (or any other value to disable), redeploy. The change takes ~30 seconds end-to-end.

## Roadmap

Built incrementally across PRs 1–12 — see git history for the per-step rationale. The full roadmap shipped: framework bootstrap, tooling, tests, CI, design tokens, layout primitives, header rail, the four content sections, the Sparkline island, and the env-driven availability toggle.

## Future enhancements

These items were deferred during the original build (some explicitly per the plan, some called out in PR descriptions). Each is independent — pick any in any order.

### PR 13 — Production extras
SEO meta + OpenGraph image, `sitemap.xml` via `@astrojs/sitemap`, `robots.txt`, JSON-LD Person schema, full favicon set (192/512 PNG, maskable, apple-touch), and a `404.astro` page. The single highest-ROI follow-up — without it the site won't surface properly when shared on LinkedIn or in Google results, which is the primary distribution channel for a job-hunt portfolio. **Effort: ~half a day.**

### PR 14 — Real sparkline analytics
Replace the hard-coded `data: [4, 8, 6, …]` arrays in `src/data/projects.ts` with a build-time fetch from PostHog (or whichever analytics is wired by then). Either via an `astro:content` loader or a small script that bakes the array into `projects.ts` before each Vercel build. The sparklines currently show plausible-looking but invented data; this swaps them for real traffic. **Effort: half a day, plus PostHog setup if not already done.**

### PR 15 — Theme variants
The design source baked `editorial`, `soft`, `minimal`, and `terminal` themes into CSS variables; only the ink theme is wired. Lighting up the others is an `@theme` override per `[data-theme="…"]` selector. Adding a runtime toggle (URL param `?theme=…` or a footer link) is small follow-on work. **Effort: half a day if just wiring tokens; +half a day for a toggle UI.**

### PR 16 — Print stylesheet
A `@media print` block that hides the `TopNav` / `Footer` / animations, tightens margins, and shows full URLs next to link text so the page exports as a clean one-pager PDF. Useful if Roland ever wants a printable resume that pulls from the same data files. **Effort: a couple of hours.**

### PR 17 — MDX article bodies
Currently each article is a card linking out to Medium. Switching to MDX bodies hosted under `src/content/articles/` would let the three posts live on `fralle.net/articles/<slug>` instead, control the styling, and add reading-time estimates. Trade-off: maintenance moves from Medium's editor to the repo. **Effort: a day, including the per-article route + a short content-collection schema.**

### PR 18 — Accent colour
PRs 9–10 deliberately swapped the design source's rust-red accent for ink monochrome to stay inside the existing token palette. If a colour accent is wanted (link hover underline, arrow on focus, featured-card outline), a `--color-accent` token can be added and the existing `:hover` / `:focus-within` rules reach for it instead of `var(--color-ink)`. **Effort: one afternoon, mostly visual iteration.**
