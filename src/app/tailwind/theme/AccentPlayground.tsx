"use client";

import { type CSSProperties, useState } from "react";
import { Button } from "@/components/ui";
import { contrast, oklchToRgb, rgbToHex } from "@/lib/color";

// Change one token, --accent, and everything built on it follows: the button,
// the badge, the focus ring. The tokens are set on this box only (custom
// properties inherit), so the rest of the page keeps its colours.
const START = { l: 0.5, c: 0.13, h: 237 }; // close to the site's own sky accent

export function AccentPlayground() {
  const [{ l, c, h }, set] = useState(START);
  const { rgb, inGamut } = oklchToRgb(l, c, h);
  const ratio = contrast(rgb, [255, 255, 255]);
  const passes = ratio >= 4.5;
  const accent = `oklch(${(l * 100).toFixed(0)}% ${c.toFixed(3)} ${h.toFixed(0)})`;

  const slider = (key: "l" | "c" | "h", label: string, min: number, max: number, step: number, value: number, show: string) => (
    <label className="grid grid-cols-[6.5rem_minmax(0,1fr)_4.5rem] items-center gap-2 text-sm">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set((v) => ({ ...v, [key]: Number(e.target.value) }))} className="w-full accent-[var(--accent)]" />
      <span className="text-right font-mono text-xs tabular-nums">{show}</span>
    </label>
  );

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <div className="grid gap-2">
        {slider("l", "Lightness", 0.3, 0.8, 0.01, l, `${(l * 100).toFixed(0)}%`)}
        {slider("c", "Chroma", 0, 0.25, 0.005, c, c.toFixed(3))}
        {slider("h", "Hue", 0, 360, 1, h, `${h.toFixed(0)}°`)}
      </div>

      {/* The preview: same components as the rest of the site, with --accent overridden here. */}
      <div className="rounded-xl border border-line bg-bg p-4" style={{ "--accent": accent } as CSSProperties} data-testid="accent-preview">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">Live</span>
          <span className="inline-block size-8 rounded-lg bg-accent" aria-hidden="true" />
          <input type="text" defaultValue="Focus me" aria-label="An input with an accent focus ring" className="max-w-40" />
        </div>
      </div>

      <dl className="m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted">--accent</dt><dd className="m-0 font-mono text-xs">{accent} <span className="text-muted">≈ {rgbToHex(rgb)}</span></dd>
        <dt className="text-muted">White text on it</dt>
        <dd className="m-0" data-testid="contrast">
          {/* A word and an icon, not only a colour. */}
          <strong className={passes ? "text-fg" : "text-danger"}>{passes ? "✓" : "✕"} {ratio.toFixed(2)}:1</strong>{" "}
          <span className="text-muted">{passes ? "passes WCAG AA for normal text (4.5:1)" : ratio >= 3 ? "only enough for large text (3:1), not body text" : "fails: too little contrast to read"}</span>
        </dd>
        {!inGamut && (<><dt className="text-muted">Gamut</dt><dd className="m-0 text-muted">Outside sRGB: a wide-gamut screen shows it as set; others clip it to the nearest colour they can show.</dd></>)}
      </dl>
      <div><Button variant="ghost" onClick={() => set(START)}>Reset</Button></div>
    </div>
  );
}
