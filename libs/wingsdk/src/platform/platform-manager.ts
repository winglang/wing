import { basename, join } from "path";
import { IPlatform } from "./platform";
import { App, AppProps, SynthHooks } from "../core";

interface PlatformManagerOptions {
  readonly appProps: AppProps;
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

  private addPlatformPath(platformPath: string) {
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

  public createPlatformInstances() {
    this.platformPaths.forEach((platformPath) => {
      this.addPlatformPath(platformPath);
    });
  }

  public createApp(appProps: AppProps): App {
    this.createPlatformInstances();

    let appCall: (props: AppProps) => App | undefined;
    let synthHooks: SynthHooks = {
      preSynthesize: [],
      postSynthesize: [],
      validate: [],
    };

    let firstAppFound = false;
    this.platformInstances.forEach((instance) => {
      if (instance.newApp && !firstAppFound) {
        appCall = instance.newApp;
        firstAppFound = true;
      }

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

    if (!firstAppFound) {
      throw new Error("No platform instance has a newApp method");
    }

    return appCall!({
      ...appProps,
      synthHooks,
    }) as App;
  }
}
