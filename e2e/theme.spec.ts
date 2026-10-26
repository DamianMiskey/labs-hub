import { expect, test } from "@playwright/test";
import { overflow } from "./helpers";

// The design tokens page: live token values, an accent playground that
// restyles only its own box and grades contrast, and a spacing slider.
test("tokens are read from the live page @readonly", async ({ page }) => {
  await page.goto("/tailwind/theme");
  const tokens = page.getByTestId("tokens");
  await expect(tokens.locator("tr", { hasText: "--accent" }).first()).toContainText("#0369a1");
  await expect(tokens.locator("tr", { hasText: "--spacing" })).toContainText("0.25rem");
});

test("the accent playground grades contrast and restyles only its box @readonly", async ({ page }) => {
  await page.goto("/tailwind/theme");
  await expect(page.getByTestId("contrast")).toContainText("✓");
  // A light, pale accent: white text on it fails.
  await page.getByLabel("Lightness").fill("0.8");
  await expect(page.getByTestId("contrast")).toContainText("✕");
  const inside = await page.getByTestId("accent-preview").getByRole("button", { name: "Primary action" }).evaluate((el) => getComputedStyle(el).backgroundColor);
  const outside = await page.getByRole("button", { name: "Reset" }).evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
  expect(outside).toBe("#0369a1");
  expect(inside).not.toBe("rgb(3, 105, 161)");
  expect(await overflow(page)).toBeLessThanOrEqual(0);
});

test("the spacing token scales the card @readonly", async ({ page }) => {
  await page.goto("/tailwind/theme");
  const card = page.getByTestId("spacing-preview").locator("div").first();
  const before = await card.evaluate((el) => getComputedStyle(el).paddingTop);
  await page.getByLabel("--spacing").fill("0.5");
  await expect.poll(() => card.evaluate((el) => getComputedStyle(el).paddingTop)).not.toBe(before);
  expect(await card.evaluate((el) => getComputedStyle(el).paddingTop)).toBe("32px");
});
