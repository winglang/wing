import { Construct, IConstruct } from "constructs";
import { Bindings } from "./bindings";
import { Tokens } from "./tokens";
import { IInflightHost } from "../std";
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
   * Absolute paths to plugin javascript files.
   * @default - [] no plugins
   */
  readonly plugins?: string[];

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
    if (!instance) {
      throw new Error(
        `Unable to create an instance of abstract type \"${fqn}\" for this target`
      );
    }

    return instance;
  }

  /**
   * Can be overridden by derived classes to inject dependencies.
   *
   * @param fqn The fully qualified name of the class to instantiate (jsii).
   * @param scope The construct scope.
   * @param id The construct id.
   * @param args The arguments to pass to the constructor.
   */
  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    fqn;
    scope;
    id;
    args;
    return undefined;
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
    if (isPresynthesizable(c)) {
      c._preSynthesize();
    }
  }
}

function isPresynthesizable(t: any): t is IPresynthesize {
  return typeof t._preSynthesize === "function";
}

interface IPresynthesize extends IConstruct {
  _preSynthesize(): void;
}

export function bindAllConstructsToInflightHosts(app: App): void {
  for (const c of app.node.findAll()) {
    const bindings = Bindings.of(c);
    for (const host of bindings.list()) {
      const ops = bindings.get(host);
      if (!isBindable(c)) {
        throw new Error(
          `Resource ${c.node.path} does not support binding (requested by ${host.node.path})`
        );
      }
      c.bind(host, ops);
    }
  }
}

function isBindable(t: any): t is IBind {
  return typeof t.bind === "function";
}

interface IBind extends IConstruct {
  bind(host: IInflightHost, ops: string[]): void;
}
