import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/main.w`, () => {
  test("opens file preview", async ({ page }) => {
    await getResourceNode(page, "root/Default/Bucket").click();

    await page.getByTestId("cloud.bucket:files-entry-test.txt").click();

    const preview = page.getByTestId("cloud.bucket:file-preview");

    await expect(preview).toHaveText("Hello World!");
  });

  test("deletes a file", async ({ page }) => {
    await getResourceNode(page, "root/Default/Bucket").click();

    const file = page.getByTestId("cloud.bucket:files-entry-test.txt");

    await file.click();

    await page.getByTestId("cloud.bucket:delete-file").click();

    await expect(file).toBeHidden();
  });
});
