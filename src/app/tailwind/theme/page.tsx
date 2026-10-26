import type { Metadata } from "next";
import { CodePeek } from "@/components/CodePeek";
import { Demo, FeaturePage } from "@/components/FeaturePage";
import { AccentPlayground } from "./AccentPlayground";
import { SpacingPlayground } from "./SpacingPlayground";
import { TokenList } from "./TokenList";

export const metadata: Metadata = { title: "Design tokens" };

export default function ThemePage() {
  return (
    <FeaturePage
      title="Design tokens"
      tagline="@theme: colours, spacing and type as CSS variables, the design system this site runs on."
      docs="https://tailwindcss.com/docs/theme"
      whatItIs={<p>
        Tailwind v4 is configured in CSS, not JavaScript. Inside <code>@theme</code> you declare <strong>design tokens</strong>{" "}
        as CSS variables in named namespaces (<code>--color-*</code>, <code>--font-*</code>, <code>--text-*</code>,{" "}
        <code>--radius-*</code>, <code>--spacing</code>…), and Tailwind generates the matching utilities: declare{" "}
        <code>--color-accent</code> and you get <code>bg-accent</code>, <code>text-accent</code>, <code>border-accent</code>,{" "}
        <code>ring-accent</code> and the rest. Because they&apos;re real CSS variables, tokens can change at runtime: per
        colour scheme, per component, per user. This site keeps its raw values in <code>:root</code> (swapped for dark mode)
        and points the theme at them with <code>@theme inline</code>, so every utility follows the current scheme.
      </p>}
      whenToUse={[
        "Every project: name the colours and sizes your design uses, once",
        "Theming: dark mode, brands, or user-chosen accents from one set of utilities",
        "Sharing a design system across sites (the plan for these labs)",
      ]}
    >
      <Demo title="1. The tokens this site runs on">
        <TokenList />
      </Demo>

      <Demo title="2. Change a token, everything follows">
        <AccentPlayground />
        <p className="text-sm text-muted">
          OKLCH describes a colour as lightness, chroma (colourfulness) and hue, so moving the hue keeps the perceived
          brightness steady; that&apos;s why Tailwind v4&apos;s whole palette is defined in it. Some of those colours are richer
          than ordinary (sRGB) screens can show: Tailwind&apos;s own <code>sky-700</code> is one, by a hair.
        </p>
      </Demo>

      <Demo title="3. One spacing token">
        <SpacingPlayground />
      </Demo>

      <CodePeek file="../node_modules/@djmiskey/lab-tokens/tokens.css" />
      <CodePeek file="app/globals.css" />
      <CodePeek file="app/tailwind/theme/AccentPlayground.tsx" />
    </FeaturePage>
  );
}
