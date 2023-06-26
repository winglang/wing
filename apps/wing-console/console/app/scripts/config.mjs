import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

/** @type vite.InlineConfig */
export const viteConfig = {
  configFile: false,
  root: fileURLToPath(new URL("../web", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("../dist/vite", import.meta.url)),
  },
};
