import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";

describe(`${__dirname}/index.w`, () => {
  test("publishes message", async ({ page }) => {
    await page
      .locator(
        "[data-testid=map-pane] [data-testid='map-node:root/Default/cloud.Topic']",
      )
      .click();

    await page.getByTestId("cloud.topic:message").fill("Hello world!");

    await page.getByTestId("cloud.topic:send-message").click();

    await page.waitForLoadState("networkidle");

    const logs = await page.getByTestId("logs").allTextContents();
    expect(logs.includes("Message received: Hello world!"));
  });
});
