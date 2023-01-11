import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [webfontDownload(), react()],
  build: {
    outDir: "dist/vite",
  },
  base: "./",
});
