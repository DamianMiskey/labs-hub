import { describe, expect, it } from "vitest";
import { resolve, THEME_SCRIPT, themeCookie } from "@djmiskey/lab-tokens/theme";

describe("theme", () => {
  it("resolves a choice against the device setting", () => {
    expect(resolve("system", true)).toBe("dark");
    expect(resolve("system", false)).toBe("light");
    expect(resolve("light", true)).toBe("light");
    expect(resolve("dark", false)).toBe("dark");
  });

  it("the head script is tiny and survives blocked storage", () => {
    expect(THEME_SCRIPT.length).toBeLessThan(500);
    expect(THEME_SCRIPT).toContain("try{");
  });

  it("shares the choice across *.djmiskey.com in a cookie, and nowhere else", () => {
    expect(themeCookie("dark", "djmiskey.com")).toContain("Domain=djmiskey.com");
    expect(themeCookie("dark", "obs.djmiskey.com")).toMatch(/^theme=dark; Domain=djmiskey\.com;.*Secure$/);
    expect(themeCookie("dark", "localhost")).toBeNull();
    expect(themeCookie("dark", "notdjmiskey.com")).toBeNull();
    expect(themeCookie("dark", "labs-hub-xi.vercel.app")).toBeNull();
  });
});
