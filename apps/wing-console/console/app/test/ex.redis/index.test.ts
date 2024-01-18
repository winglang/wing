import { execSync } from "node:child_process";

import { expect, test } from "@playwright/test";

import { describe } from "../describe.js";
import { getResourceNode } from "../helpers.js";

const isDockerAvailable = () => {
  try {
    execSync("docker ps", {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
};

describe(`${__dirname}/main.w`, () => {
  test.beforeAll(async () => {
    test.skip(!isDockerAvailable(), "Docker is not available");
  });

  test.skip("opens redis help", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Redis").click();

    const input = page.getByTestId("ex.redis:input");

    await input.type("help");

    await input.press("Enter");

    const history = await page
      .getByTestId("ex.redis:history")
      .allTextContents();

    expect(history[0]).toContain(
      "No problem! Let me just open this url for you",
    );
  });

  test.skip("navigates history", async ({ page }) => {
    await getResourceNode(page, "root/Default/ex.Redis").click();

    const input = page.getByTestId("ex.redis:input");

    await input.type("help");

    await input.press("Enter");

    expect(await input.inputValue()).toBe("");

    await input.press("ArrowUp");

    expect(await input.inputValue()).toBe("help");
  });
});
