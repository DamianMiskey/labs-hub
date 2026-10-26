"use client";

import { type CSSProperties, useState } from "react";

// In Tailwind v4 every spacing utility is a multiple of one token: p-4 is
// calc(var(--spacing) * 4). Change --spacing on this box and every padding,
// gap and margin inside it scales together.
export function SpacingPlayground() {
  const [rem, setRem] = useState(0.25);
  const px = rem * 16;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <label className="grid grid-cols-[6.5rem_minmax(0,1fr)_6rem] items-center gap-2 text-sm">
        <span>--spacing</span>
        <input type="range" min={0.125} max={0.5} step={0.025} value={rem} onChange={(e) => setRem(Number(e.target.value))} className="w-full" />
        <span className="text-right font-mono text-xs tabular-nums">{rem.toFixed(3)}rem</span>
      </label>
      <div style={{ "--spacing": `${rem}rem` } as CSSProperties} data-testid="spacing-preview">
        <div className="grid gap-3 rounded-xl border border-line bg-bg p-4">
          <div className="flex items-center gap-2"><span className="size-8 rounded-full bg-accent" aria-hidden="true" /><strong>A card</strong></div>
          <p className="m-0 text-sm text-muted">Padding <code>p-4</code> = {4 * px}px · gaps <code>gap-3</code> = {3 * px}px, <code>gap-2</code> = {2 * px}px</p>
          <div className="flex gap-2"><span className="rounded-md bg-code px-3 py-1 text-xs">px-3 py-1</span><span className="rounded-md bg-code px-3 py-1 text-xs">same chips</span></div>
        </div>
      </div>
    </div>
  );
}
