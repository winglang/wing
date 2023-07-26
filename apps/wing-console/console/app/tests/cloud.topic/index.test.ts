import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(new URL("index.w", import.meta.url), () => {
  test("publishes message", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Topic").click();

    await page.getByTestId("cloud.topic:message").fill("Hello world!");

    await page.getByTestId("cloud.topic:send-message").click();

    const log = page.getByText("Message received: Hello world!");

    await expect(log).toBeVisible();
  });
});
