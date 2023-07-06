import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("opens website", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Website").click();

    const urlInput = page.getByTestId("cloud.website:url");

    expect(urlInput).toBeVisible();
  });
});
