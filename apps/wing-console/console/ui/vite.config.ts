/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
