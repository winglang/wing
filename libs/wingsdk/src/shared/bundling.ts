import * as crypto from "crypto";
import { mkdirSync, realpathSync, writeFileSync } from "fs";
import { posix, resolve } from "path";
import { decode, encode } from "vlq";
import { normalPath } from "./misc";

const SDK_PATH = normalPath(resolve(__dirname, "..", ".."));

export interface Bundle {
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

  const outfileName = "index.cjs";
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
    target: "node20",
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
  fixSourcemaps(sourcemapData);

  writeFileSync(outfile, bundleOutput.contents);
  writeFileSync(outfileMap, JSON.stringify(sourcemapData));

  // calculate a md5 hash of the contents of asset.path
  const codeHash = crypto
    .createHash("md5")
    .update(bundleOutput.contents)
    .digest("hex");

  return {
    directory: outdir,
    hash: codeHash,
    outfilePath: outfile,
    sourcemapPath: outfileMap,
  };
}

export interface SourceMap {
  sourceRoot?: string;
  sources: string[];
  sourcesContent: string[];
  mappings: string;
}

/**
 * Takes a bundled sourcemap and does the following fixes:
 * - Normalizes paths in sources and sourceRoot
 * - Removes duplicate sources and sourcesContent
 * - Updates mappings to reflect the new source indices
 *
 * The duplicate sources come from esbuild's strange handling of multiple files being bundled that point to the same source (e.g. inflights that point to one .w file)
 * See https://github.com/evanw/esbuild/issues/933
 */
export function fixSourcemaps(sourcemapData: SourceMap): void {
  // normalize sourceRoot
  if (sourcemapData.sourceRoot) {
    sourcemapData.sourceRoot = normalPath(sourcemapData.sourceRoot);
  }

  // normalize sources and remove duplicates
  const sourceSet: string[] = [];
  const newSourceContents: string[] = [];
  const sourceIndexMap: Record<number, number> = {};
  let hasSourceDupes = false;
  sourcemapData.sources.forEach((source, idx) => {
    const newPath = normalPath(source);
    sourcemapData.sources[idx] = newPath;

    const existingIndex = sourceSet.indexOf(newPath);
    if (existingIndex === -1) {
      sourceSet.push(newPath);
      newSourceContents.push(sourcemapData.sourcesContent[idx]);
      sourceIndexMap[idx] = sourceSet.length - 1;
    } else {
      hasSourceDupes = true;
      sourceIndexMap[idx] = existingIndex;
    }
  });

  sourcemapData.sources = sourceSet;
  sourcemapData.sourcesContent = newSourceContents;

  // fast path: No source duplicates so no need to update mappings
  if (!hasSourceDupes) {
    return;
  }

  // update mappings
  let newMapping = "";
  let characterIndex = 0;
  let lastFile = 0;
  let lastTrueFile = 0;
  while (characterIndex < sourcemapData.mappings.length) {
    const char = sourcemapData.mappings[characterIndex];
    // `;` and `,` are separators between the segments of interest
    if (char === ";" || char === ",") {
      newMapping += char;
      characterIndex++;
      continue;
    }

    // get next slice of segment data
    let segment = "";
    let nextChar = char;
    while (nextChar !== undefined && nextChar !== "," && nextChar !== ";") {
      segment += nextChar;
      nextChar = sourcemapData.mappings[++characterIndex];
    }
    const decoded = decode(segment);
    if (decoded.length === 1) {
      newMapping += segment;
      continue;
    }

    const sourceRelative = decoded[1];
    const originalSource = lastTrueFile + sourceRelative;
    const newSourceIndex = sourceIndexMap[originalSource];
    lastTrueFile = originalSource;

    const newRelativeValue = newSourceIndex - lastFile;
    lastFile = newSourceIndex;

    if (newRelativeValue === decoded[1]) {
      // no change was made, avoid re-encoding
      newMapping += segment;
    } else {
      decoded[1] = newRelativeValue;
      newMapping += encode(decoded);
    }
  }

  sourcemapData.mappings = newMapping;
}
