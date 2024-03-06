import * as crypto from "crypto";
import { mkdirSync, realpathSync, writeFileSync } from "fs";
import { posix, resolve } from "path";
import { normalPath } from "./misc";

const SDK_PATH = normalPath(resolve(__dirname, "..", ".."));

export interface Bundle {
  entrypointPath: string;
  directory: string;
  hash: string;
  outfilePath: string;
  sourcemapPath: string;
}

/**
 * Bundles a javascript entrypoint into a single file.
 * @param entrypoint The javascript entrypoint
 * @param outputDir Defaults to `${entrypoint}.bundle`
 * @param external external packages
 * @returns Bundle information
 */
export function createBundle(
  entrypoint: string,
  external: string[] = [],
  outputDir?: string
): Bundle {
  const normalEntrypoint = normalPath(realpathSync(entrypoint));
  const outdir = outputDir
    ? normalPath(realpathSync(outputDir))
    : `${normalEntrypoint}.bundle`;
  mkdirSync(outdir, { recursive: true });

  const outfileName = "index.js";
  const soucemapFilename = `${outfileName}.map`;

  const outfile = posix.join(outdir, outfileName);
  const outfileMap = posix.join(outdir, soucemapFilename);

  // eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-require-imports
  const esbuilder: typeof import("esbuild") = require("esbuild");

  let esbuild = esbuilder.buildSync({
    bundle: true,
    entryPoints: [normalEntrypoint],
    outfile,
    // otherwise there are problems with running azure cloud functions:
    // https://stackoverflow.com/questions/70332883/webpack-azure-storage-blob-node-fetch-abortsignal-issue
    keepNames: true,
    // if the user has specified a node_modules directory to resolve from
    nodePaths: process.env.WING_NODE_MODULES
      ? [normalPath(process.env.WING_NODE_MODULES as string)]
      : undefined,
    alias: {
      "@winglang/sdk": SDK_PATH,
    },
    minify: false,
    sourcemap: "linked",
    platform: "node",
    target: "node18",
    format: "cjs",
    external,
    write: false,
  });

  if (esbuild.errors.length > 0) {
    const errors = esbuild.errors.map((e) => e.text).join("\n");
    throw new Error(`Failed to bundle function: ${errors}`);
  }

  const bundleOutput = esbuild.outputFiles[1];

  // ensure source paths have posix path separators
  const sourcemapData = JSON.parse(
    new TextDecoder().decode(esbuild.outputFiles[0].contents)
  );
  if (sourcemapData.sourceRoot) {
    sourcemapData.sourceRoot = normalPath(sourcemapData.sourceRoot);
  }

  for (const [idx, source] of Object.entries(
    sourcemapData.sources as string[]
  )) {
    sourcemapData.sources[idx] = normalPath(source);
  }

  writeFileSync(outfile, bundleOutput.contents);
  writeFileSync(outfileMap, JSON.stringify(sourcemapData));

  // calculate a md5 hash of the contents of asset.path
  const codeHash = crypto
    .createHash("md5")
    .update(bundleOutput.contents)
    .digest("hex");

  return {
    entrypointPath: outfile,
    directory: outdir,
    hash: codeHash,
    outfilePath: outfile,
    sourcemapPath: outfileMap,
  };
}
