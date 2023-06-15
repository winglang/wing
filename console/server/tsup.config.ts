import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents", "esbuild-wasm"],
  format: ["cjs", "esm"],
});
