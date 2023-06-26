import { fileURLToPath } from "node:url";

import open from "open";

import { createConsoleApp } from "../dist/index.js";

const { port } = await createConsoleApp({
  wingfile: fileURLToPath(
    new URL("../../desktop/demo/index.w", import.meta.url),
  ),
});
await open(`http://localhost:${port}`);
