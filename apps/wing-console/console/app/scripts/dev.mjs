import { createConsoleServer } from "@wingconsole/server";
import { fileURLToPath } from "node:url";
import open from "open";
import react from "@vitejs/plugin-react";

import { createServer as createViteServer } from "vite";

const vite = await createViteServer({
  server: { middlewareMode: true },

  configFile: false,
  root: fileURLToPath(new URL("../web", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("../dist/vite", import.meta.url)),
  },
  base: "./",
});

const { port } = await createConsoleServer({
  wingfile: fileURLToPath(new URL("../demo/index.w", import.meta.url)),
  async onExpressCreated(app) {
    app.use(vite.middlewares);
  },
  log: {
    info: console.log,
    error: console.error,
    verbose: console.log,
  },
  config: {
    addEventListener(event, listener) {},
    removeEventListener(event, listener) {},
    get(key) {
      return undefined;
    },
    set(key, value) {},
  },
});

await open(`http://localhost:${port}`);

console.log(`Wing Console is running on http://localhost:${port}/`);
