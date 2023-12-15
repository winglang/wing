import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { createConsoleApp } from "../dist/index.js";

import { openBrowser } from "./open.mjs";

const options = parseArgs({
  options: {
    wingfile: {
      type: "string",
    },
  },
});

const { port } = await createConsoleApp({
  wingfile:
    options.values.wingfile ??
    fileURLToPath(new URL("../demo/main.w", import.meta.url)),
  requestedPort: 1214,
  hostUtils: {
    async openExternal(url) {
      openBrowser(url);
    },
  },
});
openBrowser(`http://localhost:${port}`);
