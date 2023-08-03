import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/extension.ts"],
  outDir: "lib",
  external: ["fsevents", "vscode", "node-fetch"],
  format: ["cjs"],
  clean: true,
});
