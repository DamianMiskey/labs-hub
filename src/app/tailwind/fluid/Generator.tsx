"use client";

import { useState } from "react";
import { Resizer } from "@/components/Resizer";
import { type Fluid, fluidAt, fluidClamp } from "@/lib/fluid";

// Build your own fluid token: the sizes at two widths in, a clamp() out.
const fields: { key: keyof Fluid; label: string }[] = [
  { key: "min", label: "Smallest size" },
  { key: "max", label: "Largest size" },
  { key: "from", label: "From width" },
  { key: "to", label: "To width" },
];

export function Generator() {
  const [f, setF] = useState<Fluid>({ min: 18, max: 40, from: 320, to: 960 });
  const [width, setWidth] = useState<number | null>(null);
  const valid = f.min > 0 && f.max > 0 && f.to > f.from;
  const value = valid ? fluidClamp(f) : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {fields.map(({ key, label }) => (
          <label key={key} className="grid gap-1 text-sm">
            <span>{label} (px)</span>
            <input type="number" min={1} value={f[key]} onChange={(e) => setF({ ...f, [key]: Number(e.target.value) })} />
          </label>
        ))}
      </div>
      {value ? (
        <pre tabIndex={0} className="m-0 overflow-x-auto rounded-lg bg-code px-3 py-2 font-mono text-xs" data-testid="generated">
          {`@theme {\n  --text-fluid-custom: ${value};\n}`}
        </pre>
      ) : (
        <p role="alert" className="m-0 text-sm text-danger">Use sizes above zero, and a “to” width wider than the “from” width.</p>
      )}
      {value && (
        <Resizer onResize={setWidth} min={16} max={60}>
          <p className="m-0 leading-tight font-bold" style={{ fontSize: value }} data-testid="generated-preview">
            Sized by your clamp()
          </p>
          <p className="m-0 mt-1 text-xs text-muted" data-testid="generated-expected">
            {width === null ? "…" : `Expected at ${width}px: ${fluidAt(f, width).toFixed(1)}px`}
          </p>
        </Resizer>
      )}
    </div>
  );
}
