import { expect, test } from "@playwright/test";
import { overflow } from "./helpers";

// The theme switch and the state-variant demos.
const theme = (page: import("@playwright/test").Page) => page.evaluate(() => document.documentElement.dataset.theme);
const bg = (page: import("@playwright/test").Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("a chosen theme survives a reload, applied before the page draws @readonly", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tailwind/dark-mode");
  expect(await theme(page)).toBe("light");
  const light = await bg(page);
  await page.getByRole("group", { name: "Colour theme" }).first().getByRole("button", { name: "Dark" }).click();
  expect(await theme(page)).toBe("dark");
  expect(await bg(page)).not.toBe(light);
  // On reload, read the attribute as soon as the HTML is parsed, before React runs.
  await page.reload({ waitUntil: "domcontentloaded" });
  expect(await theme(page)).toBe("dark");
  await expect(page.getByTestId("theme-state")).toContainText("dark");
});

test("System follows the device, even while the page is open @readonly", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tailwind/dark-mode");
  await page.getByRole("group", { name: "Colour theme" }).first().getByRole("button", { name: "System" }).click();
  expect(await theme(page)).toBe("light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect.poll(() => theme(page)).toBe("dark");
});

test("state variants style from aria, data and form state @readonly", async ({ page }) => {
  await page.goto("/tailwind/dark-mode");
  const star = page.getByRole("button", { name: "☆ Star" });
  const before = await star.evaluate((el) => getComputedStyle(el).backgroundColor);
  await star.click();
  const starred = page.getByRole("button", { name: "★ Starred" });
  await expect(starred).toHaveAttribute("aria-pressed", "true");
  expect(await starred.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(before);

  const hint = page.getByText("That isn't an e-mail address.");
  await expect(hint).toBeHidden();
  await page.getByLabel("E-mail").fill("not-an-address");
  await page.getByLabel("E-mail").blur();
  await expect(hint).toBeVisible();

  const details = page.getByText("The state lives in a data attribute");
  await expect(details).toBeHidden();
  await page.getByRole("button", { name: /Details/ }).click();
  await expect(details).toBeVisible();
  expect(await overflow(page)).toBeLessThanOrEqual(0);
});
