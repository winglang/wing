import { fileURLToPath } from "node:url";
import { createConsoleApp } from "../dist/index.js";

await createConsoleApp({
  wingfile: fileURLToPath(new URL("../demo/index.w", import.meta.url)),
  requestedPort: 3000,
});
