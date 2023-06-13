import { URL, fileURLToPath } from "node:url";

import open from "open";

const url = new URL("../release/Wing Console.exe", import.meta.url);

export const openWingConsole = async () => {
  await open(fileURLToPath(url), { wait: true });
};
