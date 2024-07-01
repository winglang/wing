import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/extension.ts"],
  outDir: "lib",
  external: ["vscode"],
  format: ["cjs"],
  clean: true,
});
