import { mkdirSync } from "fs";
import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App, Bundler } from "../core";
import { Duration, IInflight, IInflightHost, Node, Resource } from "../std";

/**
 * Global identifier for `Function`.
 */
export const FUNCTION_FQN = fqnForType("cloud.Function");

/**
 * Options for `Function`.
 */
export interface FunctionProps {
  /**
   * Environment variables to pass to the function.
   * @default - No environment variables.
   */
  readonly env?: { [key: string]: string };

  /**
   * The maximum amount of time the function can run.
   * @default 1m
   */
  readonly timeout?: Duration;

  /**
   * The amount of memory to allocate to the function, in MB.
   * @default 1024
   */
  readonly memory?: number;

  /**
   * Specifies the number of days that function logs will be kept.
   * Setting negative value means logs will not expire.
   * @default 30
   */
  readonly logRetentionDays?: number;
}

/**
 * A function.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 * @abstract
 */
export class Function extends Resource implements IInflightHost {
  private readonly _env: Record<string, string> = {};
  private readonly handler!: IFunctionHandler;

  /**
   * The name of the exported JavaScript handler function. This is usually "handler" followed by a number.
   */
  public readonly handlerName!: string;

  constructor(
    scope: Construct,
    id: string,
    handler: IFunctionHandler,
    props: FunctionProps = {}
  ) {
    if (new.target === Function) {
      return Resource._newFromFactory(FUNCTION_FQN, scope, id, handler, props);
    }

    super(scope, id);

    Node.of(this).title = "Function";
    Node.of(this).description = "A cloud function (FaaS)";

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    this.handler = handler;

    const workdir = App.of(this).workdir;
    mkdirSync(workdir, { recursive: true });
    this.handlerName = `handler${handler._id}`;

    // Add a "thunk" that will produce this function's code to the app-wide bundler.
    // This will allow the bundler to produce a single bundle for all functions in the app.
    Bundler.of(this).addCode({ lines: () => this._getCodeLines(handler) });

    if (process.env.WING_TARGET) {
      this.addEnvironment("WING_TARGET", process.env.WING_TARGET);
    }
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    // indicates that we are calling the inflight constructor and the
    // inflight "handle" method on the handler resource.
    this.handler.onLift(this, ["handle", "$inflight_init"]);
  }

  /**
   * @internal
   * @param handler IFunctionHandler
   * @returns the function code lines as strings
   */
  protected _getCodeLines(handler: IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();

    lines.push('"use strict";');
    lines.push(`exports.${this.handlerName} = async function(event) {`);
    lines.push(`  return await (${inflightClient}).handle(event);`);
    lines.push("};");

    return lines;
  }

  /**
   * Add an environment variable to the function.
   */
  public addEnvironment(name: string, value: string) {
    if (this._env[name] !== undefined && this._env[name] !== value) {
      throw new Error(
        `Environment variable "${name}" already set with a different value.`
      );
    }
    this._env[name] = value;
  }

  /**
   * Returns the set of environment variables for this function.
   */
  public get env(): Record<string, string> {
    return { ...this._env };
  }
}

/**
 * Inflight interface for `Function`.
 */
export interface IFunctionClient {
  /**
   * Invokes the function with a payload and waits for the result.
   * @inflight
   */
  invoke(payload: string): Promise<string>;

  /**
   * Kicks off the execution of the function with a payload and returns immediately while the function is running.
   * @inflight
   */
  invokeAsync(payload: string): Promise<void>;
}

/**
 * A resource with an inflight "handle" method that can be used to
 * create a `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionHandlerClient`
 */
export interface IFunctionHandler extends IInflight {}

/**
 * Inflight client for `IFunctionHandler`.
 */
export interface IFunctionHandlerClient {
  /**
   * Entrypoint function that will be called when the cloud function is invoked.
   * @inflight
   */
  handle(event: string): Promise<string | undefined>;
}

/**
 * List of inflight operations available for `Function`.
 * @internal
 */
export enum FunctionInflightMethods {
  /** `Function.invoke` */
  INVOKE = "invoke",
  /** `Function.invokeAsync` */
  INVOKE_ASYNC = "invokeAsync",
}
