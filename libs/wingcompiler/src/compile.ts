import { promises as fs, lstatSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import * as os from "os";

import * as wingCompiler from "./wingc";
import { copyDir, normalPath } from "./util";
import { existsSync } from "fs";
import { BuiltinPlatform } from "./constants";
import { CompileError, PreflightError } from "./errors";
import { spawn } from "child_process";

// increase the stack trace limit to 50, useful for debugging Rust panics
// (not setting the limit too high in case of infinite recursion)
Error.stackTraceLimit = 50;

// const log = debug("wing:compile");
const WINGC_COMPILE = "wingc_compile";
const WINGC_PREFLIGHT = "preflight.js";

const BUILTIN_PLATFORMS = [
  BuiltinPlatform.SIM,
  BuiltinPlatform.TF_AWS,
  BuiltinPlatform.TF_AZURE,
  BuiltinPlatform.TF_GCP,
  BuiltinPlatform.AWSCDK, // TODO: remove this when awscdk platform is implemented external platform
];

const defaultSynthDir = (model: string): string => {
  switch (model) {
    case BuiltinPlatform.TF_AWS:
      return "tfaws";
    case BuiltinPlatform.TF_AZURE:
      return "tfazure";
    case BuiltinPlatform.TF_GCP:
      return "tfgcp";
    case BuiltinPlatform.SIM:
      return "wsim";
    default:
      return model;
  }
};

/**
 * Compile options for the `compile` command.
 * This is passed from Commander to the `compile` function.
 */
export interface CompileOptions {
  readonly platform: string[];
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
  target: string,
  testing: boolean = false,
  tmp: boolean = false
) {
  const targetDirSuffix = defaultSynthDir(target);

  let entrypointName;
  try {
    const isDirectory = lstatSync(entrypoint).isDirectory();
    if (isDirectory) {
      entrypointName = basename(resolve(entrypoint));
    } else {
      entrypointName = basename(entrypoint, ".w");
    }
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      // ENOENT is not a useful error here, anything else might be interesting
      console.error(err);
    }

    throw new Error("Source file cannot be found");
  }
  const randomPart =
    tmp || (testing && target !== BuiltinPlatform.SIM) ? `.${Date.now().toString().slice(-6)}` : "";
  const tmpSuffix = tmp ? ".tmp" : "";
  const lastPart = `${entrypointName}.${targetDirSuffix}${randomPart}${tmpSuffix}`;
  if (testing) {
    return join(outDir, "test", lastPart);
  } else {
    return join(outDir, lastPart);
  }
}

/**
 * Determines the model for a given list of platforms.
 *
 * @param platforms list of wing platforms
 * @returns the resolved model
 */
