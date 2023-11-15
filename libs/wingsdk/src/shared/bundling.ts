import * as crypto from "crypto";
import { mkdirSync, writeFileSync } from "fs";
import { join, relative, resolve } from "path";
import { buildSync } from "esbuild-wasm";
import { normalPath } from "./misc";

const SDK_PATH = normalPath(resolve(__dirname, "..", ".."));

export interface Bundle {
  entrypointPath: string;
  directory: string;
  hash: string;
}

/**
 * Bundles a javascript entrypoint into a single file.
 * @param entrypoint The javascript entrypoint
 * @param outputDir Defaults to `${entrypoint}.bundle`
 * @returns Bundle information
 */
export function createBundle(entrypoint: string, outputDir?: string): Bundle {
  const originalEntrypointDir = normalPath(resolve(entrypoint, ".."));
  const outdir = resolve(outputDir ?? entrypoint + ".bundle");
  mkdirSync(outdir, { recursive: true });

  const outfileName = "index.js";
  const soucemapFilename = `${outfileName}.map`;

  const outfile = join(outdir, outfileName);
  const outfileMap = join(outdir, soucemapFilename);

  let esbuild = buildSync({
    bundle: true,
    entryPoints: [normalPath(resolve(entrypoint))],
    outdir: originalEntrypointDir,
    sourceRoot: originalEntrypointDir + "/",
    absWorkingDir: originalEntrypointDir,
    // if the user has specified a node_modules directory to resolve from
    nodePaths: process.env.WING_NODE_MODULES
      ? [normalPath(process.env.WING_NODE_MODULES as string)]
      : undefined,
    alias: {
      "@winglang/sdk": SDK_PATH,
    },
    minify: false,
    sourcemap: "external",
    platform: "node",
    target: "node18",
    write: false,
  });

  if (esbuild.errors.length > 0) {
    const errors = esbuild.errors.map((e) => e.text).join("\n");
    throw new Error(`Failed to bundle function: ${errors}`);
  }

  const output = esbuild.outputFiles[1];
  let fileContents = new TextDecoder().decode(output.contents);

  // sourcemap hacks for winglang:
  // source paths in sourcemap are incorrect and need to be fixed
  const sourcemapData = JSON.parse(
    new TextDecoder().decode(esbuild.outputFiles[0].contents)
  );
  // unrandomize the sourceRoot
  sourcemapData.sourceRoot = normalPath(sourcemapData.sourceRoot).replace(
    /\.\d+\.tmp\/\.wing\//g,
    "/.wing/"
  );

  for (const [idx, source] of Object.entries(sourcemapData.sources)) {
    if ((source as any).endsWith(".w")) {
      const absolutePath = `/${source}`;
      const relativePath = relative(originalEntrypointDir, absolutePath);
      sourcemapData.sources[idx] = relativePath;
    }
  }

  fileContents += `//# sourceMappingURL=${soucemapFilename}`;

  writeFileSync(outfile, fileContents);
  writeFileSync(outfileMap, JSON.stringify(sourcemapData));

  // calculate a md5 hash of the contents of asset.path
  const codeHash = crypto.createHash("md5").update(fileContents).digest("hex");

  return {
    entrypointPath: outfile,
    directory: outdir,
    hash: codeHash,
  };
}
