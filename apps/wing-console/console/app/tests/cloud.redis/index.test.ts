import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

describe(`${__dirname}/index.w`, () => {
  test("opens redis help", async ({ page }) => {
    await getResourceNode(page, "root/Default/redis.Redis").click();

    const input = page.getByTestId("redis.redis:input");

    await input.type("help");

    await input.press("Enter");

    const history = await page
      .getByTestId("redis.redis:history")
      .allTextContents();

    expect(history[0]).toContain(
      "No problem! Let me just open this url for you",
    );
  });

  test("navigates history", async ({ page }) => {
    await getResourceNode(page, "root/Default/redis.Redis").click();

    const input = page.getByTestId("redis.redis:input");

    await input.type("help");

    await input.press("Enter");

    expect(await input.inputValue()).toBe("");

    await input.press("ArrowUp");

    expect(await input.inputValue()).toBe("help");
  });
});
