import { spawnSync } from "child_process";
import * as crypto from "crypto";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { normalPath } from "../util";

export interface Bundle {
  entrypointPath: string;
  directory: string;
  hash: string;
}

export function createBundle(entrypoint: string): Bundle {
  const outdir = entrypoint + ".bundle";
  mkdirSync(outdir, { recursive: true });
  const outfile = join(outdir, "index.js");

  // if the user has specified a node_modules directory to resolve from
  const nodePathString = process.env.WING_NODE_MODULES
    ? `nodePaths: [\"${normalPath(process.env.WING_NODE_MODULES as string)}\"],`
    : "";

  // We would invoke esbuild directly here, but there is a bug where esbuild
  // mangles the stdout/stderr of the process that invokes it.
  // https://github.com/evanw/esbuild/issues/2927
  // To workaround the issue, spawn a new process and invoke esbuild inside it.

  let esbuildScript = [
    `const esbuild = require("${normalPath(
      require.resolve("esbuild-wasm")
    )}");`,
    `esbuild.buildSync({ bundle: true, entryPoints: ["${normalPath(
      entrypoint
    )}"], outfile: "${normalPath(outfile)}", ${nodePathString}
    minify: false, platform: "node", target: "node16", external: ["aws-sdk"],
   });`,
  ].join("\n");
  let result = spawnSync(process.argv[0], ["-e", esbuildScript]);
  if (result.status !== 0) {
    throw new Error(
      `Failed to bundle function: ${result.stderr.toString("utf-8")}`
    );
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
