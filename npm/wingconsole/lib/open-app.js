import { execSync } from "node:child_process";
import { platform } from "node:os";
import { fileURLToPath } from "node:url";

import openExternal from "open";

/**
 * @param {string | URL} app
 */
export const openApp = async (app) => {
  const path = fileURLToPath(app);
  if (platform() === "linux") {
    execSync(path, { cwd: "inherit" });
  } else {
    await openExternal(path, { wait: true });
  }
};
