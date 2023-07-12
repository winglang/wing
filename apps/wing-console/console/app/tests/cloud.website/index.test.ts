import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("open website", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Website").click();
    await expect(page.getByTestId("cloud.Website:interaction")).toBeVisible();

    // not working when app mode is not "local"
    // const url = await page.getByTestId("cloud.website:url").inputValue();
    //expect(url).toMatch(/http:\/\/127.0.0.1:\d+/);
  });
});
