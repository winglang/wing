import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents", "@winglang/sdk"],
  format: ["cjs", "esm"],
  splitting: false,
});
