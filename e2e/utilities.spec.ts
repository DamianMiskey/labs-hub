import { expect, test } from "@playwright/test";

const css = (loc: import("@playwright/test").Locator, prop: string) =>
  loc.evaluate((el, p) => getComputedStyle(el).getPropertyValue(p), prop);

test("custom utilities apply their CSS @readonly", async ({ page }) => {
  await page.goto("/tailwind/utilities");
  const rows = page.getByTestId("scroll-rows").getByRole("list");
  expect(await css(rows.nth(0), "mask-image")).toBe("none");
  expect(await css(rows.nth(1), "mask-image")).toContain("linear-gradient");
  expect(await css(rows.nth(1), "scrollbar-width")).toBe("none");
  expect(await css(page.getByTestId("tab-2"), "tab-size")).toBe("2");
  expect(await css(page.getByTestId("tab-4"), "tab-size")).toBe("4");
  expect(await css(page.getByTestId("tab-github"), "tab-size")).toBe("8");
});

test("hocus: responds to keyboard focus as well as hover @readonly", async ({ page }) => {
  await page.goto("/tailwind/utilities");
  const button = page.getByRole("button", { name: "or Tab to me" });
  const idle = await css(button, "background-color");
  await page.getByRole("button", { name: "Hover me" }).focus();
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();
  await expect.poll(() => css(button, "background-color")).not.toBe(idle);

  const link = page.getByRole("link", { name: "an underline that grows" });
  expect(await css(link, "background-size")).toBe("0px 2px");
  await link.hover();
  await expect.poll(() => css(link, "background-size")).not.toBe("0px 2px");
});

test("prose styles the article, follows the theme and scales @readonly", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tailwind/utilities");
  const article = page.getByTestId("prose");
  const quote = article.locator("blockquote");
  expect(await css(quote, "border-left-width")).not.toBe("0px");
  const base = Number.parseFloat(await css(article, "font-size"));
  await page.getByLabel("Size").selectOption("prose-lg");
  expect(Number.parseFloat(await css(article, "font-size"))).toBeGreaterThan(base);

  const light = await css(article.locator("h3"), "color");
  await page.getByRole("group", { name: "Colour theme" }).first().getByRole("button", { name: "Dark" }).click();
  expect(await css(article.locator("h3"), "color")).not.toBe(light);

  await page.getByRole("checkbox", { name: "prose", exact: true }).uncheck();
  expect(await css(quote, "border-left-width")).toBe("0px");
});
