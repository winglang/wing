import { copyFile, mkdir } from "node:fs/promises";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

import pkg from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: "electron/main/index.ts",
        vite: {
          build: {
            outDir: "dist/vite/electron/main",
          },
          resolve: {
            // Since we're building for electron (which uses nodejs), we don't want to use the "browser" field in the packages.
            // It makes our build fail for the `ws` and `isomorphic-ws` packages, for example.
            // @ts-ignore-error
            browserField: false,
            mainFields: ["module", "jsnext:main", "jsnext"],
          },
        },
      },
      {
        entry: "electron/preload/index.ts",
        vite: {
          build: {
            outDir: "dist/vite/electron/preload",
          },
          resolve: {
            // Since we're building for electron (which uses nodejs), we don't want to use the "browser" field in the packages.
            // It makes our build fail for the `ws` and `isomorphic-ws` packages, for example.
            // @ts-ignore-error
            browserField: false,
            mainFields: ["module", "jsnext:main", "jsnext"],
          },
        },
      },
    ]),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
  build: {
    outDir: "dist/vite",
  },
});
