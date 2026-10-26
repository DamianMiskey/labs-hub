# djmiskey.com: the labs hub and the Tailwind CSS lab

The front page for Damian Miskey's labs ([Vercel](https://vercel.djmiskey.com), [Cloudflare](https://lab.djmiskey.com), [Motion](https://motion.djmiskey.com), [API](https://api.djmiskey.com), [Observability](https://obs.djmiskey.com)), and the sixth lab: **Tailwind CSS v4**, one technique per page with a live demo and the code.

**Stack:** Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · target: **https://djmiskey.com** on Vercel (Hobby).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck
npm test           # Vitest: registry, robots/sitemap
npm run build
npm run e2e        # Playwright against the build (starts `npm start` on :3500)
BASE_URL=https://djmiskey.com npm run e2e   # a deployment: read-only tests only
```

CI (`.github/workflows/ci.yml`) runs all of them on every pull request.

## Layout

| Path | What lives there |
|------|------------------|
| `src/lib/labs.ts` | The labs the hub links to |
| `src/lib/features.ts` | The Tailwind lab's pages (the roadmap) |
| `src/app/tailwind/<slug>/page.tsx` | One page per Tailwind technique |

## Notes

- **Tokens** (`src/app/globals.css`): raw values in `:root`, swapped under `prefers-color-scheme: dark`; `@theme inline` maps them to Tailwind namespaces (`--color-*`, `--font-*`), so utilities read the variables and follow the scheme without `dark:` variants. Spacing is Tailwind's single `--spacing` (0.25rem): every `p-4`, `gap-3`, `m-2` is a multiple of it.
- **Colour maths** (`src/lib/color.ts`, tested): OKLCH → sRGB (with a gamut flag) and WCAG contrast. Tailwind's own `sky-700`, `oklch(50% 0.134 242.749)`, is just outside sRGB (red −0.012 in linear light): wide-gamut screens show it as set, others clip it to `#0069a8`.

## Roadmap

- [x] **Phase 1: Design tokens.** `@theme`: this site's tokens read live from the page, an OKLCH accent playground with WCAG contrast grading (scoped to its box), and a `--spacing` slider
- [ ] **Phase 2: Dark mode & variants.** `@custom-variant`, `data-*`/`aria-*` variants, a theme switch
- [ ] **Phase 3: Layout.** Container queries; fluid type and spacing with `clamp()`
- [ ] **Phase 4: Modern CSS.** `:has()`, `@starting-style`, `field-sizing`, OKLCH colour mixing
- [ ] **Phase 5: Extending.** `@utility`, `@variant`, typography for long text
- [ ] **Later:** share the design tokens with the other labs
