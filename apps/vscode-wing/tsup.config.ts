import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/extension.ts"],
  outDir: "lib",
  external: ["fsevents", "vscode"],
  format: ["cjs"],
  clean: true,
});
