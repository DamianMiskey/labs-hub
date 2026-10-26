import { expect, type Page, test } from "@playwright/test";
import { overflow } from "./helpers";

// Container queries and fluid tokens respond to the container, so these tests
// move the width sliders, never the window.
async function slide(page: Page, testId: string, rem: number) {
  const slider = page.getByTestId(testId).locator("xpath=..").getByRole("slider");
  await slider.fill(String(rem));
}

test("the card changes layout with its container, not the window @readonly", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/tailwind/container-queries");
  const box = page.getByTestId("card-box");
  const stats = box.getByTestId("profile-stats");
  await slide(page, "card-box", 16);
  await expect(stats).toBeHidden();
  await slide(page, "card-box", 40);
  await expect(stats).toBeVisible();
  // At 1280px wide, the sidebar copy stays stacked while the main one shows its stats.
  const placements = page.getByTestId("placements").getByTestId("profile-stats");
  await expect(placements.nth(0)).toBeHidden();
  await expect(placements.nth(1)).toBeVisible();
});

test("a named container answers for the outer box, a plain one for the nearest @readonly", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/tailwind/container-queries");
  const lit = (id: string) => page.getByTestId(id).evaluate((el) => getComputedStyle(el).color === "rgb(255, 255, 255)");
  await slide(page, "panel-box", 40);
  expect(await lit("named")).toBe(true);
  expect(await lit("nearest")).toBe(false);
  await slide(page, "panel-box", 60);
  await expect.poll(() => lit("nearest")).toBe(true);
});

test("fluid tokens grow with the box and stay in range @readonly", async ({ page }) => {
  await page.goto("/tailwind/fluid");
  const reading = async () => Number.parseFloat((await page.getByTestId("fluid-text-fluid-4xl").locator("td").nth(1).textContent())!);
  await slide(page, "fluid-box", 16);
  await expect.poll(reading).toBe(28);
  const narrow = await reading();
  await slide(page, "fluid-box", 60);
  await expect.poll(reading).toBeGreaterThan(narrow);
  expect(await reading()).toBeLessThanOrEqual(52);
  expect(await overflow(page)).toBeLessThanOrEqual(0);
});

test("the generator's clamp() renders at the size it predicts @readonly", async ({ page }) => {
  await page.goto("/tailwind/fluid");
  await page.getByLabel("Largest size (px)").fill("48");
  await expect(page.getByTestId("generated")).toContainText("clamp(1.125rem");
  const expected = page.getByTestId("generated-expected");
  await expect(expected).toContainText("Expected at");
  const predicted = Number(/: ([\d.]+)px$/.exec((await expected.textContent())!)![1]);
  const actual = await page.getByTestId("generated-preview").evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));
  expect(Math.abs(actual - predicted)).toBeLessThan(0.5);
  await page.getByLabel("To width (px)").fill("100");
  await expect(page.getByText("Use sizes above zero")).toBeVisible();
});
