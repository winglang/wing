import RawPlugin from "esbuild-plugin-raw";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["fsevents"],
  format: ["cjs"],
  dts: true,
  // @ts-ignore-next-line
  esbuildPlugins: [RawPlugin()],
  clean: true,
});
