import type { Metadata } from "next";
import { CodePeek } from "@/components/CodePeek";
import { Demo, FeaturePage } from "@/components/FeaturePage";
import { FluidPreview } from "./FluidPreview";
import { Generator } from "./Generator";
import { Stepped } from "./Stepped";

export const metadata: Metadata = { title: "Fluid type & spacing" };

export default function FluidPage() {
  return (
    <FeaturePage
      title="Fluid type & spacing"
      tagline="clamp() scales that grow smoothly between screen sizes."
      docs="https://tailwindcss.com/docs/font-size#customizing-your-theme"
      whatItIs={<p>
        Instead of picking a size per breakpoint, give a <strong>fluid</strong> value a smallest size, a largest size and
        the widths between which it grows: <code>clamp(min, preferred, max)</code>. The preferred part mixes{" "}
        <code>rem</code>, so zooming and the browser&apos;s text-size setting still work, with <code>cqi</code>, 1% of the
        nearest container&apos;s width, or of the viewport when there&apos;s no container. Put the values in{" "}
        <code>@theme</code> as <code>--text-fluid-*</code> and <code>--spacing-fluid-*</code>, and Tailwind makes{" "}
        <code>text-fluid-lg</code>, <code>p-fluid-lg</code>, <code>gap-fluid-sm</code> and friends. The heading at the
        top of this page uses <code>text-fluid-2xl</code>.
      </p>}
      whenToUse={[
        "Headings and hero text, which need the biggest change between phone and desktop",
        "Section padding and gaps, so space scales with the type",
        "Keep body text nearly fixed: a small range, never below 16px",
      ]}
    >
      <Demo title="1. A page in fluid tokens">
        <FluidPreview />
        <p className="text-sm text-muted">
          The readings come from the browser (<code>getComputedStyle</code>) each time the box resizes, and stay inside
          each token&apos;s range however far you drag.
        </p>
      </Demo>

      <Demo title="2. Stepped vs fluid">
        <Stepped />
        <p className="text-sm text-muted">
          Breakpoints hold a size, then jump at <code>@md</code> and <code>@2xl</code>. The fluid heading passes through
          every size in between.
        </p>
      </Demo>

      <Demo title="3. Make your own">
        <Generator />
        <p className="text-sm text-muted">
          The same function generated this site&apos;s tokens, and a unit test checks the stylesheet still matches it.
        </p>
      </Demo>

      <CodePeek file="lib/fluid.ts" />
      <CodePeek file="app/tailwind/fluid/FluidPreview.tsx" />
      <CodePeek file="app/globals.css" />
    </FeaturePage>
  );
}
