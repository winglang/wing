import * as vite from "vite";

import { runEsbuild } from "./helpers/runEsbuild.mjs";

console.log("Building the renderer files...");
await vite.build();

console.log("Building the electron main process...");
await runEsbuild({
  minify: true,
});
