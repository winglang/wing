import { fileURLToPath } from "node:url";

import { createConsoleApp } from "@wingconsole/app";

await createConsoleApp({
  wingfile: fileURLToPath(new URL("../demo/main.w", import.meta.url)),
  requestedPort: 3000,
});
