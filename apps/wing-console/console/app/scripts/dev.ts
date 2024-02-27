import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { createConsoleServer } from "@wingconsole/server";
import { createServer as createViteServer } from "vite";

import { openBrowser } from "../src/open.js";

import { viteConfig } from "./config.js";

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
      get(key: any) {
        return undefined as any;
      },
      set(key, value) {},
    },
    hostUtils: {
      async openExternal(url) {
        openBrowser(url);
      },
    },
    requireAcceptTerms: true,
    analyticsAnonymousId: undefined,
    async requireSignIn() {
      // Return `true` if you want to show the sign in prompt.
      return false;
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
