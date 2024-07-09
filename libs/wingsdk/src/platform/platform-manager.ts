import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import * as vm from "vm";
import { IPlatform } from "./platform";
import { scanDirForPlatformFile } from "./util";
import { App, AppProps, ClassFactory, SynthHooks } from "../core";
import { SECRET_SYMBOL } from "../core/types";

interface PlatformManagerOptions {
  /**
   * Either a builtin platform name or a path to a custom platform
   */
  readonly platformPaths?: string[];
}

const BUILTIN_PLATFORMS = ["tf-aws", "tf-azure", "tf-gcp", "sim"];

/** @internal */
export const SECRETS_FILE_NAME = "secrets.json";

/** @internal */
export class PlatformManager {
  private readonly platformPaths: string[];
  private platformInstances: IPlatform[] = [];

  constructor(options: PlatformManagerOptions) {
    this.platformPaths = options.platformPaths ?? [];
    this.retrieveImplicitPlatforms();
    this.createPlatformInstances();
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
  private retrieveImplicitPlatforms() {
    const importedNamespaces = process.env.WING_IMPORTED_NAMESPACES?.split(";");
    const sourceDir = process.env.WING_SOURCE_DIR!;

    if (sourceDir) {
      const sourceDirPlatformFile = scanDirForPlatformFile(sourceDir);
      if (sourceDirPlatformFile) {
        this.platformPaths.push(...sourceDirPlatformFile);
      }
    }

    if (importedNamespaces) {
      importedNamespaces.forEach((namespaceDir) => {
        const namespaceDirPlatformFile = scanDirForPlatformFile(namespaceDir);
        if (namespaceDirPlatformFile) {
          this.platformPaths.push(...namespaceDirPlatformFile);
        }
      });
    }
  }

  private loadPlatformPath(platformPath: string) {
    const platformName = basename(platformPath);

    const isBuiltin = BUILTIN_PLATFORMS.includes(platformName);

    const pathToRead = isBuiltin
      ? join(__dirname, `../target-${platformName}/platform`)
      : join(platformPath);

    this.platformInstances.push(
      isBuiltin
        ? this.loadBuiltinPlatform(pathToRead)
        : _loadCustomPlatform(pathToRead)
    );
  }

  /**
   * Builtin platforms are loaded from the SDK
   *
   * @param builtinPlatformPath path to a builtin platform
   */
  private loadBuiltinPlatform(builtinPlatformPath: string): any {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const loadedPlatform = require(builtinPlatformPath);
    if (!loadedPlatform || !loadedPlatform.Platform) {
      console.error(`Failed to load platform from ${builtinPlatformPath}`);
      return;
    }

    return new loadedPlatform.Platform();
  }

  private createPlatformInstances() {
    this.platformInstances = [];
    this.platformPaths.forEach((platformPath) => {
      this.loadPlatformPath(platformPath);
    });
  }

  public createClassFactory(): ClassFactory {
    this.createPlatformInstances();
    const newInstanceOverrides: any[] = [];
    const resolveTypeOverrides: any[] = [];

    this.platformInstances.forEach((instance) => {
      if (instance.newInstance) {
        newInstanceOverrides.push(instance.newInstance.bind(instance));
      }
      if (instance.resolveType) {
        resolveTypeOverrides.push(instance.resolveType.bind(instance));
      }
    });

    // Reverse the overrides so that the last platform's newInstance
    // method is attempted first, then the second to last, etc.
    newInstanceOverrides.reverse();
    resolveTypeOverrides.reverse();

    return new ClassFactory(newInstanceOverrides, resolveTypeOverrides);
  }

  // This method is called from preflight.js in order to return an App instance
  // that can be synthesized
  public createApp(appProps: Omit<AppProps, "classFactory">): App {
    if (globalThis.$ClassFactory !== undefined) {
      throw new Error("$ClassFactory already defined");
    }
    globalThis.$ClassFactory = this.createClassFactory();

    let appCall = this.platformInstances[0].newApp;

    if (!appCall) {
      throw new Error(
        `No newApp method found on platform: ${this.platformPaths[0]} (Hint: The first platform provided must have a newApp method)`
      );
    }

    let hooks = collectHooks(this.platformInstances);

    const app = appCall!({
      ...appProps,
      classFactory: globalThis.$ClassFactory,
      synthHooks: hooks.synthHooks,
    }) as App;

    let secretNames = [];
    for (const c of app.node.findAll()) {
      if ((c as any)[SECRET_SYMBOL]) {
        const secret = c as any;
        secretNames.push(secret.name);
      }
    }

    if (secretNames.length > 0) {
      writeFileSync(
        join(app.outdir, SECRETS_FILE_NAME),
        JSON.stringify(secretNames)
      );
    }

    let registrar = app.parameters;

    hooks.parameterSchemas.forEach((schema) => {
      registrar.addSchema(schema);
    });

    return app;
  }

  public async storeSecrets(secrets: Record<string, string>): Promise<void> {
    const hooks = collectHooks(this.platformInstances);
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
  newInstanceOverrides: any[];
  parameterSchemas: any[];
  storeSecretsHook?: any;
}

function collectHooks(platformInstances: IPlatform[]) {
  let result: CollectHooksResult = {
    synthHooks: {
      preSynthesize: [],
      postSynthesize: [],
      validate: [],
    },
    newInstanceOverrides: [],
    parameterSchemas: [],
    storeSecretsHook: undefined,
  };

  platformInstances.forEach((instance) => {
    if (instance.parameters) {
      result.parameterSchemas.push(instance.parameters);
    }

    if (instance.preSynth) {
      result.synthHooks.preSynthesize!.push(instance.preSynth.bind(instance));
    }

    if (instance.postSynth) {
      result.synthHooks.postSynthesize!.push(instance.postSynth.bind(instance));
    }

    if (instance.validate) {
      result.synthHooks.validate!.push(instance.validate.bind(instance));
    }

    if (instance.newInstance) {
      result.newInstanceOverrides.push(instance.newInstance.bind(instance));
    }

    if (instance.storeSecrets) {
      result.storeSecretsHook = instance.storeSecrets.bind(instance);
    }
  });

  // Reverse the newInstanceOverrides so that the last platform's newInstance
  // method is attempted first, then the second to last, etc.
  result.newInstanceOverrides = result.newInstanceOverrides.reverse();

  return result;
}
