import { copyFile, mkdir } from "node:fs/promises";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

import pkg from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "electron/main/index.ts",
      vite: {
        build: {
          outDir: "dist/vite/electron/main",
        },
      },
    }),
    {
      name: "copy-preload-js",
      async buildStart(options) {
        await mkdir("dist/vite/electron/preload", { recursive: true });
        await copyFile(
          "electron/preload/index.js",
          "dist/vite/electron/preload/index.js",
        );
      },
    },
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
  build: {
    outDir: "dist/vite",
  },
});
