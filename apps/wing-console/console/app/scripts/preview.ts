import open from "open";

import { createConsoleApp } from "../dist/index.js";

(async () => {
  const { port } = await createConsoleApp({
    wingfile: "../desktop/demo/index.w",
  });
  await open(`http://localhost:${port}`);
})();
