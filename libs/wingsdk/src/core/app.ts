import { Construct } from "constructs";
import { NotImplementedError } from "./errors";
import { Tokens } from "./tokens";
import { SDK_PACKAGE_NAME } from "../constants";
import { IResource } from "../std/resource";
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
   * The path to a state file which will track all synthesized files. If a
   * statefile is not specified, we won't be able to remove extrenous files.
   * @default - no state file
   */
  readonly stateFile?: string;

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
export abstract class App extends Construct {
  /**
   * Returns the root app.
   */
  public static of(scope: Construct): App {
    if (scope instanceof App) {
      return scope;
    }

    if (!scope.node.scope) {
      throw new Error("Cannot find root app");
    }

    return App.of(scope.node.scope);
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
   * The output directory.
   */
  public abstract readonly outdir: string;

  /**
   * Whether or not this app is being synthesized into a test environment.
   */
  public abstract readonly isTestEnvironment: boolean;

  /**
   * Tokens handling for this app.
   * @internal
   */
  public abstract readonly _tokens: Tokens;

  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id);
    if (!props.entrypointDir) {
      throw new Error("Missing environment variable: WING_SOURCE_DIR");
    }

    this.entrypointDir = props.entrypointDir;
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
    // delegate to "tryNew" first, which will allow derived classes to inject
    const instance = this.tryNew(fqn, scope, id, ...args);
    const typeName = fqn.replace(`${SDK_PACKAGE_NAME}.`, "");
    if (!instance) {
      throw new NotImplementedError(
        `Resource "${fqn}" is not yet implemented for "${this._target}" target. Please refer to the roadmap https://github.com/orgs/winglang/projects/3/views/1?filterQuery=${typeName}`
      );
    }

    return instance;
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
    const type = this.typeForFqn(fqn);
    if (!type) {
      return undefined;
    }
    return new type(scope, id, ...args);
  }

  /**
   * Synthesize the root construct if one was given. If this is a test environment, then
   * we will synthesize one root construct per test. Otherwise, we will synthesize exactly
   * one root construct.
   *
   * @param props The App props
   * @param testRunner The test runner
   */
  protected synthRoots(props: AppProps, testRunner: TestRunner) {
    if (props.rootConstruct) {
      const Root = props.rootConstruct;
      if (this.isTestEnvironment) {
        new Root(this, "env0");
        const tests = testRunner.findTests();
        for (let i = 1; i < tests.length; i++) {
          new Root(this, "env" + i);
        }
      } else {
        new Root(this, "Default");
      }
    }
  }
}

export function preSynthesizeAllConstructs(app: App): void {
  for (const c of app.node.findAll()) {
    if (typeof (c as IResource)._preSynthesize === "function") {
      (c as IResource)._preSynthesize();
    }
  }
}
