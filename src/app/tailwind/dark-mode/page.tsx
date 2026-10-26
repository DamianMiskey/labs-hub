import type { Metadata } from "next";
import { CodePeek } from "@/components/CodePeek";
import { Demo, FeaturePage } from "@/components/FeaturePage";
import { ThemeDemo } from "./ThemeDemo";
import { Variants } from "./Variants";

export const metadata: Metadata = { title: "Dark mode & variants" };

export default function DarkModePage() {
  return (
    <FeaturePage
      title="Dark mode & variants"
      tagline="@custom-variant, data-* and aria-* variants, and a theme switch that respects the system."
      docs="https://tailwindcss.com/docs/dark-mode"
      whatItIs={<p>
        A <strong>variant</strong> is a condition in front of a utility: <code>hover:</code>, <code>md:</code>,{" "}
        <code>dark:</code>. Out of the box <code>dark:</code> follows the device&apos;s setting; to let visitors choose, this site
        redefines it with <code>@custom-variant</code> to follow a <code>data-theme</code> attribute on{" "}
        <code>&lt;html&gt;</code>, keeping the device setting as the fallback when JavaScript is off. A tiny script in{" "}
        <code>&lt;head&gt;</code> sets the attribute before anything is drawn, so a dark-mode visitor never sees a white
        flash. The same idea, styling from state the markup already has, covers <code>aria-pressed:</code>,{" "}
        <code>data-[state=open]:</code>, <code>user-invalid:</code>, <code>has-[:checked]:</code>, and <code>group-</code>/
        <code>peer-</code> variants that react to a parent or a sibling.
      </p>}
      whenToUse={[
        "A theme switch: offer System, Light and Dark, and remember the choice",
        "Style from ARIA and data attributes, so state and appearance can't drift apart",
        "group-* and peer-* instead of JavaScript for hover reveals and form hints",
      ]}
    >
      <Demo title="1. A theme switch for the whole site">
        <ThemeDemo />
        <p className="text-sm text-muted">
          The same switch sits at the bottom of the sidebar on every page. <em>System</em> keeps following your device,
          even when it changes while the page is open.
        </p>
      </Demo>

      <Demo title="2. dark: and the token approach">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-3 text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-none">
            <p className="m-0 text-sm font-semibold">With <code>dark:</code> variants</p>
            <p className="m-0 mt-1 text-xs">Each colour written twice: <code>bg-white dark:bg-zinc-900</code>. Fine for one-offs.</p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-3">
            <p className="m-0 text-sm font-semibold">With tokens</p>
            <p className="m-0 mt-1 text-xs">Written once: <code>bg-surface</code>. The token changes under it, which is how this site does it.</p>
          </div>
        </div>
      </Demo>

      <Demo title="3. State variants">
        <div id="variants"><Variants /></div>
      </Demo>

      <CodePeek file="../node_modules/@djmiskey/lab-tokens/theme.ts" />
      <CodePeek file="../node_modules/@djmiskey/lab-tokens/ThemeSwitch.tsx" />
      <CodePeek file="../node_modules/@djmiskey/lab-tokens/tokens.css" />
      <CodePeek file="../node_modules/@djmiskey/lab-tokens/tailwind.css" />
    </FeaturePage>
  );
}
