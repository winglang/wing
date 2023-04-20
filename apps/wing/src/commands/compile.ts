import * as vm from "vm";

import { readFile, rmSync, mkdirp, mkdirpSync, copySync } from "fs-extra";
import { basename, dirname, join, resolve } from "path";
import * as os from "os";

import chalk from "chalk";
import debug from "debug";
import * as wingCompiler from "../wingc";
import { normalPath } from "../util";
import { CHARS_ASCII, emitDiagnostic, Severity, File, Label } from "codespan-wasm";

// increase the stack trace limit to 50, useful for debugging Rust panics
// (not setting the limit too high in case of infinite recursion)
Error.stackTraceLimit = 50;

const log = debug("wing:compile");
const WINGC_COMPILE = "wingc_compile";
const WINGC_PREFLIGHT = "preflight.js";

/**
 * Available targets for compilation.
 * This is passed from Commander to the `compile` function.
 */
export enum Target {
  TF_AWS = "tf-aws",
  TF_AZURE = "tf-azure",
  TF_GCP = "tf-gcp",
  SIM = "sim",
  AWSCDK = "awscdk",
}

const DEFAULT_SYNTH_DIR_SUFFIX: Record<Target, string | undefined> = {
  [Target.TF_AWS]: "tfaws",
  [Target.TF_AZURE]: "tfazure",
  [Target.TF_GCP]: "tfgcp",
  [Target.SIM]: "wsim",
  [Target.AWSCDK]: "awscdk",
};

/**
 * Compile options for the `compile` command.
 * This is passed from Commander to the `compile` function.
 */
export interface CompileOptions {
  readonly target: Target;
  readonly plugins?: string[];
  /**
   * Whether to run the compiler in `wing test` mode. This may create multiple
   * copies of the application resources in order to run tests in parallel.
   */
  readonly testing?: boolean;
}

/**
 * Determines the synth directory for a given target. This is the directory
 * within the output directory where the SDK app will synthesize its artifacts
 * for the given target.
 */
function resolveSynthDir(outDir: string, entrypoint: string, target: Target, testing: boolean = false, tmp: boolean = false) {
  const targetDirSuffix = DEFAULT_SYNTH_DIR_SUFFIX[target];
  if (!targetDirSuffix) {
    throw new Error(`unsupported target ${target}`);
  }
  const entrypointName = basename(entrypoint, ".w");
  const tmpSuffix = tmp ? `.${Date.now().toString().slice(-6)}.tmp` : "";
  const lastPart = `${entrypointName}.${targetDirSuffix}${tmpSuffix}`
  if (testing) {
    return join(outDir, "test", lastPart);
  } else {
    return join(outDir, lastPart);
  }
}

/**
 * Compiles a Wing program. Throws an error if compilation fails.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 * @returns the output directory
 */
