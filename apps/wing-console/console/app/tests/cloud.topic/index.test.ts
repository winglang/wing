import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("publishes message", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Topic").click();
    await expect(page.getByTestId("cloud.Topic:interaction")).toBeVisible();

    await page.getByTestId("cloud.topic:message").fill("Hello world!");

    await page.getByTestId("cloud.topic:send-message").click();

    const log = page.getByText("Message received: Hello world!");

    await expect(log).toBeVisible();
  });
});
