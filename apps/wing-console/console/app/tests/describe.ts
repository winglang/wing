import * as path from "node:path";

import { test } from "@playwright/test";

import { createConsoleApp } from "../src/index.js";

/**
 * Declares a group of console tests.
 *
 * **Usage**
 *
 * ```js
 * describe('path/to/wingfile.w', () => {
 *   test('one', async ({ page }) => {
 *     // ...
 *   });
 *
 *   test('two', async ({ page }) => {
 *     // ...
 *   });
 * });
 * ```
 *
 * @param wingfile The wingfile.
 * @param callback A callback that is run immediately when calling
 * `describe(wingfile, callback)`. Any tests added in
 * this callback will belong to the group.
 */
export const describe = (wingfile: URL, callback: () => void) => {
  let server: { port: number; close: () => void } | undefined;

  test.beforeEach(async ({ page }) => {
    server = await createConsoleApp({
      wingfile: new URL(wingfile, import.meta.url).pathname,
    });

    await page.goto(`http://localhost:${server.port}/`);

    await page.getByTestId("loading-overlay").waitFor({ state: "hidden" });

    await page.waitForLoadState("domcontentloaded");
  });

  test.afterEach(() => {
    server?.close();
  });

  callback();
};