export async function compile(entrypoint: string, options: CompileOptions): Promise<string> {
  // create a unique temporary directory for the compilation
  const targetdir = join(dirname(entrypoint), "target");
  const wingFile = entrypoint;
  log("wing file: %s", wingFile);
  const wingDir = dirname(wingFile);
  log("wing dir: %s", wingDir);
  const testing = options.testing ?? false;
  log("testing: %s", testing);
  const tmpSynthDir = resolveSynthDir(targetdir, wingFile, options.target, testing, true);
  log("temp synth dir: %s", tmpSynthDir);
  const synthDir = resolveSynthDir(targetdir, wingFile, options.target, testing);
  log("synth dir: %s", synthDir);
  const workDir = resolve(tmpSynthDir, ".wing");
  log("work dir: %s", workDir);

  process.env["WING_SYNTH_DIR"] = tmpSynthDir;
  process.env["WING_NODE_MODULES"] = resolve(join(wingDir, "node_modules"));
  process.env["WING_TARGET"] = options.target;
  process.env["WING_IS_TEST"] = testing.toString();

  await Promise.all([
    mkdirp(workDir),
    mkdirp(tmpSynthDir),
  ]);

  const wingc = await wingCompiler.load({
    env: {
      RUST_BACKTRACE: "full",
      WING_SYNTH_DIR: normalPath(tmpSynthDir),
      WINGC_PREFLIGHT,
      CLICOLOR_FORCE: chalk.supportsColor ? "1" : "0",
    },
    preopens: {
      [wingDir]: wingDir, // for Rust's access to the source dir
      [workDir]: workDir, // for Rust's access to the work directory
      [tmpSynthDir]: tmpSynthDir, // for Rust's access to the synth directory
    },
  });

  const arg = `${normalPath(wingFile)};${normalPath(workDir)};${normalPath(resolve(wingDir))}`;
  log(`invoking %s with: "%s"`, WINGC_COMPILE, arg);
  let compileResult;
  try {
    compileResult = wingCompiler.invoke(wingc, WINGC_COMPILE, arg);
  } catch (e) {
    // This is a bug in Wing, not the user's code.
    console.error(e);
    console.log("\n\n" + chalk.bold.red("Internal error:") + " An internal compiler error occurred. Please report this bug by creating an issue on GitHub (github.com/winglang/wing/issues) with your code and this trace.");
    process.exit(1);
  }
  if (compileResult !== 0) {
    // This is a bug in the user's code. Print the compiler diagnostics.
    const errors: wingCompiler.WingDiagnostic[] = JSON.parse(compileResult.toString());
    const result = [];
    const coloring = chalk.supportsColor ? chalk.supportsColor.hasBasic : false;

    for (const error of errors) {
      const { message, span, level } = error;
      let files: File[] = [];
      let labels: Label[] = [];

      if (span !== null) {
        // `span` should only be null if source file couldn't be read etc.
        const source = await readFile(span.file_id, "utf8");
        const start = offsetFromLineAndColumn(source, span.start.line, span.start.col);
        const end = offsetFromLineAndColumn(source, span.end.line, span.end.col);
        files.push({
          name: span.file_id,
          source,
        });
        labels.push({
          fileId: span.file_id,
          rangeStart: start,
          rangeEnd: end,
          message,
          style: "primary"
        });
      }

      const diagnosticText = await emitDiagnostic(files, {
        message,
        severity: level.toLowerCase() as Severity,
        labels,
      }, {
        chars: CHARS_ASCII
      }, coloring);
      result.push(diagnosticText);
    }
    throw new Error(result.join("\n"));
  }

  const artifactPath = resolve(workDir, WINGC_PREFLIGHT);
  log("reading artifact from %s", artifactPath);
  const artifact = await readFile(artifactPath, "utf-8");
  log("artifact: %s", artifact);

  // Try looking for dependencies not only in the current directory (wherever
  // the wing CLI was installed to), but also in the source code directory.
  // This is necessary because the Wing app may have installed dependencies in
  // the project directory.
  const requireResolve = (path: string) => require.resolve(path, { paths: [workDir, __dirname, wingDir] });
  const preflightRequire = (path: string) => require(requireResolve(path));
  preflightRequire.resolve = requireResolve;

  // If you're wondering how the execution of the preflight works, despite it
  // being in a different directory: it works because at the top of the file
  // require.resolve is called to cache wingsdk in-memory. So by the time VM
  // is starting up, the passed context already has wingsdk in it.
  // "__dirname" is also synthetically changed so nested requires work.
  const context = vm.createContext({
    require: preflightRequire,
    process,
    console,
    __dirname: workDir,
    __filename: artifactPath,
    $plugins: resolvePluginPaths(options.plugins ?? []),
    // since the SDK is loaded in the outer VM, we need these to be the same class instance,
    // otherwise "instanceof" won't work between preflight code and the SDK. this is needed e.g. in
    // `serializeImmutableData` which has special cases for serializing these types.
    Map,
    Set,
    Array,
    Promise,
    Object,
    RegExp,
    String,
    Date,
    Function,
  });

  try {
    vm.runInContext(artifact, context);
  } catch (e) {
    console.error(
      chalk.bold.red("preflight error:") + " " + (e as any).message
    );

    if (
      (e as any).stack &&
      (e as any).stack.includes("evalmachine.<anonymous>:")
    ) {
      console.log();
      console.log(
        "  " +
        chalk.bold.white("note:") +
        " " +
        chalk.white(`intermediate javascript code (${artifactPath}):`)
      );
      const lineNumber =
        Number.parseInt(
          (e as any).stack.split("evalmachine.<anonymous>:")[1].split(":")[0]
        ) - 1;
      const lines = artifact.split("\n");
      let startLine = Math.max(lineNumber - 2, 0);
      let finishLine = Math.min(lineNumber + 2, lines.length - 1);

      // print line and its surrounding lines
      for (let i = startLine; i <= finishLine; i++) {
        if (i === lineNumber) {
          console.log(chalk.bold.red(">> ") + chalk.red(lines[i]));
        } else {
          console.log("   " + chalk.dim(lines[i]));
        }
      }
    }

    if (process.env.NODE_STACKTRACE) {
      console.error(
        "--------------------------------- STACK TRACE ---------------------------------"
      );
      console.error((e as any).stack);
    } else {
      console.log(
        "  " +
        chalk.bold.white("note:") +
        " " +
        chalk.white(
          "run with `NODE_STACKTRACE=1` environment variable to display a stack trace"
        )
      );
    }

    return process.exit(1);
  }

  if(os.platform() === "win32") {
    // Windows doesn't really support fully atomic moves.
    // So we just copy the directory instead.
    // Also only using sync methods to avoid possible async fs issues.
    rmSync(synthDir, { recursive: true, force: true });
    mkdirpSync(synthDir);
    copySync(tmpSynthDir, synthDir);
    rmSync(tmpSynthDir, { recursive: true, force: true });
  } else {
    // Move the temporary directory to the final target location in an atomic operation
    copySync(tmpSynthDir, synthDir, { overwrite: true } );
    rmSync(tmpSynthDir, { recursive: true, force: true });
  }

  return synthDir;
}

/**
 * Resolves a list of plugin paths as absolute paths, using the current working directory
 * if absolute path is not provided.
 *
 * @param plugins list of plugin paths (absolute or relative)
 * @returns list of absolute plugin paths or relative to cwd
 */
function resolvePluginPaths(plugins: string[]): string[] {
  const resolvedPluginPaths: string[] = [];
  for (const plugin of plugins) {
    resolvedPluginPaths.push(resolve(process.cwd(), plugin));
  }
  return resolvedPluginPaths;
}

function offsetFromLineAndColumn(source: string, line: number, column: number) {
  const lines = source.split("\n");
  let offset = 0;
  for (let i = 0; i < line; i++) {
    offset += lines[i].length + 1;
  }
  offset += column;
  return offset;
}
