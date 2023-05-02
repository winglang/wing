import { Construct } from "constructs";
import { IResource } from "../std";

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
   * Whether or not this app is being synthesized into a test environment.
   * @default false
   */
  readonly isTestEnvironment?: boolean;
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
    } catch {
      throw new Error(`Unknown compilation target: "${target}"`);
    }
  }

  /**
   * The output directory.
   */
  public abstract readonly outdir: string;

  /**
   * Whether or not this app is being synthesized into a test environment.
   */
  public abstract readonly isTestEnvironment: boolean;

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
}

export function preSynthesizeAllConstructs(app: App): void {
  for (const c of app.node.findAll()) {
    if (typeof (c as IResource)._preSynthesize === "function") {
      (c as IResource)._preSynthesize();
    }
  }
}
