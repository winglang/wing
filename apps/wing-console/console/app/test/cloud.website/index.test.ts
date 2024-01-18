import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/main.w`, () => {
  test.skip("open website", async ({ page }) => {
    await getResourceNode(page, "root/Default/cloud.Website").click();

    // not working when app mode is not "local"
    // const url = await page.getByTestId("cloud.website:url").inputValue();
    //expect(url).toMatch(/http:\/\/127.0.0.1:\d+/);
  });
});
