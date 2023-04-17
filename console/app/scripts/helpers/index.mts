import { copyFile, mkdir } from "node:fs/promises";

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

export const copyVm2Files = async () => {
  await mkdir(outdir, { recursive: true });
  return Promise.all(
    ["bridge.js", "setup-sandbox.js", "events.js", "setup-node-sandbox.js"].map(
      (file) =>
        copyFile(
          `node_modules/@winglang/sdk/node_modules/vm2/lib/${file}`,
          `${outdir}/${file}`,
        ),
    ),
  );
};
