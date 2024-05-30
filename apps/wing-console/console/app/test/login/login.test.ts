import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(
  `${__dirname}/main.w`,
  () => {
    test("Check login page", async ({ page }) => {
      const appState = page.getByTestId("signin-modal");
      await expect(appState).toBeVisible();
    });
  },
  { requireSignIn: true },
);
