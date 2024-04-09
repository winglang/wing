import { readFileSync } from "fs";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import * as vm from "vm";
import { IPlatform } from "./platform";
import { scanDirForPlatformFile } from "./util";
import { App, AppProps, SynthHooks } from "../core";

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

  constructor(options: PlatformManagerOptions) {
    this.platformPaths = options.platformPaths ?? [];
    this.retrieveImplicitPlatforms();
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

  // This method is called from preflight.js in order to return an App instance
  // that can be synthesized
  public createApp(appProps: AppProps): App {
    this.createPlatformInstances();

    let appCall = this.platformInstances[0].newApp;

    if (!appCall) {
      throw new Error(
        `No newApp method found on platform: ${this.platformPaths[0]} (Hint: The first platform provided must have a newApp method)`
      );
    }

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
    });

    const app = appCall!({
      ...appProps,
      synthHooks,
      newInstanceOverrides,
    }) as App;

    let registrar = app.parameters;

    parameterSchemas.forEach((schema) => {
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
    const hint = customPlatformPath.includes(".") ?
     "Ensure the path to the platform is correct" :
     `Ensure you have installed the platform provider by running 'npm install ${customPlatformPath}'`
    console.error(
      `An error occurred while loading the custom platform: ${customPlatformPath}\n\n(hint: ${hint})`
    );
  }
}
