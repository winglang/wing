import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(`${__dirname}/main.w`, () => {
  test("Health check", async ({ page }) => {
    const appState = await page.getByTestId("app-state").textContent();
    expect(appState).toBe("success");
  });
});
