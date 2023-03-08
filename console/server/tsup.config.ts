import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  // splitting: false,
  // sourcemap: true,
  // clean: true,
  external: ["fsevents", "esbuild-wasm"],
  format: ["cjs", "esm"],
});
