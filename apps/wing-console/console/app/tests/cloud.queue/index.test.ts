import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("pushes message", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Queue").click();

    await page.getByTestId("cloud.queue:message").fill("Hello world!");

    await page.getByTestId("cloud.queue:push").click();

    const approxSize = page.getByTestId("cloud.queue:approx-size");

    await expect(approxSize).toContainText("1");
  });

  test("purges message", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Queue").click();

    await page.getByTestId("cloud.queue:message").fill("Hello world!");

    await page.getByTestId("cloud.queue:push").click();

    const approxSize = page.getByTestId("cloud.queue:approx-size");

    await expect(approxSize).toContainText("1");

    await page.getByTestId("cloud.queue:purge").click();

    await expect(approxSize).toContainText("0");
  });
});
