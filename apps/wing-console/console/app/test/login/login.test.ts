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
      const githubLoginButton = page.getByTestId("signin-github-button");
      await expect(githubLoginButton).toBeVisible();
      await expect(githubLoginButton).toBeEnabled();
      await githubLoginButton.click();
    });
  },
  { requireSignIn: true },
);

describe(
  `${__dirname}/main.w`,
  () => {
    test("Google button is clickable", async ({ page }) => {
      const googleSignInButton = page.getByTestId("signin-google-button");
      await expect(googleSignInButton).toBeVisible();
      await expect(googleSignInButton).toBeEnabled();
      await googleSignInButton.click();
    });
  },
  { requireSignIn: true },
);
