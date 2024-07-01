import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "cjs",
  target: "es2022",
  dts: true,
  clean: true,
  sourcemap: true,
  bundle: true,
  skipNodeModulesBundle: true,
});
