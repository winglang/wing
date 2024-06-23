import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import { cwd } from "process";
import * as vm from "vm";
import { IConstruct } from "constructs";
import { ParameterRegistrar } from "./parameter-registrar";
import { scanDirForPlatformFile } from "./util";
import { SDK_PACKAGE_NAME } from "../constants";
import { AppProps, Connections, SynthHooks, synthesizeTree } from "../core";
import { NotImplementedError } from "../core/errors";
import { SECRET_SYMBOL } from "../core/types";
import { IResource } from "../std";

export const DEFAULT_ROOT_ID = "Default";
export const APP_SYMBOL = Symbol.for("@winglang/sdk.std.Node/app");

export enum LoadEnvironmentVariables {
  WING_TARGET = "WING_TARGET",
}

export interface IPlatformManager {
  readonly parameters: ParameterRegistrar;
  readonly target: string;
  synth(rootConstructType: any): void;
  resolveType(fqn: string): any;
  newAbstract(fqn: string, ...args: any[]): any;
  storeSecrets(secrets: Record<string, string>): Promise<void>;
}

/**
 * Platform interface
 */
export interface IPlatformProvider {
  /**
   * The model the platform is built for
   *
   * @example "sim"
   */
  readonly target: string;

  /**
   * The schema for the parameters the platform accepts
   */
  readonly parameters?: any;

  createApp(props: AppProps): IApp;

  resolveType(fqn: string): any;

  /**
   * Pre-synth hook
   *
   * @param app construct app
   */
  preSynth?(app: IConstruct): void;

  /**
   * Post-synth hook
   *
   * @param config generated config
   */
  postSynth?(config: any): any;

  /**
   * Validate hook
   *
   * @param config generated config
   */
  validate?(config: any): any;

  /**
   * Hook for creating and storing secrets
   */
  storeSecrets?(secrets: { [name: string]: string }): Promise<void>;
}

/**
 * Represents a Wing application.
 */
export interface IApp extends IConstruct {
  /**
   * Type marker.
   * @internal
   **/
  readonly [APP_SYMBOL]: true;

  /**
   * The `.wing` directory into which you can emit artifacts during preflight.
   */
  readonly workdir: string;

  /**
   * `true` if this is a testing environment
   */
  readonly isTestEnvironment: boolean;

  /**
   * The directory of the entrypoint of the current program.
   */
  readonly entrypointDir: string;

  /**
   * The platform this app is deployed to.
   */
  readonly platform: IPlatformManager;

  /**
   * Generate a unique ID for the given scope and prefix. The newly generated ID is
   * guaranteed to be unique within the given scope.
   * It will have the form '{prefix}{n}', where '{prefix}' is the given prefix and '{n}' is an
   * ascending sequence of integers starting from '0'.
   *
   * @param scope to guarantee uniqueness in
   * @param prefix prepended to the unique identifier
   */
  makeId(scope: IConstruct, prefix?: string): string;

  synth(): string;
}

interface PlatformManagerOptions {
  /**
   * A list of platform specifiers to load. Currently, this list includes both a platform provider
   * (e.g. "tf-aws") and paths/module names of platform extensions. In the future we will separate
   * these to two.
   *
   * At least one platform must be provided.
   */
  readonly extensions: string[];

  /**
   * A id for the root object. The default root id is "Default", but in most cases this value should
   * be set in `wing.toml` to represent the app identity within the target environment and create a
   * unique namespace for the resources.
   *
   * If this option is set, it will override the value in `wing.toml`.
   *
   * The root objects of test environments will have a unique per-test suffix so they can all be
   * deployed into a single environment.
   *
   * @default - no custom root id
   */
  readonly customRootId?: string;
}

const BUILTIN_PLATFORMS = ["tf-aws", "tf-azure", "tf-gcp", "sim"];

/** @internal */
export const SECRETS_FILE_NAME = "secrets.json";

/** @internal */
export class PlatformManager implements IPlatformManager {
  public static load(target?: string): IPlatformManager {
    const extensions = [];
    if (target) {
      extensions.push(target);
    }
    extensions.push(...(process.env.WING_PLATFORMS?.split(";") ?? []));

    return new PlatformManager({
      extensions,
      customRootId: process.env.WING_ROOT_ID,
    });
  }

  // private readonly platformPaths: string[];
  private readonly extensions: IPlatformProvider[] = [];
  public readonly parameters: ParameterRegistrar;
  public readonly provider: IPlatformProvider;
  public readonly target: string;

  private readonly customRootId?: string;

