import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(`${__dirname}/main.w`, () => {
  test("Health check", async ({ page }) => {
    const appState = page.getByTestId("app-state");
    await expect(appState).toContainText("success");
  });
});
