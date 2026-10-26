import type { Metadata } from "next";
import { CodePeek } from "@/components/CodePeek";
import { Demo, FeaturePage } from "@/components/FeaturePage";
import { Grow } from "./Grow";
import { Checklist, PlanPicker } from "./Has";
import { Mixing, Tints } from "./Mixing";
import { Overlays } from "./Overlays";

export const metadata: Metadata = { title: "Modern CSS" };

export default function ModernCssPage() {
  return (
    <FeaturePage
      title="Modern CSS"
      tagline=":has(), @starting-style, field-sizing and OKLCH colour mixing, through utilities."
      docs="https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-descendants"
      whatItIs={<p>
        CSS has picked up features that used to need JavaScript, and Tailwind v4 exposes them as variants and utilities.{" "}
        <code>has-*:</code> styles an element from what&apos;s inside it. <code>starting:</code> sets where an entry
        animation begins, so popovers and dialogs can fade in with plain transitions. <code>field-sizing-content</code>{" "}
        lets a text box grow with what&apos;s typed. And colour now mixes in perceptual spaces: <code>bg-accent/25</code>{" "}
        is <code>color-mix(in oklab, …)</code>, and <code>oklch(from …)</code> derives a lighter or darker shade from one
        token.
      </p>}
      whenToUse={[
        "has-*: when a parent's look depends on a child's state: checked, invalid, focused",
        "starting: with popover and <dialog> for entry and exit animations, no library",
        "field-sizing-content for comment boxes and tag inputs",
        "Opacity modifiers and oklch(from …) instead of hand-picking every tint",
      ]}
    >
      <Demo title="1. :has(), the parent selector">
        <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <PlanPicker />
          <Checklist />
        </div>
        <p className="text-sm text-muted">
          The plan cards use <code>has-checked:</code> and <code>has-focus-visible:</code>. The checklist shows its badge
          with <code>group-not-has-[input:not(:checked)]:inline</code>: &ldquo;no unticked boxes left&rdquo;.
        </p>
      </Demo>

      <Demo title="2. Entry and exit animations with @starting-style">
        <Overlays />
        <p className="text-sm text-muted">
          <code>starting:open:opacity-0</code> is where the fade begins; <code>open:opacity-100</code> where it ends.{" "}
          <code>transition-discrete</code> keeps the element on screen until the exit fade is done. With reduced motion
          set, they just appear.
        </p>
      </Demo>

      <Demo title="3. Fields that fit their content">
        <Grow />
      </Demo>

      <Demo title="4. Colour mixing">
        <Mixing />
        <h3>Tints from one token</h3>
        <p className="m-0 mb-2 text-xs text-muted">
          Top row: opacity modifiers, <code>bg-accent/10</code> to <code>/100</code> (<code>color-mix</code> in OKLab). Bottom
          row: lightness shifted with <code>oklch(from var(--color-accent) calc(l + 0.15) c h)</code> and so on.
        </p>
        <Tints />
      </Demo>

      <CodePeek file="app/tailwind/modern-css/Has.tsx" />
      <CodePeek file="app/tailwind/modern-css/Overlays.tsx" />
      <CodePeek file="app/tailwind/modern-css/Grow.tsx" />
      <CodePeek file="app/tailwind/modern-css/Mixing.tsx" />
    </FeaturePage>
  );
}
