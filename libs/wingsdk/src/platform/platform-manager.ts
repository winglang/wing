import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import * as vm from "vm";
import { IPlatform } from "./platform";
import { scanDirForPlatformFile } from "./util";
import { App, AppProps, SynthHooks } from "../core";
import { Secret } from "../cloud";

interface PlatformManagerOptions {
  /**
   * Either a builtin platform name or a path to a custom platform
   */
  readonly platformPaths?: string[];
}

const BUILTIN_PLATFORMS = ["tf-aws", "tf-azure", "tf-gcp", "sim"];

/** @internal */
export class PlatformManager {
  private readonly platformPaths: string[];
  private readonly platformInstances: IPlatform[] = [];
  private synthHooks: SynthHooks = {};
  private newInstanceOverridesHooks: any[] = [];
  private parameterSchemas: any[] = [];
  private storeSecretsHook: any;

  constructor(options: PlatformManagerOptions) {
    this.platformPaths = options.platformPaths ?? [];
    this.retrieveImplicitPlatforms();
    this.createPlatformInstances();
    this.collectHooks();
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
    this.platformPaths.forEach((platformPath) => {
      this.loadPlatformPath(platformPath);
    });
  }

  public async storeSecrets(secretNames: string[]): Promise<any> {
    if (!this.storeSecretsHook) {
      throw new Error("No createSecrets method found on platform");
    }
    return await this.storeSecretsHook(secretNames);
  }

  private collectHooks() {
    let synthHooks: SynthHooks = {
      preSynthesize: [],
      postSynthesize: [],
      validate: [],
    };

    let newInstanceOverrides: any[] = [];

    let parameterSchemas: any[] = [];

    this.platformInstances.forEach((instance) => {
      if (instance.parameters) {
        parameterSchemas.push(instance.parameters);
      }

      if (instance.preSynth) {
        synthHooks.preSynthesize!.push(instance.preSynth.bind(instance));
      }

      if (instance.postSynth) {
        synthHooks.postSynthesize!.push(instance.postSynth.bind(instance));
      }

      if (instance.validate) {
        synthHooks.validate!.push(instance.validate.bind(instance));
      }

      if (instance.newInstance) {
        newInstanceOverrides.push(instance.newInstance.bind(instance));
      }

      if (instance.storeSecrets) {
        this.storeSecretsHook = instance.storeSecrets.bind(instance);
      }
    });

    this.synthHooks = synthHooks;
    this.newInstanceOverridesHooks = newInstanceOverrides;
    this.parameterSchemas = parameterSchemas;
  }

  // This method is called from preflight.cjs in order to return an App instance
  // that can be synthesized
  public createApp(appProps: AppProps): App {
    let appCall = this.platformInstances[0].newApp;

    if (!appCall) {
      throw new Error(
        `No newApp method found on platform: ${this.platformPaths[0]} (Hint: The first platform provided must have a newApp method)`
      );
    }

    const app = appCall!({
      ...appProps,
      synthHooks: this.synthHooks,
      newInstanceOverrides: this.newInstanceOverridesHooks,
    }) as App;

    let secretsIds = [];
    for (const c of app.node.findAll()) {
      if (c instanceof Secret) {
        const secret = c as Secret;
        secretsIds.push(secret.name);
      }
    }
    writeFileSync(join(app.outdir, "secrets.json"), JSON.stringify(secretsIds));

    let registrar = app.parameters;

    this.parameterSchemas.forEach((schema) => {
      registrar.addSchema(schema);
    });

    return app;
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
    console.error(
      "An error occurred while loading the custom platform:",
      error
    );
  }
}
