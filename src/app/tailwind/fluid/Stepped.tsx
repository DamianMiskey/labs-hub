"use client";

import { Resizer } from "@/components/Resizer";

// The usual way, breakpoints, next to the fluid way. The stepped heading holds
// a size and then jumps; the fluid one never jumps.
export function Stepped() {
  return (
    <Resizer min={16} max={60}>
      <div className="grid gap-3">
        <div>
          <p className="m-0 text-xs text-muted"><code>text-2xl @md:text-4xl @2xl:text-5xl</code></p>
          <p className="m-0 text-2xl leading-tight font-bold @md:text-4xl @2xl:text-5xl">Stepped heading</p>
        </div>
        <div>
          <p className="m-0 text-xs text-muted"><code>text-fluid-4xl</code></p>
          <p className="m-0 text-fluid-4xl font-bold">Fluid heading</p>
        </div>
      </div>
    </Resizer>
  );
}
