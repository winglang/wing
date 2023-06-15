import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents"],
  format: ["cjs"],
  splitting: false,
});
