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

- **Theme** (`theme.ts` and `ThemeSwitch.tsx` in [`@djmiskey/lab-tokens`](https://github.com/DamianMiskey/lab-tokens)): the choice (system/light/dark) is kept in a cookie on `djmiskey.com`, shared by every lab (`localStorage` elsewhere); an inline script in `<head>` sets `<html data-theme>` (the resolved theme) and `data-theme-choice` before the first paint, so there's no flash. Dark tokens apply under `[data-theme="dark"]`, or under the `prefers-color-scheme: dark` media query when no attribute exists (JavaScript off). `dark:` is redefined with a block `@custom-variant` covering both. The switch reads the choice with `useSyncExternalStore` over a MutationObserver on `<html>`, and follows the device while "System" is chosen. `<html suppressHydrationWarning>`, since the attribute differs from the server's HTML on purpose.

## Roadmap

- [x] **Phase 1: Design tokens.** `@theme`: this site's tokens read live from the page, an OKLCH accent playground with WCAG contrast grading (scoped to its box), and a `--spacing` slider
- [x] **Phase 2: Dark mode & variants.** A site-wide System/Light/Dark switch (inline `<head>` script, no flash), `dark:` redefined with a block `@custom-variant` (with a no-JavaScript fallback), and aria/data/user-invalid/has/group state variants
- [x] **Phase 3: Layout.** Container queries (a resizable card, the same card in two slots, named containers) and fluid type and spacing (`clamp()` tokens in `@theme` measured with `cqi`, a stepped-vs-fluid comparison, and a token generator)
- [x] **Phase 4: Modern CSS.** `has-*:` (a plan picker, a CSS-only "all done" checklist), `starting:` entry and exit animations on a popover and a `<dialog>`, `field-sizing-content`, and colour mixing (sRGB vs OKLab vs OKLCH gradients, opacity modifiers, `oklch(from …)` tints)
- [x] **Phase 5: Extending.** `@utility` (plain `scrollbar-hidden`; functional `fade-x-*` and `tab-*` with `--value()`), `@custom-variant hocus` and `@variant` inside a utility, and `@tailwindcss/typography` themed by the site tokens (`prose-site`)
- [x] **Shared tokens.** The neutral tokens, light/dark, fluid type, element defaults and the theme switch moved to [`@djmiskey/lab-tokens`](https://github.com/DamianMiskey/lab-tokens), installed from GitHub (`#v1.0.0`); each lab sets only its accent. The hub and the Observability lab use it so far
