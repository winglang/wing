// idk how many of these are actually needed
import { nodePolyfills } from "vite-plugin-node-polyfills";

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      "wasi-js/dist/bindings/node": "wasi-js/dist/bindings/browser",
    },
  },
  plugins: [nodePolyfills()],
  worker: {
    format: "es",
    plugins: [nodePolyfills()],
  },
  build: {
    target: "es2022",
    commonjsOptions: {
      // This is needed because winglang is symlinked
      include: [/winglang/, /node_modules/],
    },
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
  optimizeDeps: {
    include: ["winglang"],
    esbuildOptions: {
      target: "es2022",
    },
    force: true,
  },
};
