import { defineConfig } from "tsup";

export default defineConfig({
  "entry": [
    "src/**/*.ts"
  ],
  "outDir": "lib",
  "format": [
    "cjs"
  ],
  "target": "node18",
  "dts": true,
  "bundle": false,
  "clean": true
});
