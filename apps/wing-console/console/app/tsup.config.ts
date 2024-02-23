import { defineConfig } from "tsup";
import * as vite from "vite";

import { viteConfig } from "./scripts/config.js";

export default defineConfig({
  entry: ["src/index.ts"],
  external: [
    "fsevents",
    // We want to keep the contents of the `scripts/` directory,
    // which include an applescript file.
    /scripts\/open\.mjs$/i,
  ],
  format: ["cjs"],
  env: {
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY ?? "",
  },
  dts: true,
  clean: true,
  async onSuccess() {
    console.log("Build succeeded");

    console.log("Build UI files...");
    await vite.build(viteConfig);
  },
});
