import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("adds new row", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("ex.table:new-row-column-id").type(rowId);

    await page.getByTestId("ex.table:add-row").click({ force: true });

    const row = page.getByTestId(`ex.table:row-${rowId}`);

    await expect(row).toBeVisible();
  });

  test("edits row", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("ex.table:new-row-column-id").type(rowId);

    await page.getByTestId("ex.table:new-row-column-name").type(rowId);

    await page.getByTestId("ex.table:add-row").click({ force: true });

    const row = page.getByTestId(`ex.table:row-${rowId}`);

    await expect(row).toBeVisible();

    const nameInput = page.getByTestId(`ex.table:row-${rowId}-column-name`);
    await nameInput.clear();
    await nameInput.type("Hello World! 2");
    await nameInput.blur();

    expect(
      await page.getByTestId(`ex.table:row-${rowId}-column-name`).inputValue(),
    ).toBe("Hello World! 2");
  });

  test("removes row", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Table").click();

    const rowId = "Hello World!";

    await page.getByTestId("ex.table:new-row-column-id").type(rowId);

    await page.getByTestId("ex.table:add-row").click({ force: true });

    const row = page.getByTestId(`ex.table:row-${rowId}`);

    await expect(row).toBeVisible();

    await page
      .getByTestId(`ex.table:remove-row-${rowId}`)
      .click({ force: true });

    await expect(row).toBeHidden();
  });
});
