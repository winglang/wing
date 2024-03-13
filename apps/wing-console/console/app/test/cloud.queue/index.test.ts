import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/main.w`, () => {
  test.skip("pushes message", async ({ page }) => {
    await getResourceNode(page, "root/Default/Queue").click();

    await page.getByTestId("cloud.queue:message").fill("Hello world!");

    await page.getByTestId("cloud.queue:push").click();

    const approxSize = page.getByTestId("cloud.queue:approx-size");

    await expect(approxSize).toHaveText("1");
  });

  test.skip("purges message", async ({ page }) => {
    await getResourceNode(page, "root/Default/Queue").click();

    await page.getByTestId("cloud.queue:message").fill("Hello world!");

    await page.getByTestId("cloud.queue:push").click();

    const approxSize = page.getByTestId("cloud.queue:approx-size");

    await expect(approxSize).toHaveText("1");

    await page.getByTestId("cloud.queue:purge").click();

    await expect(approxSize).toHaveText("0");
  });
});
