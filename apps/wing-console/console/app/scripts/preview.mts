import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { createConsoleApp } from "../dist/index.js";

const require = createRequire(import.meta.url);

const options = parseArgs({
  options: {
    wingfile: {
      type: "string",
    },
  },
});

(async () => {
  const { port } = await createConsoleApp({
    wingfile:
      options.values.wingfile ??
      fileURLToPath(new URL("../demo/main.w", import.meta.url)),
    requestedPort: 1214,
    hostUtils: {
      async openExternal(url) {
        const { openBrowser } = require("../src/open.js");
        openBrowser(url);
      },
    },
    open: true,
  });
})().catch((error) => {
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
