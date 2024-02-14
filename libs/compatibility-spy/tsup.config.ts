import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  bundle: false,
  format: "cjs",
  outDir: "lib",
});
