import { type Page, expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

const addRow = async (page: Page, data?: Record<string, any>) => {
  await page.getByTestId("ex.DynamodbTable:new-row").click();
  await page.getByTestId("ex.DynamodbTable:new-row").fill(JSON.stringify(data));

  const addRowButton = page.getByTestId("ex.DynamodbTable:add-row");
  await addRowButton.click();

  const row = page.getByTestId("ex.DynamodbTable:row-0");
  await expect(row).toBeVisible();
};

describe(`${__dirname}/main.w`, () => {
  test("adds new item", async ({ page }) => {
    await getResourceNode(page, "root/Default/DynamodbTable").click();

    await addRow(page, { id: "1", key1: "value1", key2: "value2" });
  });

  test("removes row", async ({ page }) => {
    await getResourceNode(page, "root/Default/DynamodbTable").click();

    await addRow(page, { id: "1", key1: "value1", key2: "value2" });

    const deleteButton = page.getByTestId("ex.DynamodbTable:remove-row-0");
    await expect(deleteButton).toBeEnabled();
    await deleteButton.click();

    const row = page.getByTestId("ex.DynamodbTable:row-0");
    await expect(row).toBeHidden();
  });
});
