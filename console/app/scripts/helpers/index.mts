import * as esbuild from "esbuild";

const outdir = "dist/vite/electron/main";

export const createEsbuildContext = async <T extends esbuild.BuildOptions>(
  options?: T,
) => {
  return await esbuild.context({
    ...options,
    entryPoints: ["electron/main/index.ts"],
    outfile: `${outdir}/index.js`,
    // Target the node bundled by electron. See https://releases.electronjs.org/.
    target: "node18.12.1",
    platform: "node",
    format: "cjs",
    bundle: true,
    external: ["electron", "fsevents", "esbuild", "esbuild-wasm"],
  });
};
