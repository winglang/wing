import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("open file preview", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Bucket").click();

    await page.getByTestId("cloud.bucket:files-entry-test.txt").click();

    await page.waitForLoadState("networkidle");

    const preview = await page
      .getByTestId("cloud.bucket:file-preview")
      .allTextContents();
    expect(preview.includes("Hello World!")).toBe(true);
  });

  test("delete file", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Bucket").click();

    const emptyState = page.getByTestId("cloud.bucket:empty-state");

    expect(await emptyState.isVisible()).toBe(false);

    await page.getByTestId("cloud.bucket:files-entry-test.txt").click();
    await page.getByTestId("cloud.bucket:delete-file").click();

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);

    expect(await emptyState.isVisible()).toBe(true);
  });
});
