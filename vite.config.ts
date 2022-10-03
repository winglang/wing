/* eslint-disable import/no-extraneous-dependencies */
import { rmSync } from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { Plugin, UserConfig, defineConfig } from "vite";
import electron from "vite-plugin-electron";

import pkg from "./package.json";

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
        vite: withDebug({
          build: {
            outDir: "dist/vite/electron/main",
          },
        }),
      },
    }),
    renderBuiltUrl(),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
  build: {
    outDir: "dist/vite",
  },
});

function withDebug(config: UserConfig): UserConfig {
  if (process.env.VSCODE_DEBUG) {
    config.build = {
      ...config.build,
      sourcemap: true,
    };
    config.plugins = [
      ...(config.plugins ?? []),
      {
        name: "electron-vite-debug",
        configResolved(config) {
          const index = config.plugins.findIndex(
            (p) => p.name === "electron-main-watcher",
          );
          // At present, Vite can only modify plugins in configResolved hook.
          (config.plugins as Plugin[]).splice(index, 1);
        },
      },
    ];
  }
  return config;
}

// Only worked Vite@3.x #52
function renderBuiltUrl(): Plugin {
  // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts#L84-L124
  const KNOWN_ASSET_TYPES = new Set([
    // images
    "png",
    "jpe?g",
    "jfif",
    "pjpeg",
    "pjp",
    "gif",
    "svg",
    "ico",
    "webp",
    "avif",

    // media
    "mp4",
    "webm",
    "ogg",
    "mp3",
    "wav",
    "flac",
    "aac",

    // fonts
    "woff2?",
    "eot",
    "ttf",
    "otf",

    // other
    "webmanifest",
    "pdf",
    "txt",
  ]);

  return {
    name: "render-built-url",
    config(config) {
      config.experimental = {
        renderBuiltUrl(filename, type) {
          if (
            KNOWN_ASSET_TYPES.has(path.extname(filename).slice(1)) &&
            type.hostType === "js"
          ) {
            // Avoid Vite relative-path assets handling
            // https://github.com/vitejs/vite/blob/89dd31cfe228caee358f4032b31fdf943599c842/packages/vite/src/node/build.ts#L838-L875
            return { runtime: JSON.stringify(filename) };
          }
        },
      };
    },
  };
}
