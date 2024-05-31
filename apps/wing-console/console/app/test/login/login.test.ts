import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(
  `${__dirname}/main.w`,
  () => {
    test("Sign in modal is visible when required", async ({ page }) => {
      const signinModal = page.getByTestId("signin-modal");
      await expect(signinModal).toBeVisible();
    });
  },
  { requireSignIn: true },
);

describe(
  `${__dirname}/main.w`,
  () => {
    test("GitHub button is clickable", async ({ page }) => {
      const githubLogin = page.getByTestId("signin-github-button");
      await expect(githubLogin).toBeVisible();
      await githubLogin.click();
    });
  },
  { requireSignIn: true },
);

describe(
  `${__dirname}/main.w`,
  () => {
    test("Google button is clickable", async ({ page }) => {
      const githubLogin = page.getByTestId("signin-google-button");
      await expect(githubLogin).toBeVisible();
      await githubLogin.click();
    });
  },
  { requireSignIn: true },
);
