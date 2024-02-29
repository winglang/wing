import { Construct, IConstruct } from "constructs";
import { NotImplementedError } from "./errors";
import { SDK_PACKAGE_NAME } from "../constants";
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
   * Hooks for overriding newInstance calls
   * @default - []
   */
  readonly newInstanceOverrides?: any[];

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
   * NewInstance hooks for defining resource implementations.
   * @internal
   */
  public readonly _newInstanceOverrides: any[];

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
  protected _platformParameters?: ParameterRegistrar;

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
    this._synthHooks = props.synthHooks;
    this.isTestEnvironment = props.isTestEnvironment ?? false;
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
  public get platformParameters() {
    if (!this._platformParameters) {
      this._platformParameters = new ParameterRegistrar(
        this,
        "ParameterRegistrar",
      );
    }
    return this._platformParameters!;
  }

  /**
   * Synthesize the app into an artifact.
   */
  public abstract synth(): string;

  /**
   * Creates a new object of the given FQN.
   * @param fqn the fqn of the class to instantiate
   * @param ctor the constructor of the class to instantiate (undefined for abstract classes)
   * @param scope the scope of the resource
   * @param id the id of the resource
   * @param args the arguments to pass to the resource
   * @returns the new instance
   * @throws if the FQN is not supported
   */
  public new(
    fqn: string,
    ctor: any,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    // delegate to "tryNew" first, which will allow derived classes to inject
    const instance = this.tryNew(fqn, scope, id, ...args);
    if (instance) {
      return instance;
    }

    // no injection, so we'll just create a new instance
    return new ctor(scope, id, ...args);
  }

  /**
   * Creates a new object of the given abstract class FQN.
   */
  public newAbstract(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    // next delegate to "tryNew", which will allow derived classes to inject
    const instance = this.tryNew(fqn, scope, id, ...args);
    if (!instance) {
      const typeName = fqn.replace(`${SDK_PACKAGE_NAME}.`, "");
      const typeNameParts = typeName.split(".");
      throw new NotImplementedError(
        `Resource "${fqn}" is not yet implemented for "${this._target}" target. Please refer to the roadmap https://github.com/orgs/winglang/projects/3/views/1?filterQuery=${typeName}`,
        { resource: typeNameParts[typeNameParts.length - 1] },
      );
    }

    return instance;
  }

  public makeId(scope: IConstruct, prefix: string = "") {
    const key = `${scope.node.addr}|${prefix}`;

    this._idCounters[key] = this._idCounters[key] ?? 0;

    return `${prefix}${this._idCounters[key]++}`;
  }

  /**
   * Can be overridden by derived classes to inject dependencies.
   *
   * @param fqn The fully qualified name of the class we want the type for (jsii).
   *
   * @returns The dependency injected specific target type for the given FQN, or undefined if not found.
   */
  protected typeForFqn(fqn: string): any {
    fqn;
    return undefined;
  }

  /**
   * Can be overridden by derived classes to inject dependencies.
   *
   * @param fqn The fully qualified name of the class to instantiate (jsii).
   * @param scope The construct scope.
   * @param id The construct id.
   * @param args The arguments to pass to the constructor.
   */
  private tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    // first check if overrides have been provided
    for (const override of this._newInstanceOverrides) {
      const instance = override(fqn, scope, id, ...args);
      if (instance) {
        return instance;
      }
    }

    const type = this.typeForFqn(fqn);
    if (!type) {
      return undefined;
    }

    return new type(scope, id, ...args);
  }
}

export function preSynthesizeAllConstructs(app: App): void {
  for (const c of app.node.findAll()) {
    if (typeof (c as IResource)._preSynthesize === "function") {
      (c as IResource)._preSynthesize();
    }
  }
}
