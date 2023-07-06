import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("adds new row", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("cloud.table:new-row-column-id").type(rowId);

    await page.getByTestId("cloud.table:add-row").click();

    const row = page.getByTestId(`cloud.table:row-${rowId}`);

    await expect(row).toBeVisible();
  });

  test("edits row", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("cloud.table:new-row-column-id").type(rowId);

    await page.getByTestId("cloud.table:new-row-column-name").type(rowId);

    await page.getByTestId("cloud.table:add-row").click();

    const row = page.getByTestId(`cloud.table:row-${rowId}`);

    await expect(row).toBeVisible();

    const nameInput = page.getByTestId(`cloud.table:row-${rowId}-column-name`);
    await nameInput.clear();
    await nameInput.type("Hello World! 2");
    await nameInput.blur();

    expect(
      await page
        .getByTestId(`cloud.table:row-${rowId}-column-name`)
        .inputValue(),
    ).toBe("Hello World! 2");
  });

  test("removes row", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("cloud.table:new-row-column-id").type(rowId);

    await page.getByTestId("cloud.table:add-row").click();

    const row = page.getByTestId(`cloud.table:row-${rowId}`);

    await expect(row).toBeVisible();

    await page.getByTestId(`cloud.table:remove-row-${rowId}`).click();

    await expect(row).toBeHidden();
  });
});
