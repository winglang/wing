import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(
  `${__dirname}/main.w`,
  () => {
    test("Check login page", async ({ page }) => {
      const githubLogin = page.getByTestId("signin-github-button");
      await expect(githubLogin).toBeVisible();
    });
  },
  { requireSignIn: true },
);
