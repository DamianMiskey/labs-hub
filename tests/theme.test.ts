import { describe, expect, it } from "vitest";
import { resolve, THEME_SCRIPT } from "@/lib/theme";

describe("theme", () => {
  it("resolves a choice against the device setting", () => {
    expect(resolve("system", true)).toBe("dark");
    expect(resolve("system", false)).toBe("light");
    expect(resolve("light", true)).toBe("light");
    expect(resolve("dark", false)).toBe("dark");
  });

  it("the head script is tiny and survives blocked storage", () => {
    expect(THEME_SCRIPT.length).toBeLessThan(400);
    expect(THEME_SCRIPT).toContain("try{");
  });
});
