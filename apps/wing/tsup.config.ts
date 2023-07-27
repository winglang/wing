import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["cjs"],
  bundle: false,
  dts: true,
  clean: true,
});
