import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents"],
  format: ["esm"],
  dts: true,
  clean: true,
  env: {
    LICENSE_FILE: "../LICENSE.md",
  },
});
