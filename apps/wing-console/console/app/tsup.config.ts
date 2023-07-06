import { defineConfig } from "tsup";
import * as vite from "vite";
import { viteConfig } from "./scripts/config.mjs";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents"],
  format: ["cjs"],
  dts: true,
  clean: true,
  async onSuccess() {
    console.log("Build succeeded");

    console.log("Build UI files...");
    await vite.build(viteConfig);
  },
});
