import { join } from "path";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import { Polycons } from "polycons";
import { Code, Inflight, IResource, Resource } from "../core";
import { mkdtemp } from "../util";
import { Logger } from "./logger";

/**
 * Global identifier for `Function`.
 */
export const FUNCTION_TYPE = "wingsdk.cloud.Function";

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
}

/**
 * Functionality shared between all `Function` implementations.
 */
export abstract class FunctionBase extends Resource {
  private readonly _env: Record<string, string> = {};

  public readonly stateful = false;

  protected readonly handlerFileAsset: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
    props: FunctionProps
  ) {
    super(scope, id);

    if (!scope) {
      this.handlerFileAsset = undefined as any;
      return;
    }

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    // indicates that we are calling "handle" on the handler resource
    inflight._bind(this, ["handle"]);

    const inflightClient = inflight._toInflight();
    const loggerClientCode = Logger.of(this)._toInflight();
    const lines = new Array<string>();
    lines.push(`const __$logger = ${loggerClientCode.text};`);
    lines.push(`console.log = (...args) => __$logger.print(...args);`);
    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${inflightClient.text}.handle(event);`);
    lines.push("};");

    const tempdir = mkdtemp();
    const outfile = join(tempdir, "index.js");

    esbuild.buildSync({
      bundle: true,
      stdin: {
        contents: lines.join("\n"),
        resolveDir: tempdir,
        sourcefile: "inflight.js",
      },
      target: "node16",
      platform: "node",
      absWorkingDir: tempdir,
      outfile,
      minify: false,
      external: ["aws-sdk"],
    });

    this.handlerFileAsset = outfile;
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
  public get env() {
    return { ...this._env };
  }
}

/**
 * Represents a function.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends FunctionBase {
  constructor(
    scope: Construct,
    id: string,
    inflight: Inflight,
    props: FunctionProps = {}
  ) {
    super(null as any, id, inflight, props);
    return Polycons.newInstance(
      FUNCTION_TYPE,
      scope,
      id,
      inflight,
      props
    ) as Function;
  }

  public addEnvironment(_key: string, _value: string): void {
    throw new Error("Method not implemented.");
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
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
 * @inflight `wingsdk.cloud.IFunctionHandlerClient`
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
 */
export enum FunctionInflightMethods {
  /** `Function.invoke` */
  INVOKE = "invoke",
}
