import * as vite from "vite";

import { createEsbuildContext } from "./helpers/index.mjs";

console.log("Compiling the renderer files...");
await vite.build();

console.log("Compiling the electron main process...");
const esbuild = await createEsbuildContext({
  minify: true,
  define: {
    "process.env.PROD": "true",
    "import.meta.env": JSON.stringify({
      BASE_URL: "",
      MODE: "production",
      DEV: false,
      PROD: true,
      SSR: false,
    }),
    "process.env.SEGMENT_WRITE_KEY": JSON.stringify(
      process.env.SEGMENT_WRITE_KEY || "",
    ),
    "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN || ""),
  },
});
await esbuild.rebuild();
await esbuild.dispose();

console.log("Done");