  private constructor(options: PlatformManagerOptions) {
    this.customRootId = options.customRootId;

    const specs = [...options.extensions, ...retrieveImplicitPlatforms()];
    this.extensions = specs.map((path) => loadPlatform(path));
    this.parameters = new ParameterRegistrar();
    if (!this.extensions[0]) {
      throw new Error(
        `No platform found (Hint: Ensure you have installed a platform provider)`
      );
    }

    this.provider = this.extensions[0];
    if (!this.provider) {
      throw new Error("At least one platform specifier must be provided");
    }

    this.target = this.provider.target;
  }

  public resolveType(fqn: string) {
    return this.provider.resolveType(fqn);
  }

  public newAbstract(fqn: string, ...args: any[]) {
    const type = this.resolveType(fqn);
    if (!type) {
      const typeName = fqn.replace(`${SDK_PACKAGE_NAME}.`, "");
      const typeNameParts = typeName.split(".");
      throw new NotImplementedError(
        `Resource "${fqn}" is not yet implemented for "${this.provider.target}" target. Please refer to the roadmap https://github.com/orgs/winglang/projects/3/views/1?filterQuery=${typeName}`,
        { resource: typeNameParts[typeNameParts.length - 1] }
      );
    }

    return new type(...args);
  }

  public synth(rootConstruct: any): void {
    const hooks = collectHooks(this.extensions);
    const rootId =
      this.customRootId ?? this.parameters.value("rootId") ?? DEFAULT_ROOT_ID;

    const outdir = process.env.WING_SYNTH_DIR ?? "."; // TODO: this should not have a default value
    const isTestEnvironment = !!process.env.WING_IS_TEST;
    const entrypointDir = process.env.WING_SOURCE_DIR ?? process.cwd(); // TODO: deprecate!

    const app = this.provider.createApp({
      platform: this,
      rootId,
      isTestEnvironment,
      entrypointDir,
      rootConstruct,
      outdir,
    });

    const secretNames = [];

    for (const c of app.node.findAll()) {
      if ((c as any)[SECRET_SYMBOL]) {
        const secret = c as any;
        secretNames.push(secret.name);
      }
    }

    if (secretNames.length > 0) {
      writeFileSync(
        join(outdir, SECRETS_FILE_NAME),
        JSON.stringify(secretNames)
      );
    }

    hooks.parameterSchemas.forEach((schema) => {
      this.parameters.addSchema(schema);
    });

    const synthHooks = hooks.synthHooks;

    //
    // Pre-synthesize

    // validate parameters
    this.parameters.validate();

    // call preSynthesize() on every construct in the tree
    for (const c of app.node.findAll()) {
      if (typeof (c as IResource)._preSynthesize === "function") {
        (c as IResource)._preSynthesize();
      }
    }

    synthHooks.preSynthesize.forEach((hook) => hook(this));

    //
    // Synthesize

    const filepath = app.synth();
    const outfile = resolve(filepath);

    // write `outdir/tree.json`
    synthesizeTree(app, outdir);

    // write `outdir/connections.json`
    Connections.of(app).synth(outdir);

    //
    // Post-synthesize

    // // return a cleaned snapshot of the resulting Terraform manifest for unit testing
    // const tfConfig = this.cdktfStack.toTerraform();
    // const cleaned = cleanTerraformConfig(tfConfig);

    if (synthHooks.postSynthesize) {
      synthHooks.postSynthesize.forEach((hook) => hook(outfile));
    }

    synthHooks.validate.forEach((hook) => hook(outfile));
  }

  public async storeSecrets(secrets: Record<string, string>): Promise<void> {
    const hooks = collectHooks(this.extensions);
    if (!hooks.storeSecretsHook) {
      throw new Error(
        `Cannot find a platform or platform extension that supports storing secrets`
      );
    }
    await hooks.storeSecretsHook(secrets);
  }
}

/**
 * Custom platforms need to be loaded into a custom context in order to
 * resolve their dependencies correctly.
 *
 * @internal
 */
