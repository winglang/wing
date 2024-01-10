import { Construct, IConstruct } from "constructs";
import { NotImplementedError } from "./errors";
import { SDK_PACKAGE_NAME } from "../constants";
import { PlatformManager } from "../platform";
import { APP_SYMBOL, IApp, Node } from "../std/node";
import type { IResource } from "../std/resource";
import { TestRunner } from "../std/test-runner";

/**
 * Props for all `App` classes.
 */
export interface AppProps {
  /**
   * Directory where artifacts are synthesized to.
   * @default - current working directory
   */
  readonly outdir?: string;

  /**
   * The name of the app.
   * @default "app"
   */
  readonly name?: string;

  /**
   * The root construct class that should be instantiated with a scope and id.
   * If provided, then it will be instantiated on the user's behalf.
   * When the app is synthesized with `isTestEnvironment` set to `true`, then
   * one instance of the root construct will be created per test; otherwise,
   * it will be created exactly once.
   * @default - no root construct
   */
  readonly rootConstruct?: any;

  /**
   * Whether or not this app is being synthesized into a test environment.
   * @default false
   */
  readonly isTestEnvironment?: boolean;

  /**
   *  The absolute directory location for the wing entry point file
   */
  readonly entrypointDir: string;

  /**
   *  The App root id
   * @default Default
   */
  readonly rootId?: string;

  /**
   * Hooks to be called at various stages of the synthesis process.
   * @default - no hooks
   */
  readonly synthHooks?: SynthHooks;

  /**
   * Hooks for overriding newInstance calls
   * @default - []
   */
  readonly newInstanceOverrides?: any[];

  /**
   * Back reference to platform manager that created this App
   * @default - No platform manager
   * @internal
   */
  readonly _platformManager?: PlatformManager;
}

/**
 * Hooks for the synthesis process.
 */
export interface SynthHooks {
  /**
   * Hooks to be called before synthesizing the app.
   */
  readonly preSynthesize?: any[];

  /**
   * Hooks to be called after synthesizing the app.
   */
  readonly postSynthesize?: any[];

  /**
   * Hooks to be called for validating the synthesized configuration.
   */
  readonly validate?: any[];
}

/**
 * A Wing application.
 */
export abstract class App extends Construct implements IApp {
  /**
   * Returns the root app.
   */
  public static of(scope: Construct): App {
    return Node.of(scope).app as App;
  }

  /**
   * Loads the `App` class for the given target.
   * @param target one of the supported targets
   * @returns an `App` class constructor
   */
  public static for(target: string): any {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(`../target-${target}/app`).App;
    } catch (e: any) {
      if (e.code === "MODULE_NOT_FOUND") {
        const cannotFindModule = e.message.split("\n")[0];
        throw new Error(
          `${cannotFindModule}. The target "${target}" requires this module to be installed globally (using "npm i -g").`
        );
      }

      throw new Error(`Unknown compilation target: "${target}": ${e.message}`);
    }
  }

  /** @internal */
  public readonly [APP_SYMBOL] = true;

  /**
   * The name of the compilation target.
   * @internal
   */
  public abstract readonly _target:
    | "sim"
    | "tf-aws"
    | "tf-azure"
    | "tf-gcp"
    | "awscdk";

  /**
   * Wing source files directory absolute path
   */
  public readonly entrypointDir: string;

  /**
   * Used in `makeId` to keep track of known IDs
   */
  private readonly _idCounters: Record<string, number> = {};

  /**
   * The output directory.
   */
  public abstract readonly outdir: string;

  /**
   * Whether or not this app is being synthesized into a test environment.
   */
  public readonly isTestEnvironment: boolean;

  /**
   * NewInstance hooks for defining resource implementations.
   * @internal
   */
  public readonly _newInstanceOverrides: any[];

  /**
   * Back reference to the platform manager that created this app instance
   * @internal
   */
  public readonly _platformManager?: PlatformManager;

  /**
   * The test runner for this app. Only created if `isTestEnvironment` is true.
   * @internal
   */
  public _testRunner: TestRunner | undefined;

  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id);
    if (!props.entrypointDir) {
      throw new Error("Missing environment variable: WING_SOURCE_DIR");
    }

    // the app is also marked as root in the case where there is no root construct
    if (!props.rootConstruct) {
      Node._markRoot(this.constructor);
    }

    this.entrypointDir = props.entrypointDir;
    this._newInstanceOverrides = props.newInstanceOverrides ?? [];
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    this._platformManager = props._platformManager;
  }

  /**
   * The ".wing" directory, which is where the compiler emits its output. We are taking an implicit
   * assumption here that it is always set to be `$outdir/.wing` which is currently hard coded into
   * the `cli/compile.ts` file.
   */
  public get workdir() {
    return `${this.outdir}/.wing`;
  }

  /**
   * Synthesize the app into an artifact.
   */
  public abstract synth(): string;

  /**
   * Creates a new object of the given abstract class FQN.
   */
  public newAbstract(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    // uses the Back Reference for the platform manager to determine which what type to create
    const instance = this._platformManager?._tryNewInstance(
      fqn,
      scope,
      id,
      ...args
    );
    if (!instance) {
      const typeName = fqn.replace(`${SDK_PACKAGE_NAME}.`, "");
      throw new NotImplementedError(
        `Resource "${fqn}" is not yet implemented for "${this._target}" target. Please refer to the roadmap https://github.com/orgs/winglang/projects/3/views/1?filterQuery=${typeName}`
      );
    }

    return instance;
  }

  public makeId(scope: IConstruct, prefix: string = "") {
    const key = `${scope.node.addr}|${prefix}`;

    this._idCounters[key] = this._idCounters[key] ?? 0;

    return `${prefix}${this._idCounters[key]++}`;
  }
}

export function preSynthesizeAllConstructs(app: App): void {
  for (const c of app.node.findAll()) {
    if (typeof (c as IResource)._preSynthesize === "function") {
      (c as IResource)._preSynthesize();
    }
  }
}
