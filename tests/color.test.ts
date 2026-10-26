import { describe, expect, it } from "vitest";
import { contrast, hexToRgb, oklchToRgb, rgbToHex } from "@/lib/color";

describe("colour maths", () => {
  it("converts OKLCH to sRGB like browsers do", () => {
    // Tailwind's sky-700 is oklch(50% 0.134 242.749). Its red channel falls
    // just outside sRGB (a wide-gamut colour); clipped, it's the familiar #0069a8.
    const { rgb, inGamut } = oklchToRgb(0.5, 0.134, 242.749);
    expect(inGamut).toBe(false);
    expect(oklchToRgb(0.62, 0.1, 240).inGamut).toBe(true);
    const [r, g, b] = rgb;
    expect(Math.abs(r - 0x00)).toBeLessThan(3);
    expect(Math.abs(g - 0x69)).toBeLessThan(3);
    expect(Math.abs(b - 0xa8)).toBeLessThan(3);
    expect(rgbToHex(oklchToRgb(1, 0, 0).rgb)).toBe("#ffffff");
    expect(rgbToHex(oklchToRgb(0, 0, 0).rgb)).toBe("#000000");
  });

  it("flags colours a screen can't show", () => {
    expect(oklchToRgb(0.6, 0.4, 145).inGamut).toBe(false);
  });

  it("computes WCAG contrast", () => {
    expect(contrast(hexToRgb("#ffffff"), hexToRgb("#000000"))).toBeCloseTo(21, 1);
    // The site's accent: white text on #0369a1 is about 5.9:1.
    expect(contrast(hexToRgb("#ffffff"), hexToRgb("#0369a1"))).toBeCloseTo(5.9, 1);
    expect(contrast(hexToRgb("#777"), hexToRgb("#777"))).toBe(1);
  });
});
