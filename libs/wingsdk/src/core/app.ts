import { Construct, IConstruct } from "constructs";
import { ParameterRegistrar } from "../platform/parameter-registrar";
import {
  APP_SYMBOL,
  IApp,
  IPlatformManager,
} from "../platform/platform-manager";
import { Node } from "../std/node";
import { TestRunner } from "../std/test-runner";

/**
 * Props for all `App` classes.
 */
export interface AppProps {
  /**
   * The output directory.
   */
  readonly outdir: string;

  readonly rootConstruct: any;

  readonly entrypointDir: string;

  /**
   * Whether or not this app is being synthesized into a test environment.
   * @default false
   */
  readonly isTestEnvironment?: boolean;

  /**
   * The identifier for the root node of the app. Changing this will re-create all resources since
   * their logical IDs are based on this.
   */
  readonly rootId: string;

  /**
   * The platform manager that created this app.
   */
  readonly platform: IPlatformManager;
}

/**
 * Hooks for the synthesis process.
 */
export interface SynthHooks {
  /**
   * Hooks to be called before synthesizing the app.
   */
  readonly preSynthesize: any[];

  /**
   * Hooks to be called after synthesizing the app.
   */
  readonly postSynthesize: any[];

  /**
   * Hooks to be called for validating the synthesized configuration.
   */
  readonly validate: any[];
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
   * The parameter registrar for the app, can be used to find and register
   * parameter values that were provided to the wing application.
   */
  public readonly parameters: ParameterRegistrar;

  public readonly platform: IPlatformManager;

  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id);

    this.platform = props.platform;

    if (!props.entrypointDir) {
      throw new Error("Missing environment variable: WING_SOURCE_DIR");
    }

    // the app is also marked as root in the case where there is no root construct
    if (!props.rootConstruct) {
      Node._markRoot(this.constructor);
    }

    this.entrypointDir = props.entrypointDir;
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    this.parameters = props.platform.parameters;
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

  public makeId(scope: IConstruct, prefix: string = "") {
    const key = `${scope.node.addr}|${prefix}`;
    this._idCounters[key] = this._idCounters[key] ?? 0;
    return `${prefix}${this._idCounters[key]++}`;
  }
}
