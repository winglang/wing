import * as vm from "vm";

import { promises as fs, lstatSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import * as os from "os";

import * as wingCompiler from "./wingc";
import { copyDir, normalPath } from "./util";
import { existsSync } from "fs";
import { Target } from "./constants";
import { CompileError, PreflightError } from "./errors";

// increase the stack trace limit to 50, useful for debugging Rust panics
// (not setting the limit too high in case of infinite recursion)
Error.stackTraceLimit = 50;

// const log = debug("wing:compile");
const WINGC_COMPILE = "wingc_compile";
const WINGC_PREFLIGHT = "preflight.js";

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
  readonly rootId?: string;
  readonly value?: string;
  readonly values?: string;
  /**
   * Whether to run the compiler in `wing test` mode. This may create multiple
   * copies of the application resources in order to run tests in parallel.
   */
  readonly testing?: boolean;
  readonly log?: (...args: any[]) => void;

  /// Enable/disable color output for the compiler (subject to terminal detection)
  readonly color?: boolean;

  // target directory for the output files
  readonly targetDir?: string;
}

/**
 * Determines the synth directory for a given target. This is the directory
 * within the output directory where the SDK app will synthesize its artifacts
 * for the given target.
 */
function resolveSynthDir(
  outDir: string,
  entrypoint: string,
  target: Target,
  testing: boolean = false,
  tmp: boolean = false,
  log?: (...args: any[]) => void
) {
  const targetDirSuffix = DEFAULT_SYNTH_DIR_SUFFIX[target];
  if (!targetDirSuffix) {
    throw new Error(`unsupported target ${target}`);
  }

  let entrypointName;
  try {
    const isDirectory = lstatSync(entrypoint).isDirectory();
    if (isDirectory) {
      entrypointName = basename(resolve(entrypoint));
    } else {
      entrypointName = basename(entrypoint, ".w");
    }
  } catch (err) {
    log?.(err);
    throw new Error("Source file cannot be found");
  }
  const tmpSuffix = tmp ? `.${Date.now().toString().slice(-6)}.tmp` : "";
  const lastPart = `${entrypointName}.${targetDirSuffix}${tmpSuffix}`;
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
  const { log } = options;
  // create a unique temporary directory for the compilation
  const targetdir = options.targetDir ?? join(dirname(entrypoint), "target");
  const wingFile = resolve(entrypoint);
  log?.("wing file: %s", wingFile);
  const wingDir = resolve(dirname(wingFile));
  log?.("wing dir: %s", wingDir);
  const testing = options.testing ?? false;
  log?.("testing: %s", testing);
  const tmpSynthDir = resolveSynthDir(targetdir, wingFile, options.target, testing, true);
  log?.("temp synth dir: %s", tmpSynthDir);
  const synthDir = resolveSynthDir(targetdir, wingFile, options.target, testing);
  log?.("synth dir: %s", synthDir);
  const workDir = resolve(tmpSynthDir, ".wing");
  log?.("work dir: %s", workDir);

  // TODO: couldn't be moved to the context's since used in utils.env(...)
  // in the future we may look for a unified approach
  process.env["WING_TARGET"] = options.target;
  process.env["WING_VALUES"] = options.value?.length == 0 ? undefined : options.value;
  process.env["WING_VALUES_FILE"] = options.values;
  process.env["WING_IS_TEST"] = testing.toString();
  process.env["WING_PLUGIN_PATHS"] = resolvePluginPaths(options.plugins ?? []);

  const tempProcess: { env: Record<string, string | undefined> } = { env: { ...process.env } };

  tempProcess.env["WING_SOURCE_DIR"] = wingDir;
  if (options.rootId) {
    tempProcess.env["WING_ROOT_ID"] = options.rootId;
  }
  // from wingDir, find the nearest node_modules directory
  let wingNodeModules = join(wingDir, "node_modules");
  while (!existsSync(wingNodeModules)) {
    wingNodeModules = dirname(dirname(wingNodeModules));

    if (wingNodeModules === "/" || wingNodeModules.match(/^[A-Z]:\\/)) {
      break;
    }

    wingNodeModules = resolve(wingNodeModules, "node_modules");
  }

  tempProcess.env["WING_SYNTH_DIR"] = tmpSynthDir;
  tempProcess.env["WING_NODE_MODULES"] = wingNodeModules;

  await Promise.all([
    fs.mkdir(workDir, { recursive: true }),
    fs.mkdir(tmpSynthDir, { recursive: true }),
  ]);

  let env: Record<string, string> = {
    RUST_BACKTRACE: "full",
    WING_SYNTH_DIR: normalPath(tmpSynthDir),
  };
  if (options.color !== undefined) {
    env.CLICOLOR = options.color ? "1" : "0";
  }

  const wingc = await wingCompiler.load({
    env,
    imports: {
      env: {
        send_diagnostic,
      },
    },
  });

  const errors: wingCompiler.WingDiagnostic[] = [];

  function send_diagnostic(data_ptr: number, data_len: number) {
    const data_buf = Buffer.from(
      (wingc.exports.memory as WebAssembly.Memory).buffer,
      data_ptr,
      data_len
    );
    const data_str = new TextDecoder().decode(data_buf);
    errors.push(JSON.parse(data_str));
  }

  const arg = `${normalPath(wingFile)};${normalPath(workDir)};${normalPath(wingDir)}`;
  log?.(`invoking %s with: "%s"`, WINGC_COMPILE, arg);
  let compileSuccess: boolean;
  try {
    compileSuccess = wingCompiler.invoke(wingc, WINGC_COMPILE, arg) !== 0;
  } catch (error) {
    // This is a bug in the compiler, indicate a compilation failure.
    // The bug details should be part of the diagnostics handling below.
    compileSuccess = false;
  }
  if (!compileSuccess) {
    // This is a bug in the user's code. Print the compiler diagnostics.
    throw new CompileError(errors);
  }

  if (isEntrypointFile(entrypoint)) {
    await runPreflightCodeInVm(workDir, wingDir, tempProcess, log);
  }

  if (os.platform() === "win32") {
    // Windows doesn't really support fully atomic moves.
    // So we just copy the directory instead.
    // Also only using sync methods to avoid possible async fs issues.
    await fs.rm(synthDir, { recursive: true, force: true });
    await fs.mkdir(synthDir, { recursive: true });
    await copyDir(tmpSynthDir, synthDir);
    await fs.rm(tmpSynthDir, { recursive: true, force: true });
  } else {
    // Move the temporary directory to the final target location in an atomic operation
    await copyDir(tmpSynthDir, synthDir);
    await fs.rm(tmpSynthDir, { recursive: true, force: true });
  }

  return synthDir;
}

