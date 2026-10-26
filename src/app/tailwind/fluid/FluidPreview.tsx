"use client";

import { useRef, useState } from "react";
import { Resizer } from "@/components/Resizer";
import { fluidTokens } from "@/lib/fluid";

// A short article set entirely in fluid tokens. Each time the box changes
// width, read back what the browser computed for each token.
const samples = [
  { token: "text-fluid-4xl", read: (s: CSSStyleDeclaration) => s.fontSize },
  { token: "text-fluid-lg", read: (s: CSSStyleDeclaration) => s.fontSize },
  { token: "text-fluid-base", read: (s: CSSStyleDeclaration) => s.fontSize },
  { token: "text-fluid-sm", read: (s: CSSStyleDeclaration) => s.fontSize },
  { token: "spacing-fluid-lg", read: (s: CSSStyleDeclaration) => s.paddingTop },
  { token: "spacing-fluid-sm", read: (s: CSSStyleDeclaration) => s.rowGap },
];

export function FluidPreview() {
  const root = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Record<string, string>>({});
  const measure = () => {
    const next: Record<string, string> = {};
    for (const { token, read } of samples) {
      const el = root.current?.querySelector(`[data-fluid="${token}"]`);
      if (el) next[token] = `${Number.parseFloat(read(getComputedStyle(el))).toFixed(1)}px`;
    }
    setNow(next);
  };
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <Resizer onResize={measure} min={16} max={60} testId="fluid-box">
        {/* A wrapper, because querySelector only searches below the element it's called on. */}
        <div ref={root}>
          <div data-fluid="spacing-fluid-lg" className="rounded-xl border border-line bg-bg p-fluid-lg">
            <div data-fluid="spacing-fluid-sm" className="grid gap-fluid-sm">
              <h3 data-fluid="text-fluid-4xl" className="m-0 text-fluid-4xl font-bold">Grows with its box</h3>
              <p data-fluid="text-fluid-lg" className="m-0 text-fluid-lg text-muted">No breakpoints, no jumps: every size follows the width in a straight line.</p>
              <p data-fluid="text-fluid-base" className="m-0 text-fluid-base">
                Body text grows a little, headings a lot. That keeps the hierarchy clear on a phone without the headline
                swallowing the screen, and lets it breathe on a wide column.
              </p>
              <p data-fluid="text-fluid-sm" className="m-0 text-fluid-sm text-muted">A caption, in text-fluid-sm.</p>
            </div>
          </div>
        </div>
      </Resizer>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="py-1 pr-3 font-medium">Token</th>
              <th className="py-1 pr-3 text-right font-medium">Now</th>
              <th className="py-1 text-right font-medium">Range</th>
            </tr>
          </thead>
          <tbody>
            {samples.map(({ token }) => (
              <tr key={token} className="border-t border-line" data-testid={`fluid-${token}`}>
                <td className="py-1 pr-3 font-mono text-xs">{token}</td>
                <td className="py-1 pr-3 text-right font-mono text-xs tabular-nums">{now[token] ?? "…"}</td>
                <td className="py-1 text-right font-mono text-xs whitespace-nowrap text-muted">
                  {fluidTokens[token].min} → {fluidTokens[token].max}px
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
