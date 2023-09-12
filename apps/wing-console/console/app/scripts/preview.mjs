import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import open from "open";

import { createConsoleApp } from "../dist/index.js";

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
      await open(url);
    },
  },
});
await open(`http://localhost:${port}`);
