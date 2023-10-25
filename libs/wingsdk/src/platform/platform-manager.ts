import { basename, join } from "path";
import { IPlatform } from "./platform";
import { App, AppProps, SynthHooks } from "../core";

interface PlatformManagerOptions {
  readonly appProps: AppProps;
  /**
   * Either a builtin platform name or a path to a custom platform
   */
  readonly platformPaths?: string[];
}

const BUILTIN_PLATFORMS = ["awscdk", "tf-aws", "tf-azure", "tf-gcp", "sim"];

/** @internal */
export class PlatformManager {
  private readonly platformPaths: string[];
  private readonly appProps: AppProps;
  private readonly platformInstances: IPlatform[] = [];

  constructor(options: PlatformManagerOptions) {
    this.appProps = options.appProps;
    this.platformPaths = options.platformPaths ?? [];
    this.appProps;
  }

  private loadPlatformPath(platformPath: string) {
    const platformName = basename(platformPath);
    const pathToRead = BUILTIN_PLATFORMS.includes(platformName)
      ? join(__dirname, `../target-${platformName}/platform`)
      : join(platformPath);

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const loadedPlatform = require(pathToRead);
    if (!loadedPlatform || !loadedPlatform.Platform) {
      console.error(`Failed to load platform from ${pathToRead}`);
      return;
    }

    this.platformInstances.push(new loadedPlatform.Platform());
  }

  private createPlatformInstances() {
    this.platformPaths.forEach((platformPath) => {
      this.loadPlatformPath(platformPath);
    });
  }

  // This method is called from preflight.js in order to return an App instance
  // that can be synthesized, so need to ignore the "declared but never read"
  // @ts-ignore-next-line
  private createApp(appProps: AppProps): App {
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

    this.platformInstances.forEach((instance) => {
      if (instance.preSynth) {
        synthHooks.preSynthesize!.push(instance.preSynth);
      }

      if (instance.postSynth) {
        synthHooks.postSynthesize!.push(instance.postSynth);
      }

      if (instance.validate) {
        synthHooks.validate!.push(instance.validate);
      }
    });

    return appCall!({
      ...appProps,
      synthHooks,
    }) as App;
  }
}
