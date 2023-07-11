import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(`${__dirname}/index.w`, () => {
  test("executes function and shows response", async ({ page }) => {
    await page
      .locator(
        "[data-testid=map-pane] [data-testid='map-node:root/Default/cloud.Function']",
      )
      .click();

    await page.getByTestId("cloud.function:invoke").click();

    expect(
      await page.getByTestId("cloud.function:response").textContent(),
    ).toEqual(
      JSON.stringify(
        {
          success: true,
          response: "Hello world!",
        },
        undefined,
        2,
      ),
    );
  });
});
