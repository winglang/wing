import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { type InlineConfig } from "vite";

export const viteConfig: InlineConfig = {
  configFile: false,
  root: fileURLToPath(new URL("../web", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("../dist/vite", import.meta.url)),
  },
};
