import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { fluidAt, fluidClamp, fluidTokens } from "@/lib/fluid";

describe("fluidClamp", () => {
  it("writes min and max in rem, and a rem + cqi line through both ends", () => {
    expect(fluidClamp({ min: 16, max: 24, from: 320, to: 960 })).toBe("clamp(1rem, 0.75rem + 1.25cqi, 1.5rem)");
  });

  it("matches fluidAt at both ends and holds outside the range", () => {
    const f = { min: 18, max: 40, from: 320, to: 960 };
    expect(fluidAt(f, 320)).toBe(18);
    expect(fluidAt(f, 960)).toBe(40);
    expect(fluidAt(f, 640)).toBe(29);
    expect(fluidAt(f, 100)).toBe(18);
    expect(fluidAt(f, 2000)).toBe(40);
  });
});

describe("the stylesheet's fluid tokens", () => {
  it("match what fluidClamp generates", () => {
    const css = readFileSync(path.join(__dirname, "..", "node_modules", "@djmiskey", "lab-tokens", "tailwind.css"), "utf8");
    for (const [name, f] of Object.entries(fluidTokens)) {
      expect(css, name).toContain(`--${name}: ${fluidClamp(f)};`);
    }
  });
});
