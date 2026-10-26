// Colour maths for the demos: OKLCH (the space Tailwind v4's palette is
// defined in) to sRGB, and WCAG contrast. Formulas from CSS Color 4 and WCAG 2.

export type RGB = [number, number, number]; // 0–255

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as RGB;
}

export const rgbToHex = (rgb: RGB) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

/**
 * OKLCH (l 0–1, c ≥ 0, h in degrees) to sRGB. `inGamut` is false when the
 * colour can't be shown on a normal screen; the channels are then clipped.
 */
export function oklchToRgb(l: number, c: number, h: number): { rgb: RGB; inGamut: boolean } {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad), b = c * Math.sin(rad);
  // OKLab → LMS (cube) → linear sRGB.
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  const inGamut = linear.every((v) => v >= -1e-4 && v <= 1 + 1e-4);
  const encode = (v: number) => {
    const x = Math.min(1, Math.max(0, v));
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  };
  return { rgb: linear.map(encode) as RGB, inGamut };
}

/** WCAG relative luminance. */
export function luminance([r, g, b]: RGB) {
  const lin = (v: number) => { const x = v / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio, 1–21. AA needs 4.5 for normal text, 3 for large text and UI. */
export function contrast(a: RGB, b: RGB) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
