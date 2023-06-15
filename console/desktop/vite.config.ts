import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig((env) => ({
  plugins: [env.mode === "production" ? webfontDownload() : undefined, react()],
  build: {
    outDir: "dist/vite",
  },
  base: "./",
}));
