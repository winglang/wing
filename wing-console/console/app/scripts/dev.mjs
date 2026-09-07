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

/** Max time to wait for graceful close before force-exiting (ms). */
const SHUTDOWN_TIMEOUT_MS = 10_000;

(async () => {
  const consoleServer = await createConsoleServer({
    wingfile:
      options.values.wingfile ??
      fileURLToPath(new URL("../demo/main.w", import.meta.url)),
    requestedPort: 1214,
    log: {
      info: () => {},
      error: (...arguments_) => console.error("[error]", ...arguments_),
      verbose: () => {},
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

  // Declare before registering signal handlers so a Ctrl+C during vite startup
  // does not hit the temporal dead zone (and leave the process hung).
  /** @type {import("vite").ViteDevServer | undefined} */
  let vite;

  let closing = false;
  const shutdown = async () => {
    if (closing) {
      // Second signal — force exit immediately.
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }
    closing = true;

    const forceTimer = setTimeout(() => {
      console.error(
        `[wing-console] graceful shutdown timed out after ${SHUTDOWN_TIMEOUT_MS}ms; forcing exit`,
      );
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    // Don't let the timer keep the process alive on its own.
    forceTimer.unref();

    try {
      await Promise.allSettled([
        consoleServer.close(),
        vite ? vite.close() : Promise.resolve(),
      ]);
    } finally {
      clearTimeout(forceTimer);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(0);
    }
  };

  for (const event of ["SIGINT", "SIGTERM", "SIGHUP"]) {
    process.on(event, () => {
      void shutdown();
    });
  }

  vite = await createViteServer({
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
