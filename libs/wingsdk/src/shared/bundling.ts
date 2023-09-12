import * as crypto from "crypto";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { buildSync } from "esbuild-wasm";
import { normalPath } from "./misc";

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
  const outdir = resolve(outputDir ?? entrypoint + ".bundle");
  mkdirSync(outdir, { recursive: true });
  const outfile = join(outdir, "index.js");

  let esbuild = buildSync({
    bundle: true,
    entryPoints: [normalPath(resolve(entrypoint))],
    outfile: normalPath(outfile),
    // if the user has specified a node_modules directory to resolve from
    nodePaths: process.env.WING_NODE_MODULES
      ? [normalPath(process.env.WING_NODE_MODULES as string)]
      : undefined,
    minify: false,
    platform: "node",
    target: "node18",
  });

  if (esbuild.errors.length > 0) {
    const errors = esbuild.errors.map((e) => e.text).join("\n");
    throw new Error(`Failed to bundle function: ${errors}`);
  }

  // the bundled contains line comments with file paths, which are not useful for us, especially
  // since they may contain system-specific paths. sadly, esbuild doesn't have a way to disable
  // this, so we simply filter those out from the bundle.
  const outlines = readFileSync(outfile, "utf-8").split("\n");
  const isNotLineComment = (line: string) => !line.startsWith("//");
  const final = outlines.filter(isNotLineComment).join("\n");
  writeFileSync(outfile, final);

  // calculate a md5 hash of the contents of asset.path
  const codeHash = crypto.createHash("md5").update(final).digest("hex");

  return {
    entrypointPath: outfile,
    directory: outdir,
    hash: codeHash,
  };
}
