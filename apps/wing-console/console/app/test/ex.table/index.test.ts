import { type Page, expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

const addRow = async (
  page: Page,
  rowId: string,
  data?: {
    key: string;
    value: string;
  }[],
) => {
  await page.getByTestId("ex.table:new-row-column-id").type(rowId);

  for (const { key, value } of data || []) {
    await page.getByTestId(`ex.table:new-row-column-${key}`).type(value);
  }

  const addRowButton = page.getByTestId("ex.table:add-row");

  await expect(addRowButton).toBeEnabled();

  await addRowButton.click();

  const row = page.getByTestId(`ex.table:row-${rowId}`);

  await expect(row).toBeVisible();
};

describe(`${__dirname}/main.w`, () => {
  test.skip("adds new row", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Table").click();

    await addRow(page, "Hello World!");
  });

  test.skip("edits row", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Table").click();

    const rowId = "Hello World!";

    await addRow(page, rowId);

    const nameInput = page.getByTestId(`ex.table:row-${rowId}-column-name`);
    await nameInput.clear();
    await nameInput.type("Hello World! 2");
    await nameInput.blur();

    const editedValue = await page
      .getByTestId(`ex.table:row-${rowId}-column-name`)
      .inputValue();

    expect(editedValue).toBe("Hello World! 2");
  });

  test.skip("removes row", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Table").click();

    const rowId = "Hello World!";

    await addRow(page, rowId);

    const deleteButton = page.getByTestId(`ex.table:remove-row-${rowId}`);
    await expect(deleteButton).toBeEnabled();
    await deleteButton.click();

    const row = page.getByTestId(`ex.table:row-${rowId}`);
    await expect(row).toBeHidden();
  });
});
