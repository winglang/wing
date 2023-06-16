import react from "@vitejs/plugin-react";
import { defineConfig } from "tsup";
import * as vite from "vite";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents"],
  format: ["cjs"],
  dts: true,
  clean: true,
  async onSuccess() {
    console.log("Build succeeded");

    console.log("Build UI files...");
    await vite.build({
      configFile: false,
      root: "./web",
      plugins: [react()],
      build: {
        outDir: "../dist/vite",
      },
      base: "./",
    });
  },
});
