import type { Metadata } from "next";
import { CodePeek } from "@/components/CodePeek";
import { Demo, FeaturePage } from "@/components/FeaturePage";
import { Hocus, ScrollRows, TabSizes } from "./Custom";
import { Prose } from "./Prose";

export const metadata: Metadata = { title: "Custom utilities" };

export default function UtilitiesPage() {
  return (
    <FeaturePage
      title="Custom utilities"
      tagline="@utility and @variant: extending Tailwind in CSS, plus typography for long text."
      docs="https://tailwindcss.com/docs/adding-custom-styles"
      whatItIs={<p>
        Tailwind v4 is configured in CSS, and extended there too. <code>@utility</code> adds a class that behaves like a
        built-in one: it works with every variant (<code>hover:</code>, <code>md:</code>, <code>dark:</code>) and only
        ships if it&apos;s used. Add <code>-*</code> to the name and <code>--value()</code> reads the value from the class:
        a number, a theme key or anything in brackets. <code>@custom-variant</code> adds a variant, and{" "}
        <code>@variant</code> applies one inside your own CSS. Plugins load with <code>@plugin</code>, like the
        typography plugin at the bottom.
      </p>}
      whenToUse={[
        "A pattern you repeat that no built-in utility covers",
        "A value scale of your own: give it a theme namespace and a functional utility",
        "A state you check often (hocus:) as one word",
        "prose for Markdown, CMS and docs content",
      ]}
    >
      <Demo title="1. Plain and functional utilities">
        <ScrollRows />
        <p className="text-sm text-muted">
          <code>scrollbar-hidden</code> is a plain utility. <code>fade-x-8</code> is functional: <code>--value(integer)</code>{" "}
          turns the 8 into <code>calc(var(--spacing) * 8)</code>, so it follows the spacing scale like <code>p-8</code>.
          Scroll the rows sideways.
        </p>
        <TabSizes />
        <p className="text-sm text-muted">
          <code>tab-*</code> accepts a number or a named size from <code>@theme</code> (<code>--tab-size-github: 8</code>).
        </p>
      </Demo>

      <Demo title="2. Variants of your own">
        <div id="hocus"><Hocus /></div>
        <p className="text-sm text-muted">
          <code>@custom-variant hocus (&amp;:hover, &amp;:focus-visible);</code> defines it. The buttons use{" "}
          <code>hocus:bg-accent</code>; <code>link-grow</code> uses <code>@variant hocus {"{ … }"}</code> inside its
          own definition.
        </p>
      </Demo>

      <Demo title="3. Typography for long text">
        <Prose />
        <p className="text-sm text-muted">
          Untick <em>prose</em> to see the bare HTML. It follows the theme switch with no <code>dark:prose-invert</code>,
          because <code>prose-site</code> points the plugin&apos;s colours at the site&apos;s tokens.
        </p>
      </Demo>

      <CodePeek file="app/globals.css" />
      <CodePeek file="app/tailwind/utilities/Custom.tsx" />
      <CodePeek file="app/tailwind/utilities/Prose.tsx" />
    </FeaturePage>
  );
}