function isEntrypointFile(path: string) {
  return (
    path.endsWith(".main.w") ||
    path.endsWith(".test.w") ||
    path.endsWith("/main.w") ||
    path.endsWith("\\main.w") ||
    path === "main.w"
  );
}

async function runPreflightCodeInVm(
  workDir: string,
  wingDir: string,
  tempProcess: { env: Record<string, string | undefined> },
  log?: (...args: any[]) => void
): Promise<void> {
  const artifactPath = join(workDir, WINGC_PREFLIGHT);
  log?.("reading artifact from %s", artifactPath);
  const artifact = await fs.readFile(artifactPath, "utf-8");
  log?.("artifact: %s", artifact);

  // Try looking for dependencies not only in the current directory (wherever
  // the wing CLI was installed to), but also in the source code directory.
  // This is necessary because the Wing app may have installed dependencies in
  // the project directory.
  const requireResolve = (path: string) =>
    require.resolve(path, { paths: [__dirname, wingDir, workDir] });
  const preflightRequire = (path: string) => require(requireResolve(path));
  preflightRequire.resolve = requireResolve;

  // If you're wondering how the execution of the preflight works, despite it
  // being in a different directory: it works because at the top of the file
  // require.resolve is called to cache wingsdk in-memory. So by the time VM
  // is starting up, the passed context already has wingsdk in it.
  // "__dirname" is also synthetically changed so nested requires work.
  const context = vm.createContext({
    require: preflightRequire,
    process: tempProcess,
    console,
    __dirname: workDir,
    __filename: artifactPath,
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
  } catch (error) {
    throw new PreflightError(error as any, artifactPath, artifact);
  }
}

/**
 * Resolves a list of plugin paths as absolute paths, using the current working directory
 * if absolute path is not provided.
 *
 * @param plugins list of plugin paths (absolute or relative)
 * @returns list of absolute plugin paths or relative to cwd, joined by ";"
 */
function resolvePluginPaths(plugins: string[]): string {
  const resolvedPluginPaths: string[] = [];
  for (const plugin of plugins) {
    resolvedPluginPaths.push(resolve(process.cwd(), plugin));
  }
  return resolvedPluginPaths.join(";");
}
