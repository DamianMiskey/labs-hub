// Fluid sizes: a value that grows in a straight line from `min` at one width
// to `max` at another, and holds steady outside that range. In CSS that's
// clamp(min, intercept + slope × width, max).
export type Fluid = { min: number; max: number; from: number; to: number }; // all in px

const ROOT = 16; // px per rem
const num = (n: number) => String(Number(n.toFixed(4)));
const slopeOf = ({ min, max, from, to }: Fluid) => (max - min) / (to - from);

/**
 * The clamp() for a fluid size. The middle term keeps a rem part, so browser
 * zoom and text-size settings still scale it (WCAG 1.4.4). The width part is
 * in cqi: 1% of the nearest container's inline size, or of the viewport when
 * there's no container, so one token works for pages and components alike.
 */
export function fluidClamp(f: Fluid) {
  const slope = slopeOf(f);
  const intercept = f.min - slope * f.from;
  return `clamp(${num(f.min / ROOT)}rem, ${num(intercept / ROOT)}rem + ${num(slope * 100)}cqi, ${num(f.max / ROOT)}rem)`;
}

/** The size in px at a given container width: what the browser computes. */
export function fluidAt(f: Fluid, width: number) {
  return Math.min(f.max, Math.max(f.min, f.min + slopeOf(f) * (width - f.from)));
}

// This site's fluid tokens, as defined in globals.css (a test keeps the two in
// step). Text grows 320 → 960px wide; that's a phone up to the content column.
const range = { from: 320, to: 960 };
export const fluidTokens: Record<string, Fluid> = {
  "text-fluid-sm": { min: 14, max: 16, ...range },
  "text-fluid-base": { min: 16, max: 18, ...range },
  "text-fluid-lg": { min: 18, max: 24, ...range },
  "text-fluid-2xl": { min: 22, max: 32, ...range },
  "text-fluid-4xl": { min: 28, max: 52, ...range },
  "spacing-fluid-sm": { min: 12, max: 24, ...range },
  "spacing-fluid-lg": { min: 20, max: 64, ...range },
};