export function determineTargetFromPlatforms(platforms: string[]): string {
  if (platforms.length === 0) { return ""; }
  // determine target based on first platform
  const platform = platforms[0];

  // If its a builtin platform just return
  if (BUILTIN_PLATFORMS.includes(platform)) {
    return platform;
  }

  // load custom platform to retrieve the target
  const { _loadCustomPlatform } = require("@winglang/sdk/lib/platform");
  return _loadCustomPlatform(platform).target;
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
  const target = determineTargetFromPlatforms(options.platform);
  const tmpSynthDir = resolveSynthDir(targetdir, wingFile, target, testing, true);
  log?.("temp synth dir: %s", tmpSynthDir);
  const synthDir = resolveSynthDir(targetdir, wingFile, target, testing);
  log?.("synth dir: %s", synthDir);
  const workDir = resolve(tmpSynthDir, ".wing");
  log?.("work dir: %s", workDir);

  const nearestNodeModules = (dir: string): string => {
    let nodeModules = join(dir, "node_modules");
    while (!existsSync(nodeModules)) {
      nodeModules = dirname(dirname(nodeModules));

      if (nodeModules === "/" || nodeModules.match(/^[A-Z]:\\/)) {
        break;
      }

      nodeModules = resolve(nodeModules, "node_modules");
    }

    return nodeModules;
  }

  let compilerModuleDir = nearestNodeModules(__dirname);
  let sdkModuleDir = nearestNodeModules(join(require.resolve("@winglang/sdk"), "..", "..", ".."));
  let wingNodeModules = nearestNodeModules(wingDir);
  let workDirNodeModules = nearestNodeModules(workDir);

  const nodePaths = [compilerModuleDir, sdkModuleDir, wingNodeModules, workDirNodeModules];
  if (process.env.NODE_PATH) {
    nodePaths.push(process.env.NODE_PATH);
  }

  await Promise.all([
    fs.mkdir(workDir, { recursive: true }),
    fs.mkdir(tmpSynthDir, { recursive: true }),
  ]);

  let preflightEntrypoint = join(workDir, WINGC_PREFLIGHT);

  // Do TS compilation
  if(entrypoint.endsWith(".ts")) {
    const ts4w = await import("ts4w/dist/compiler.js")
    .catch((err) => {
      throw new Error(`\
Failed to load "ts4w": ${err.message}

To use Wing with TypeScript files, you must install "ts4w" as a dependency of your project.
npm i ts4w
`);
    });

    preflightEntrypoint = await ts4w.compile({
      workDir,
      entrypoint,
    });
  } else {
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
  }

  if (isEntrypointFile(entrypoint)) {
    let preflightEnv: Record<string, string | undefined> = {
      ...process.env,
      WING_TARGET: target,
      WING_PLATFORMS: resolvePlatformPaths(options.platform),
      WING_SYNTH_DIR: tmpSynthDir,
      WING_SOURCE_DIR: wingDir,
      WING_IS_TEST: testing.toString(),
      WING_VALUES: options.value?.length == 0 ? undefined : options.value,
      WING_VALUES_FILE: options.values,
      WING_NODE_MODULES: wingNodeModules,
      NODE_PATH: nodePaths.join(os.platform() === "win32" ? ";" : ":"),
    };
  
    if (options.rootId) {
      preflightEnv.WING_ROOT_ID = options.rootId;
    }

    await runPreflightCodeInVm(preflightEntrypoint, wingDir, preflightEnv, log);
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
    path.endsWith(".ts") ||
    path.endsWith(".main.w") ||
    path.endsWith(".test.w") ||
    path.endsWith("/main.w") ||
    path.endsWith("\\main.w") ||
    path === "main.w"
  );
}

async function runPreflightCodeInVm(
  entrypoint: string,
  wingDir: string,
  env: Record<string, string | undefined>,
  log?: (...args: any[]) => void,
): Promise<void> {
  log?.("reading artifact from %s", entrypoint);
  const artifact = await fs.readFile(entrypoint, "utf-8");
  log?.("artifact: %s", artifact);

  // Try looking for dependencies not only in the current directory (wherever
  // the wing CLI was installed to), but also in the source code directory.
  // This is necessary because the Wing app may have installed dependencies in
  // the project directory.
  const requireResolve = (path: string) =>
    require.resolve(path, { paths: [__dirname, wingDir, dirname(entrypoint)] });
  const preflightRequire = (path: string) => require(requireResolve(path));
  preflightRequire.resolve = requireResolve;

  try {
    await new Promise((resolve, reject) => {
      const worker = spawn(process.execPath, [entrypoint], { 
        env,
        shell: false,
        windowsHide: true,
        stdio: "inherit",
      });

      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code === 0) {
          resolve(undefined);
        } else {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  } catch (error) {
    throw new PreflightError(error as any, entrypoint, artifact);
  }
}

/**
 * Resolves a list of platform paths as absolute paths, using the current working directory
 * if absolute path is not provided.
 *
 * @param platforms list of platform paths (absolute or relative or builtin)
 * @returns list of absolute platform paths or relative to cwd, joined by ";"
 */
function resolvePlatformPaths(platform: string[]): string {
  const resolvedPluginPaths: string[] = [];
  for (const plugin of platform) {
    if (plugin.startsWith("@")) {
      resolvedPluginPaths.push(plugin);
      continue;
    }
    resolvedPluginPaths.push(resolve(process.cwd(), plugin));
  }
  return resolvedPluginPaths.join(";");
}
