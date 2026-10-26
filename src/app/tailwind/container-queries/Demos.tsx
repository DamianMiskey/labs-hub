"use client";

import { Resizer } from "@/components/Resizer";
import { Breakpoints } from "./Breakpoints";
import { ProfileCard } from "./ProfileCard";

export function ResizableCard() {
  return (
    <Resizer testId="card-box">
      <div className="grid gap-3">
        <Breakpoints />
        <ProfileCard />
      </div>
    </Resizer>
  );
}

// Containers nest, and a plain @sm: asks the nearest one. Name a container
// (@container/panel) to ask a particular ancestor instead: @sm/panel:.
const badge = "m-0 rounded-md bg-code px-2 py-1 font-mono text-xs text-muted";

export function NamedContainers() {
  return (
    <Resizer testId="panel-box" initial={44} max={60}>
      <div className="@container/panel rounded-xl border border-line p-3">
        <p className="m-0 mb-2 text-xs text-muted">Outer container, named <code>panel</code></p>
        <div className="@container w-1/2 rounded-lg border border-dashed border-line bg-bg p-2">
          <p className="m-0 mb-2 text-xs text-muted">Inner container, half as wide</p>
          <div className="grid gap-1.5">
            <p className={`${badge} @sm:bg-accent @sm:text-white`} data-testid="nearest">@sm: nearest ≥ 24rem</p>
            <p className={`${badge} @sm/panel:bg-accent @sm/panel:text-white`} data-testid="named">@sm/panel: panel ≥ 24rem</p>
          </div>
        </div>
      </div>
    </Resizer>
  );
}
