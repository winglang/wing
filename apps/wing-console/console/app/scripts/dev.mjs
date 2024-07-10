import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { createConsoleServer } from "@wingconsole/server";
import { createServer as createViteServer } from "vite";

import { viteConfig } from "./config.mjs";

const require = createRequire(import.meta.url);

const options = parseArgs({
  options: {
    wingfile: {
      type: "string",
    },
  },
});

(async () => {
  const consoleServer = await createConsoleServer({
    wingfile:
      options.values.wingfile ??
      fileURLToPath(new URL("../demo/main.w", import.meta.url)),
    requestedPort: 1214,
    log: {
      info: console.log,
      error: console.error,
      verbose: console.log,
    },
    config: {
      addEventListener(event, listener) {},
      removeEventListener(event, listener) {},
      get(key) {},
      set(key, value) {},
    },
    hostUtils: {
      async openExternal(url) {
        const { openBrowser } = require("../src/open.js");
        openBrowser(url);
      },
    },
    requireAcceptTerms: true,
    analyticsAnonymousId: undefined,
    async requireSignIn() {
      return options.requireSignIn ?? false;
    },
    async getEndpointWarningAccepted() {
      return options.getEndpointWarningAccepted ?? true;
    },
  });

  const vite = await createViteServer({
    ...viteConfig,
    server: {
      proxy: {
        "/trpc": {
          target: `http://localhost:${consoleServer.port}`,
          changeOrigin: true,
          ws: true,
        },
      },
      open: true,
    },
  });

  await vite.listen();
})().catch((error) => {
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
