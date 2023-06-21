import externalGlobalPlugin from "esbuild-plugin-external-global";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  platform: "browser",
  globalName: "WingConsole",
  external: ["react", "react-dom"],
  format: ["cjs", "esm", "iife"],
  esbuildPlugins: [
    externalGlobalPlugin.externalGlobalPlugin({
      react: "window.React",
      "react-dom": "window.ReactDOM",
    }),
  ],
});
