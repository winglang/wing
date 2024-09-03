import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/main.w`, () => {
  test.skip("open website", async ({ page }) => {
    await getResourceNode(page, "root/Default/Website").click();
  });
});
