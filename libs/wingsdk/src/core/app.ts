import { Construct, IConstruct } from "constructs";
import { ParameterRegistrar } from "../platform";
import { APP_SYMBOL, IApp, Node } from "../std/node";
import { type IResource } from "../std/resource";
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
   * Factory for instantiating new classes defined by the platform.
   */
  readonly polyconFactory: PolyconFactory;

  /**
   * ParameterRegistrar of composed platforms
   * @default - undefined
   */
  readonly platformParameterRegistrar?: ParameterRegistrar;
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
   * The test runner for this app. Only created if `isTestEnvironment` is true.
   * @internal
   */
  public _testRunner: TestRunner | undefined;

  /**
   * SynthHooks hooks of dependent platforms
   * @internal
   */
  protected _synthHooks?: SynthHooks;

  /**
   * Parameter registrar of composed platforms
   * @internal
   */
  protected _parameters?: ParameterRegistrar;

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
    this._synthHooks = props.synthHooks;
    this.isTestEnvironment = props.isTestEnvironment ?? false;

    props.polyconFactory.register(this);
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
   * The parameter registrar for the app, can be used to find and register
   * parameter values that were provided to the wing application.
   */
  public get parameters() {
    if (!this._parameters) {
      this._parameters = new ParameterRegistrar(this, "ParameterRegistrar");
    }
    return this._parameters!;
  }

  /**
   * Synthesize the app into an artifact.
   */
  public abstract synth(): string;

  public makeId(scope: IConstruct, prefix: string = "") {
    const key = `${scope.node.addr}|${prefix}`;

    this._idCounters[key] = this._idCounters[key] ?? 0;

    return `${prefix}${this._idCounters[key]++}`;
  }
}

const POLYCON_FACTORY_SYMBOL = Symbol("@winglang/sdk.core.PolyconFactory");

export class PolyconFactory {
  public static of(scope: IConstruct): PolyconFactory {
    const app = Node.of(scope).app;
    const factory = (app as any)[POLYCON_FACTORY_SYMBOL];
    if (!factory) {
      throw new Error("PolyconFactory not found");
    }
    return factory;
  }

  private readonly newInstanceOverrides: any[];
  public constructor(newInstanceOverrides: any[]) {
    this.newInstanceOverrides = newInstanceOverrides;
  }

  public new(
    fqn: string,
    ctor: any,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    const instance = this.tryNewInstance(fqn, scope, id, ...args);
    if (instance) {
      return instance;
    }

    if (ctor) {
      return new ctor(scope, id, ...args);
    }

    throw new Error(`Unsupported resource type: ${fqn}`);
  }

  /**
   * Provides a new instance of an object
   *
   * @param fqn string fqn of the resource type
   * @param scope construct scope
   * @param id unique string id for resource
   * @param args args to pass to the resource
   */
  public tryNewInstance(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    for (const override of this.newInstanceOverrides) {
      const instance = override(fqn, scope, id, ...args);
      if (instance) {
        return instance;
      }
    }

    return undefined;
  }

  public register(app: App) {
    (app as any)[POLYCON_FACTORY_SYMBOL] = this;
  }
}

export function preSynthesizeAllConstructs(app: App): void {
  for (const c of app.node.findAll()) {
    if (typeof (c as IResource)._preSynthesize === "function") {
      (c as IResource)._preSynthesize();
    }
  }
}
