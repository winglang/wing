import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["vm2", "fsevents", "esbuild-wasm"],
  format: ["cjs", "esm"],
});
