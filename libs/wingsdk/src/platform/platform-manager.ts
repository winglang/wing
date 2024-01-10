import { readFileSync } from "fs";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import * as vm from "vm";
import { Construct } from "constructs";
import { IPlatform } from "./platform";
import { App, AppProps } from "../core";
interface PlatformManagerOptions {
  /**
   * Either a builtin platform name or a path to a custom platform
   */
  readonly platformPaths?: string[];
}

interface PlatformHooks {
  newInstance: any[];
  typeForFqn: any[];
  preSynth: any[];
  postSynth: any[];
  validate: any[];
}

const BUILTIN_PLATFORMS = ["tf-aws", "tf-azure", "tf-gcp", "sim"];

/** @internal */
export class PlatformManager {
  private readonly platformPaths: string[];
  private readonly platformInstances: IPlatform[] = [];
  private hooks: PlatformHooks = {
    newInstance: [],
    typeForFqn: [],
    preSynth: [],
    postSynth: [],
    validate: [],
  };

  constructor(options: PlatformManagerOptions) {
    this.platformPaths = options.platformPaths ?? [];

    this.createPlatformInstances();
    this.collectCallBacks();
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

  public new(
    fqn: string,
    ctor: any,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    const instance = this._tryNewInstance(fqn, scope, id, ...args);
    if (instance) {
      return instance;
    }
    return new ctor(scope, id, ...args);
  }

  public typeForFqn(fqn: string): any {
    for (let t4f of this.hooks.typeForFqn) {
      const result = t4f(fqn);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  public _tryNewInstance(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    for (let callBack of this.hooks.newInstance) {
      const result = callBack(fqn, scope, id, ...args);
      if (result) {
        return result;
      }
    }

    return undefined;
  }

  // This method is called from preflight.js in order to return an App instance
  // that can be synthesized
  public createApp(appProps: AppProps): App {
    let appCall = this.platformInstances[0].newApp;

    if (!appCall) {
      throw new Error(
        `No newApp method found on platform: ${this.platformPaths[0]} (Hint: The first platform provided must have a newApp method)`
      );
    }

    return appCall!({
      ...appProps,
      _platformManager: this,
      synthHooks: {
        preSynthesize: this.hooks.preSynth,
        postSynthesize: this.hooks.postSynth,
        validate: this.hooks.validate,
      },
    }) as App;
  }

  /**
   * Collect all the callback hooks from the platform instances
   */
  private collectCallBacks() {
    // TODO: Create a single property called callbackHooks maybe and reset it each time
    this.platformInstances.forEach((instance) => {
      if (instance.preSynth) {
        this.hooks.preSynth.push(instance.preSynth.bind(instance));
      }

      if (instance.postSynth) {
        this.hooks.postSynth.push(instance.postSynth.bind(instance));
      }

      if (instance.validate) {
        this.hooks.validate!.push(instance.validate.bind(instance));
      }

      if (instance.newInstance) {
        this.hooks.newInstance.push(instance.newInstance.bind(instance));
      }

      if (instance.typeForFqn) {
        this.hooks.typeForFqn.push(instance.typeForFqn.bind(instance));
      }
    });
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
