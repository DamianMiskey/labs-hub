import type { Metadata } from "next";
import { CodePeek } from "@/components/CodePeek";
import { Demo, FeaturePage } from "@/components/FeaturePage";
import { NamedContainers, ResizableCard } from "./Demos";
import { ProfileCard } from "./ProfileCard";

export const metadata: Metadata = { title: "Container queries" };

export default function ContainerQueriesPage() {
  return (
    <FeaturePage
      title="Container queries"
      tagline="Components that respond to their own width, not the screen's."
      docs="https://tailwindcss.com/docs/responsive-design#container-queries"
      whatItIs={<p>
        Media queries (<code>md:</code>, <code>lg:</code>) ask how wide the <em>screen</em> is. A component doesn&apos;t
        know where it will be placed, so the screen is the wrong question: the same card might sit in a narrow sidebar on a
        wide monitor. A <strong>container query</strong> asks how wide the <em>container</em> is instead. In Tailwind v4
        it&apos;s built in: mark an element <code>@container</code>, and its descendants can use <code>@sm:</code>,{" "}
        <code>@lg:</code> and the rest, or <code>@max-sm:</code> for below a size. The sizes come from the{" "}
        <code>--container-*</code> tokens (<code>@sm</code> is 24rem).
      </p>}
      whenToUse={[
        "Reusable components: cards, media objects, forms that sit in columns of any width",
        "Keep media queries for the page's own layout (sidebar, columns)",
        "Name a container (@container/panel) when nested containers would answer the wrong question",
      ]}
    >
      <Demo title="1. A card that reads its own width">
        <ResizableCard />
        <p className="text-sm text-muted">
          Drag the slider: the badges light up through the variants they name, and the card stacks, goes into a row at{" "}
          <code>@sm</code>, then shows its stats at <code>@lg</code>. The window never changed size.
        </p>
      </Demo>

      <Demo title="2. Same component, different places">
        <div className="grid gap-4 sm:grid-cols-[13rem_minmax(0,1fr)]" data-testid="placements">
          <div className="grid content-start gap-2">
            <p className="m-0 text-xs font-semibold text-muted">Narrow sidebar</p>
            <ProfileCard />
          </div>
          <div className="grid content-start gap-2">
            <p className="m-0 text-xs font-semibold text-muted">Main column</p>
            <ProfileCard />
          </div>
        </div>
        <p className="text-sm text-muted">
          Both cards are the same markup at the same screen width, and each picks the layout that fits its slot. With{" "}
          <code>sm:</code> media queries they&apos;d both switch together.
        </p>
      </Demo>

      <Demo title="3. Named containers">
        <NamedContainers />
        <p className="text-sm text-muted">
          The inner box is a container too, so a plain <code>@sm:</code> measures it, the nearest one. Naming the outer one{" "}
          <code>@container/panel</code> lets <code>@sm/panel:</code> skip past it. From about 48rem the outer panel matches
          while the inner box still doesn&apos;t.
        </p>
      </Demo>

      <CodePeek file="app/tailwind/container-queries/ProfileCard.tsx" />
      <CodePeek file="app/tailwind/container-queries/Demos.tsx" />
      <CodePeek file="components/Resizer.tsx" />
    </FeaturePage>
  );
}