export function _loadCustomPlatform(customPlatformPath: string): any {
  const isScoped = customPlatformPath.startsWith("@");

  const platformBaseDir = isScoped
    ? dirname(dirname(customPlatformPath))
    : dirname(customPlatformPath);

  const platformDir = join(platformBaseDir, "node_modules");

  /**
   * Support platforms that are provided as:
   * - A single js file (e.g. "/some/path/to/platform.js")
   * - A scoped package (e.g. "@scope/platform")
   * - A non-scoped package (e.g. "/some/path/platform")
   */
  const fullCustomPlatformPath = customPlatformPath.endsWith(".js")
    ? customPlatformPath
    : isScoped
    ? join(platformDir, `${customPlatformPath}/lib/index.js`)
    : `${customPlatformPath}/index.js`;

  // enable relative imports from the platform file
  const customPlatformBaseDir = customPlatformPath.endsWith(".js")
    ? dirname(customPlatformPath)
    : customPlatformPath;

  const cwdNodeModules = join(cwd(), "node_modules");
  const customPlatformLib = join(cwdNodeModules, customPlatformPath, "lib");

  const resolvablePaths = [
    ...module.paths,
    customPlatformBaseDir,
    platformDir,
    cwdNodeModules,
    customPlatformLib,
  ];

  const requireResolve = (path: string) => {
    return require.resolve(path, {
      paths: resolvablePaths,
    });
  };

  const platformRequire = (path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(requireResolve(path));
  };

  platformRequire.resolve = requireResolve;

  const platformModule = {
    exports: {},
  };

  const context = vm.createContext({
    require: platformRequire,
    console,
    exports: platformModule.exports,
    module: platformModule,
    process,
    __dirname: customPlatformPath,
  });

  try {
    const platformCode = readFileSync(fullCustomPlatformPath, "utf-8");
    const script = new vm.Script(platformCode);
    script.runInContext(context);
    return new (platformModule.exports as any).Platform();
  } catch (error) {
    if (process.env.DEBUG) {
      console.error(error);
    }
    const hint = customPlatformPath.includes(".")
      ? "Ensure the path to the platform is correct"
      : `Ensure you have installed the platform provider by running 'npm install ${customPlatformPath}'`;
    console.error(
      `An error occurred while loading the custom platform: ${customPlatformPath}\n\n(hint: ${hint})`
    );
  }
}

interface CollectHooksResult {
  synthHooks: SynthHooks;
  parameterSchemas: any[];
  storeSecretsHook?: any;
}

function collectHooks(platformInstances: IPlatformProvider[]) {
  let result: CollectHooksResult = {
    synthHooks: {
      preSynthesize: [],
      postSynthesize: [],
      validate: [],
    },
    parameterSchemas: [],
    storeSecretsHook: undefined,
  };

  platformInstances.forEach((instance) => {
    if (instance.parameters) {
      result.parameterSchemas.push(instance.parameters);
    }

    if (instance.preSynth) {
      result.synthHooks.preSynthesize.push(instance.preSynth.bind(instance));
    }

    if (instance.postSynth) {
      result.synthHooks.postSynthesize.push(instance.postSynth.bind(instance));
    }

    if (instance.validate) {
      result.synthHooks.validate.push(instance.validate.bind(instance));
    }

    if (instance.storeSecrets) {
      result.storeSecretsHook = instance.storeSecrets.bind(instance);
    }
  });

  return result;
}

function loadPlatform(spec: string) {
  const platformName = basename(spec);

  const isBuiltin = BUILTIN_PLATFORMS.includes(platformName);

  const pathToRead = isBuiltin
    ? join(__dirname, `../target-${platformName}/platform`)
    : join(spec);

  return isBuiltin
    ? loadBuiltinPlatform(pathToRead)
    : _loadCustomPlatform(pathToRead);
}

/**
 * Builtin platforms are loaded from the SDK
 *
 * @param builtinPlatformPath path to a builtin platform
 */
function loadBuiltinPlatform(builtinPlatformPath: string): any {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const loadedPlatform = require(builtinPlatformPath);
  if (!loadedPlatform || !loadedPlatform.Platform) {
    console.error(`Failed to load platform from ${builtinPlatformPath}`);
    return;
  }

  return new loadedPlatform.Platform();
}

/**
 * Retrieve all implicit platform declarations.
 *
 * These are platforms that are not explicitly declared in the cli options
 * but are implicitly available to the app.
 *
 * We look for platforms in the following locations:
 * - The source directory
 * - Any imported namespaces (provided by the wingc compiler output)
 *
 * To determine if a directory contains a platform, we check if it contains a file ending in "wplatform.js"
 * TODO: Support platforms defined in Wing (platform.w) https://github.com/winglang/wing/issues/4937
 */
function retrieveImplicitPlatforms() {
  const importedNamespaces = process.env.WING_IMPORTED_NAMESPACES?.split(";");
  const sourceDir = process.env.WING_SOURCE_DIR!;
  const platformPaths = [];

  if (sourceDir) {
    const sourceDirPlatformFile = scanDirForPlatformFile(sourceDir);
    if (sourceDirPlatformFile) {
      platformPaths.push(...sourceDirPlatformFile);
    }
  }

  if (importedNamespaces) {
    importedNamespaces.forEach((namespaceDir) => {
      const namespaceDirPlatformFile = scanDirForPlatformFile(namespaceDir);
      if (namespaceDirPlatformFile) {
        platformPaths.push(...namespaceDirPlatformFile);
      }
    });
  }

  return platformPaths;
}
