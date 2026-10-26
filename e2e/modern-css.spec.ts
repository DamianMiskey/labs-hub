import { expect, test } from "@playwright/test";

const style = (loc: import("@playwright/test").Locator, prop: string) =>
  loc.evaluate((el, p) => getComputedStyle(el).getPropertyValue(p), prop);

test(":has() styles the parent from its children @readonly", async ({ page }) => {
  await page.goto("/tailwind/modern-css");
  const hobby = page.locator("label", { has: page.getByRole("radio", { name: /Hobby/ }) });
  const before = await style(hobby, "border-color");
  await hobby.click();
  expect(await style(hobby, "border-color")).not.toBe(before);

  const done = page.getByTestId("all-done");
  await expect(done).toBeHidden();
  for (const box of await page.getByRole("checkbox").all()) await box.check();
  await expect(done).toBeVisible();
  await page.getByRole("checkbox").first().uncheck();
  await expect(done).toBeHidden();
});

test("the popover and dialog open, animate in, and close @readonly", async ({ page }) => {
  await page.goto("/tailwind/modern-css");
  const popover = page.getByTestId("popover");
  await page.getByRole("button", { name: "Open a popover" }).click();
  await expect(popover).toBeVisible();
  await expect.poll(() => style(popover, "opacity")).toBe("1");
  await page.keyboard.press("Escape");
  await expect(popover).toBeHidden();

  const dialog = page.getByRole("dialog", { name: "A modal dialog" });
  await page.getByRole("button", { name: "Open a dialog" }).click();
  await expect(dialog).toBeVisible();
  await expect.poll(() => style(dialog, "opacity")).toBe("1");
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});

test("fields grow with their content @readonly", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "field-sizing is Chromium and Safari 26.2+");
  await page.goto("/tailwind/modern-css");
  const area = page.getByTestId("grow-textarea");
  const h = await area.evaluate((el) => el.getBoundingClientRect().height);
  await area.fill("one\ntwo\nthree\nfour");
  expect(await area.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(h);
  const input = page.getByTestId("grow-input");
  const w = await input.evaluate((el) => el.getBoundingClientRect().width);
  await input.fill("container-queries");
  expect(await input.evaluate((el) => el.getBoundingClientRect().width)).toBeGreaterThan(w);
  await expect(page.getByTestId("grow-unsupported")).toBeHidden();
});

test("the gradients blend in the space they name @readonly", async ({ page }) => {
  await page.goto("/tailwind/modern-css");
  // sRGB is the default, so the browser leaves "in srgb" out of the computed value.
  expect(await style(page.getByTestId("mix-srgb"), "background-image")).not.toContain(" in ");
  for (const space of ["oklab", "oklch"]) {
    expect(await style(page.getByTestId(`mix-${space}`), "background-image")).toContain(`in ${space}`);
  }
});
