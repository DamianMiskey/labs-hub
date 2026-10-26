"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// A box with a width slider, so a demo can show what happens at any width
// without resizing the window. The box is a container (@container), and the
// readout is its measured width: what container queries and cqi units see.
// It never gets wider than the page, so on a phone the top of the range is
// the screen's width.
export function Resizer({
  children,
  label = "Container width",
  min = 14,
  max = 56,
  initial = 36,
  onResize,
  testId,
}: {
  children: ReactNode;
  label?: string;
  min?: number;
  max?: number;
  initial?: number;
  onResize?: (width: number) => void;
  testId?: string;
}) {
  const [rem, setRem] = useState(initial);
  const [px, setPx] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const report = useRef(onResize);
  useEffect(() => {
    report.current = onResize;
  });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentBoxSize[0].inlineSize);
      setPx(width);
      report.current?.(width);
    });
    observer.observe(box.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <label className="grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_4.5rem] items-center gap-3 text-sm">
        <span>{label}</span>
        <input type="range" min={min} max={max} step={0.5} value={rem} onChange={(e) => setRem(Number(e.target.value))} className="w-full" />
        <output className="text-right font-mono text-xs tabular-nums" data-testid={testId && `${testId}-width`}>
          {px === null ? "…" : `${px}px`}
        </output>
      </label>
      <div ref={box} style={{ width: `min(100%, ${rem}rem)` }} className="@container" data-testid={testId}>
        {children}
      </div>
    </div>
  );
}
