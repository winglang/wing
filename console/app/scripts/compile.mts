import * as vite from "vite";

import { runEsbuild } from "./helpers/runEsbuild.mjs";

console.log("Compiling the renderer files...");
await vite.build();

console.log("Compiling the electron main process...");
await runEsbuild({
  minify: true,
});
