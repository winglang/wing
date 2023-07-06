import { expect, test } from "@playwright/test";
import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("add new row", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("cloud.table:new-row-column-id").type(rowId);

    await page.getByTestId("cloud.table:add-row").click();

    await page.waitForLoadState("networkidle");

    const row = page.getByTestId(`cloud.table:row-${rowId}`);

    await expect(row).toBeVisible();
  });

  test("edit row", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("cloud.table:new-row-column-id").type(rowId);
    await page.getByTestId("cloud.table:new-row-column-name").type(rowId);

    await page.getByTestId("cloud.table:add-row").click();

    await page.waitForLoadState("networkidle");

    const row = page.getByTestId(`cloud.table:row-${rowId}`);

    await expect(row).toBeVisible();

    const nameInput = page.getByTestId(`cloud.table:row-${rowId}-column-name`);
    await nameInput.clear();
    await nameInput.type("Hello World! 2");
    await nameInput.blur();

    await page.waitForLoadState("networkidle");

    expect(
      await page
        .getByTestId(`cloud.table:row-${rowId}-column-name`)
        .inputValue(),
    ).toBe("Hello World! 2");
  });

  test("remove row", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("cloud.table:new-row-column-id").type(rowId);

    await page.getByTestId("cloud.table:add-row").click();

    await page.waitForLoadState("networkidle");

    const row = page.getByTestId(`cloud.table:row-${rowId}`);

    await expect(row).toBeVisible();

    await page.getByTestId(`cloud.table:remove-row-${rowId}`).click();

    await page.waitForLoadState("networkidle");

    await expect(row).toBeHidden();
  });
});
