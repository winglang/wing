import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

import pkg from "./package.json";
import { copyFile, mkdir } from "node:fs/promises";

export const alias = {
  "@": path.join(__dirname, "src"),
};

export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main/index.ts",
        vite: {
          build: {
            outDir: "dist/vite/electron/main",
          },
        },
      },
    }),
    {
      name: "copy-preload-js",
      async buildStart(options) {
        await mkdir("dist/vite/electron/preload", { recursive: true });
        await copyFile(
          "electron/main/preload/preload.js",
          "dist/vite/electron/preload/preload.js",
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
