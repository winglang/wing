import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Metric } from "./metric";
import { fqnForType } from "../constants";
import { App, Lifting, lift } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { CaseConventions, ResourceNames } from "../shared/resource-names";
import { Duration, IInflight, IInflightHost, Node, Resource } from "../std";
import * as ui from "../ui";

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

  /**
   * The maximum concurrent invocations that can run at one time.
   * @default - platform specific limits (100 on the simulator)
   */
  readonly concurrency?: number;
}

/**
 * A function.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 * @abstract
 */
export class Function extends Resource implements IInflightHost {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IFunctionClient;
  private readonly _env: Record<string, string> = {};
  /**
   * Reference to the function handler - an inflight closure.
   */
  protected readonly handler!: IFunctionHandler;

  /**
   * The path where the entrypoint of the function source code will be eventually written to.
   */
  protected readonly entrypoint!: string;

  /**
   * The function's metrics.
   */
  public readonly metrics!: FunctionMetrics;

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
    const assetName = ResourceNames.generateName(this, {
      // Avoid characters that may cause path issues
      disallowedRegex: /[><:"/\\|?*\s]/g,
      case: CaseConventions.LOWERCASE,
      sep: "_",
    });

    const workdir = App.of(this).workdir;
    mkdirSync(workdir, { recursive: true });
    const entrypoint = join(workdir, `${assetName}.cjs`);
    this.entrypoint = entrypoint;

    if (process.env.WING_TARGET) {
      this.addEnvironment("WING_TARGET", process.env.WING_TARGET);
    }

    if (props.concurrency !== undefined && props.concurrency <= 0) {
      throw new Error(
        "concurrency option on cloud.Function must be a positive integer"
      );
    }

    this.metrics = {
      duration: new Metric(this, "MetricDuration", {
        name: "Duration",
        unit: "milliseconds",
        description: "The amount of time spent processing events.",
      }),
      errors: new Metric(this, "MetricErrors", {
        name: "Errors",
        unit: "count",
        description: "The number of times the function has errored.",
      }),
    };

    // Prevent an infinite loop since the user interface may
    // create new Function instances, which would then create new user interfaces...
    if (!(this.node.scope instanceof ui.VisualComponent)) {
      this.addUserInterface();
    }
  }

  private addUserInterface() {
    const durationHandler = lift({
      metric: this.metrics.duration,
    }).inflight(async (ctx) => {
      try {
        const startTime = new Date(Date.now() - 1000 * 60 * 5); // 5 minutes ago
        const records = await ctx.metric.query({ startTime });
        return records;
      } catch (e: any) {
        return e.message;
      }
    });
    new ui.Graph(this, "DurationGraph", "Duration", durationHandler);
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    // write the entrypoint next to the partial inflight code emitted by the compiler,
    // so that `require` resolves naturally.
    const lines = this._getCodeLines(this.handler);
    writeFileSync(this.entrypoint, lines.join("\n"));

    // indicates that we are calling the inflight constructor and the
    // inflight "handle" method on the handler resource.
    Lifting.lift(this.handler, this, ["handle"]);
    Lifting.lift(this.metrics.duration, this, ["publish"]);
    Lifting.lift(this.metrics.errors, this, ["publish"]);
  }

  /**
   * @internal
   * @param handler IFunctionHandler
   * @returns the function code lines as strings
   */
  protected _getCodeLines(handler: IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();
    const client = "$handler";

    lines.push('"use strict";');
    lines.push(`var ${client} = undefined;`);
    lines.push("exports.handler = async function(event) {");
    lines.push(`  ${client} = ${client} ?? (${inflightClient});`);
    lines.push(`  return await ${client}.handle(event);`);
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
 * Metrics for a cloud.Function.
 */
export interface FunctionMetrics {
  /**
   * How long the function takes to process events.
   */
  readonly duration: Metric;

  /**
   * The number of times the function has errored.
   */
  readonly errors: Metric;
}

/**
 * Inflight interface for `Function`.
 */
export interface IFunctionClient {
  /**
   * Invokes the function with a payload and waits for the result.
   * @param payload payload to pass to the function. If not defined, an empty string will be passed.
   * @returns An optional response from the function
   * @inflight
   */
  invoke(payload?: string): Promise<string | undefined>;

  /**
   * Kicks off the execution of the function with a payload and returns immediately while the function is running.
   * @param payload payload to pass to the function. If not defined, an empty string will be passed.
   * @inflight
   */
  invokeAsync(payload?: string): Promise<void>;
}

/**
 * A resource with an inflight "handle" method that can be used to
 * create a `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionHandlerClient`
 */
export interface IFunctionHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IFunctionHandlerClient["handle"];
}

/**
 * Inflight client for `IFunctionHandler`.
 */
export interface IFunctionHandlerClient {
  /**
   * Entrypoint function that will be called when the cloud function is invoked.
   * @inflight
   */
  handle(event?: string): Promise<string | undefined>;
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
