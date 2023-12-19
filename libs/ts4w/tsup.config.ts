import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/internal.ts"],
  format: "cjs",
  target: "es2022",
  dts: true,
  clean: true,
  sourcemap: true,
  bundle: false,
});
