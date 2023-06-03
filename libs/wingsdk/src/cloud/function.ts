import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core/app";
import { CaseConventions, ResourceNames } from "../shared/resource-names";
import { Duration } from "../std/duration";
import { IInflightHost, IResource, Resource } from "../std/resource";

/**
 * Global identifier for `Function`.
 */
export const FUNCTION_FQN = fqnForType("cloud.Function");

/**
 * Properties for `Function`.
 *
 * This is the type users see when constructing a cloud.Function instance.
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
   * @default 128
   */
  readonly memory?: number;

  /**
   * The time limit of the function "remembers" the results corresponding to a specific set of inputs.
   * @default undefined
   */
  readonly memoization?: Duration;
}

/**
 * Represents a function.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export abstract class Function extends Resource implements IInflightHost {
  /**
   * Creates a new cloud.Function instance through the app.
   * @internal
   */
  public static _newFunction(
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
    props: FunctionProps = {}
  ): Function {
    return App.of(scope).newAbstract(FUNCTION_FQN, scope, id, inflight, props);
  }

  private readonly _env: Record<string, string> = {};

  /**
   * The path to the entrypoint source code of the function.
   */
  protected readonly entrypoint: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
    props: FunctionProps = {}
  ) {
    super(scope, id);

    this.display.title = "Function";
    this.display.description = "A cloud function (FaaS)";

    this._addInflightOps(FunctionInflightMethods.INVOKE);

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    // indicates that we are calling the inflight constructor and the
    // inflight "handle" method on the handler resource.
    inflight._registerBind(this, ["handle", "$inflight_init"]);

    const inflightClient = inflight._toInflight();
    const lines = new Array<string>();

    if (props.memoization) {
      lines.push("exports.handler = async function(event) {");
      lines.push("  let item = await getIdempotencyItem(event);");
      lines.push("  if (item) {");
      lines.push("    return item.output;");
      lines.push("  }");
      lines.push("  await putIdempotencyItem(event);");
      lines.push(`  let result = undefined;`);
      lines.push("  try {");
      lines.push(`    result = await (${inflightClient.text}).handle(event);`);
      lines.push("    await updateIdempotencyItem(event, result);");
      lines.push("    return result;");
      lines.push("  } catch (e) {");
      lines.push("    await deleteIdempotencyItem(event);");
      lines.push("    throw e;");
      lines.push("  }");
      lines.push("  return result;");
      lines.push("};");
    } else {
      lines.push("exports.handler = async function(event) {");
      lines.push(`  return await (${inflightClient.text}).handle(event);`);
      lines.push("};");
    }

    const assetName = ResourceNames.generateName(this, {
      // Avoid characters that may cause path issues
      disallowedRegex: /[><:"/\\|?*\s]/g,
      case: CaseConventions.LOWERCASE,
      sep: "_",
    });

    // write the entrypoint next to the partial inflight code emitted by the compiler, so that
    // `require` resolves naturally.

    const workdir = App.of(this).workdir;
    mkdirSync(workdir, { recursive: true });
    const entrypoint = join(workdir, `${assetName}.js`);
    writeFileSync(entrypoint, lines.join("\n"));
    this.entrypoint = entrypoint;
  }

  /**
   * Add an environment variable to the function.
   */
  public addEnvironment(name: string, value: string) {
    if (this._env[name] !== undefined) {
      throw new Error(`Environment variable "${name}" already set.`);
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
   * Invoke the function asynchronously with a given payload.
   * @inflight
   */
  invoke(payload: string): Promise<string>;
}

/**
 * Represents a resource with an inflight "handle" method that can be used to
 * create a `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionHandlerClient`
 */
export interface IFunctionHandler extends IResource {}

/**
 * Inflight client for `IFunctionHandler`.
 */
export interface IFunctionHandlerClient {
  /**
   * Entrypoint function that will be called when the cloud function is invoked.
   * @inflight
   */
  handle(event: string): Promise<void>;
}

/**
 * List of inflight operations available for `Function`.
 * @internal
 */
export enum FunctionInflightMethods {
  /** `Function.invoke` */
  INVOKE = "invoke",
}
