import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

const runApiTest = async (
  page: Page,
  method: string,
  route: string,
  response: string,
) => {
  await getResourceNode(page, "root/Default/Api").click();

  await page.getByTestId("cloud.api:method-toggle").click();
  await page.getByTestId(`cloud.api:method-entry-${method}`).click();

  await page.getByTestId("cloud.api:route").click();
  await page.getByTestId(`cloud.api:route-${route}`).click();

  await page.getByTestId("cloud.api:send").click({ force: true });

  await page.waitForLoadState("networkidle");
  const result = await page
    .getByTestId("cloud.api:response-body")
    .textContent();

  expect(result).toEqual(response);
};

describe(`${__dirname}/main.w`, () => {
  test.skip("get method", async ({ page }) => {
    await runApiTest(page, "GET", "/test-get", "Hello GET!");
  });

  test.skip("post method", async ({ page }) => {
    await runApiTest(page, "POST", "/test-post", "Hello POST!");
  });

  test.skip("put method", async ({ page }) => {
    await runApiTest(page, "PUT", "/test-put", "Hello PUT!");
  });

  test.skip("delete method", async ({ page }) => {
    await runApiTest(page, "DELETE", "/test-delete", "Hello DELETE!");
  });

  test.skip("patch method", async ({ page }) => {
    await runApiTest(page, "PATCH", "/test-patch", "Hello PATCH!");
  });

  test.skip("options method", async ({ page }) => {
    await runApiTest(page, "OPTIONS", "/test-options", "Hello OPTIONS!");
  });
});
