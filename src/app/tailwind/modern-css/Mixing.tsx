"use client";

import { type CSSProperties, useState } from "react";

// The same two colours blended in three colour spaces. sRGB blends the
// numbers on the screen, so blue to yellow dips through grey; OKLab and OKLCH
// blend what the eye sees, so the middle stays bright.
const spaces = [
  { space: "srgb", note: "the browser's old default" },
  { space: "oklab", note: "Tailwind's choice for /opacity and gradients" },
  { space: "oklch", note: "keeps chroma, travels round the hue wheel" },
];

export function Mixing() {
  const [a, setA] = useState("#2563eb");
  const [b, setB] = useState("#facc15");
  return (
    <div className="grid gap-3" style={{ "--a": a, "--b": b } as CSSProperties}>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">From <input type="color" value={a} onChange={(e) => setA(e.target.value)} /></label>
        <label className="flex items-center gap-2">To <input type="color" value={b} onChange={(e) => setB(e.target.value)} /></label>
      </div>
      {spaces.map(({ space, note }) => (
        <div key={space} className="grid gap-1">
          <p className="m-0 text-xs"><code>in {space}</code> <span className="text-muted">· {note}</span></p>
          <div className="h-8 rounded-md" data-testid={`mix-${space}`}
            style={{ backgroundImage: `linear-gradient(to right in ${space}, var(--a), var(--b))` }} />
        </div>
      ))}
    </div>
  );
}

// Tints and transparency from one token. Opacity modifiers compile to
// color-mix(in oklab, …), and relative colour syntax (oklch(from …)) shifts
// lightness alone. (Classes written in full so Tailwind can find them.)
const swatch = "h-10 rounded-md border border-line";
export function Tints() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        {[
          ["/10", `${swatch} bg-accent/10`],
          ["/25", `${swatch} bg-accent/25`],
          ["/50", `${swatch} bg-accent/50`],
          ["/75", `${swatch} bg-accent/75`],
          ["/100", `${swatch} bg-accent`],
        ].map(([label, cls]) => (
          <div key={label} className="grid min-w-0 gap-1"><div className={cls} /><code className="truncate">{label}</code></div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        {[
          ["−0.15", `${swatch} bg-[oklch(from_var(--color-accent)_calc(l_-_0.15)_c_h)]`],
          ["±0", `${swatch} bg-[oklch(from_var(--color-accent)_l_c_h)]`],
          ["+0.15", `${swatch} bg-[oklch(from_var(--color-accent)_calc(l_+_0.15)_c_h)]`],
          ["+0.3", `${swatch} bg-[oklch(from_var(--color-accent)_calc(l_+_0.3)_c_h)]`],
          ["+0.45", `${swatch} bg-[oklch(from_var(--color-accent)_calc(l_+_0.45)_c_h)]`],
        ].map(([label, cls]) => (
          <div key={label} className="grid min-w-0 gap-1"><div className={cls} /><code className="truncate">{label}</code></div>
        ))}
      </div>
    </div>
  );
}
