import { promises as fs, lstatSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import * as os from "os";

import * as wingCompiler from "./wingc";
import { normalPath } from "./util";
import { existsSync } from "fs";
import { BuiltinPlatform } from "./constants";
import { CompileError, PreflightError } from "./errors";
import { readFile } from "fs/promises";
import { fork } from "child_process";

// increase the stack trace limit to 50, useful for debugging Rust panics
// (not setting the limit too high in case of infinite recursion)
Error.stackTraceLimit = 50;

// const log = debug("wing:compile");
const WINGC_COMPILE = "wingc_compile";
const WINGC_PREFLIGHT = "preflight.cjs";
const DOT_WING = ".wing";

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
  readonly preflightLog?: (...args: any[]) => void;

  /// Enable/disable color output for the compiler (subject to terminal detection)
  readonly color?: boolean;

  // target directory for the output files
  readonly targetDir?: string;

  // overrides the target directory for the output files
  readonly output?: string;
}

/**
 * Determines the synth directory for a given target. This is the directory
 * within the output directory where the SDK app will synthesize its artifacts
 * for the given target.
 */
function resolveSynthDir(outDir: string, entrypoint: string, target: string, testing: boolean) {
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
    testing && target !== BuiltinPlatform.SIM ? `.${Date.now().toString().slice(-6)}` : "";
  const lastPart = `${entrypointName}.${targetDirSuffix}${randomPart}`;
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
  if (platforms.length === 0) {
    return "";
  }
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
  const preflightLog = options.preflightLog ?? process.stdout.write.bind(process.stdout);
  // create a unique temporary directory for the compilation
  const targetdir = options.targetDir ?? join(dirname(entrypoint), "target");
  const entrypointFile = resolve(entrypoint);
  log?.("wing file: %s", entrypointFile);
  const wingDir = resolve(dirname(entrypointFile));
  log?.("wing dir: %s", wingDir);
  const testing = options.testing ?? false;
  log?.("testing: %s", testing);
  const target = determineTargetFromPlatforms(options.platform);
  const synthDir = options.output ?? resolveSynthDir(targetdir, entrypointFile, target, testing);
  log?.("synth dir: %s", synthDir);
  const workDir = resolve(synthDir, DOT_WING);
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
  };

  let wingNodeModules = nearestNodeModules(wingDir);

  if (!existsSync(synthDir)) {
    await fs.mkdir(workDir, { recursive: true });
  }
  const compileForPreflightResult = await compileForPreflight({
    entrypointFile,
    workDir,
    wingDir,
    synthDir,
    color: options.color,
    log,
  });
  if (compileForPreflightResult.diagnostics.length > 0) {
    throw new CompileError(compileForPreflightResult.diagnostics);
  }

  if (isEntrypointFile(entrypoint)) {
    let preflightEnv: Record<string, string | undefined> = {
      ...process.env,
      WING_TARGET: target,
      WING_PLATFORMS: resolvePlatformPaths(options.platform),
      WING_SYNTH_DIR: synthDir,
      WING_SOURCE_DIR: wingDir,
      WING_IS_TEST: process.env["WING_IS_TEST"] ?? testing.toString(),
      WING_VALUES: options.value?.length == 0 ? undefined : options.value,
      WING_VALUES_FILE: options.values ?? defaultValuesFile(),
      WING_NODE_MODULES: wingNodeModules,
      WING_IMPORTED_NAMESPACES:
        compileForPreflightResult.compilerOutput?.imported_namespaces.join(";"),
    };

    if (options.rootId) {
      preflightEnv.WING_ROOT_ID = options.rootId;
    }

    if (os.platform() === "win32") {
      // In worker threads on Windows, environment variables are case-sensitive.
      // Most people probably already assume this is the case everywhere, so
      // it is sufficient for now to just to normalize common automatic env vars.

      if ("Path" in preflightEnv) {
        preflightEnv.PATH = preflightEnv.Path;
        delete preflightEnv.Path;
      }
    }

    await runPreflightCodeInWorkerThread(
      compileForPreflightResult.preflightEntrypoint,
      preflightEnv,
      (data) => preflightLog?.(data.toString())
    );
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

interface CompileForPreflightResult {
  readonly preflightEntrypoint: string;
  readonly compilerOutput?: {
    imported_namespaces: string[];
  };
  readonly diagnostics: wingCompiler.WingDiagnostic[];
}

async function compileForPreflight(props: {
  entrypointFile: string;
  workDir: string;
  wingDir: string;
  synthDir: string;
  color?: boolean;
  log?: (...args: any[]) => void;
}): Promise<CompileForPreflightResult> {
  if (props.entrypointFile.endsWith(".ts")) {
    const diagnostics: wingCompiler.WingDiagnostic[] = [];
    let typescriptFramework;
    try {
      typescriptFramework = (await import("@wingcloud/framework")).internal;
    } catch (err) {
      return {
        preflightEntrypoint: "",
        diagnostics: [
          {
            message: `\
  Failed to load "@wingcloud/framework": ${(err as any).message}
  
  To use Wing with TypeScript files, you must install "@wingcloud/framework" as a dependency of your project.
  npm i @wingcloud/framework
  `,
            severity: "error",
            annotations: [],
            hints: [],
          },
        ],
      };
    }

    return {
      preflightEntrypoint: await typescriptFramework.compile({
        workDir: props.workDir,
        entrypoint: props.entrypointFile,
      }),
      diagnostics,
    };
  } else {
    let env: Record<string, string> = {
      RUST_BACKTRACE: "full",
      WING_SYNTH_DIR: normalPath(props.synthDir),
    };
    if (props.color !== undefined) {
      env.CLICOLOR = props.color ? "1" : "0";
    }

    const wingc = await wingCompiler.load({
      env,
      imports: {
        env: {
          send_diagnostic,
        },
      },
    });

    const diagnostics: wingCompiler.WingDiagnostic[] = [];

    function send_diagnostic(data_ptr: number, data_len: number) {
      const data_buf = Buffer.from(
        (wingc.exports.memory as WebAssembly.Memory).buffer,
        data_ptr,
        data_len
      );
      const data_str = new TextDecoder().decode(data_buf);
      diagnostics.push(JSON.parse(data_str));
    }

    const arg = `${normalPath(props.entrypointFile)};${normalPath(props.workDir)};${normalPath(
      props.wingDir
    )}`;
    props.log?.(`invoking %s with: "%s"`, WINGC_COMPILE, arg);
    let compilerOutput: string | number = "";
    try {
      compilerOutput = wingCompiler.invoke(wingc, WINGC_COMPILE, arg);
    } catch (error) {
      // This is a bug in the compiler, indicate a compilation failure.
      // The bug details should be part of the diagnostics handling below.
    }

    return {
      preflightEntrypoint: join(props.workDir, WINGC_PREFLIGHT),
      compilerOutput: JSON.parse(compilerOutput as string),
      diagnostics,
    };
  }
}

/**
 * Check if in the current working directory there is a default values file
 * only the first match is returned from the list of default values files
 *
 * @returns default values file from the current working directory
 */
function defaultValuesFile() {
  const defaultConfigs = ["wing.toml", "wing.yaml", "wing.yml", "wing.json"];

  for (const configFile of defaultConfigs) {
    if (existsSync(join(process.cwd(), configFile))) {
      return configFile;
    }
  }
  return "";
}

async function runPreflightCodeInWorkerThread(
  entrypoint: string,
  env: Record<string, string | undefined>,
  onStdout: (data: Buffer) => void
): Promise<void> {
  try {
    env.WING_PREFLIGHT_ENTRYPOINT = JSON.stringify(entrypoint);

    await new Promise((resolve, reject) => {
      const worker = fork(join(__dirname, "..", "preflight.shim.cjs"), {
        env,
        stdio: "pipe",
      });
      worker.stdout?.on("data", onStdout);
      worker.stderr?.on("data", onStdout);
      worker.on("message", reject);
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
    const artifact = await readFile(entrypoint, "utf-8");
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
