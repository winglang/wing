import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("push message", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Queue").click();

    await page.getByTestId("cloud.queue:message").fill("Hello world!");

    await page.getByTestId("cloud.queue:push").click();

    await page.waitForLoadState("networkidle");

    const approxSize = await page
      .getByTestId("cloud.queue:approx-size")
      .textContent();

    expect(approxSize).toBe("1");
  });

  test("purge message", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Queue").click();

    await page.getByTestId("cloud.queue:message").fill("Hello world!");

    await page.getByTestId("cloud.queue:push").click();

    await page.waitForLoadState("networkidle");

    const approxSize = page.getByTestId("cloud.queue:approx-size");
    expect(await approxSize.textContent()).toBe("1");

    await page.getByTestId("cloud.queue:purge").click();

    await page.waitForLoadState("networkidle");

    expect(await approxSize.textContent()).toBe("0");
  });
});
