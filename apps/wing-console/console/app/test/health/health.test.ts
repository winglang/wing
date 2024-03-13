import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";

describe(`${__dirname}/main.w`, () => {
  test("Health check", async ({ page }) => {
    expect(page.getByTestId("app-state")).toContainText("success");
  });
});
