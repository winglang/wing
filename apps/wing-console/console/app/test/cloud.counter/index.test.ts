import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/main.w`, () => {
  test("increase counter", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Counter").click();

    const currentValue = page.getByTestId("cloud.counter:current-value");

    await expect(currentValue).toHaveValue("0");

    await page.getByTestId("cloud.counter:increase").click();

    await expect(currentValue).toHaveValue("1");
  });

  test("decreases counter", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Counter").click();

    const currentValue = page.getByTestId("cloud.counter:current-value");

    await expect(currentValue).toHaveValue("1");

    await page.getByTestId("cloud.counter:decrease").click();

    await expect(currentValue).toHaveValue("0");
  });

  test("resets counter", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Counter").click();

    const currentValue = page.getByTestId("cloud.counter:current-value");

    await expect(currentValue).toHaveValue("0");

    await page.getByTestId("cloud.counter:increase").click();

    await expect(currentValue).toHaveValue("1");

    await page.getByTestId("cloud.counter:reset").click();

    await expect(currentValue).toHaveValue("0");
  });
});
