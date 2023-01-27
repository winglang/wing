import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import { Polycons } from "polycons";
import { Logger } from "./logger";
import { Code, IInflightHost, IResource, Inflight, Resource } from "../core";
import { mkdtemp } from "../util";

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
export abstract class FunctionBase extends Resource implements IInflightHost {
  private readonly _env: Record<string, string> = {};

  public readonly stateful = false;

  /**
   * The path to the file asset that contains the handler code.
   */
  protected readonly assetPath: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: Inflight,
    props: FunctionProps
  ) {
    super(scope, id);

    this.display.title = "Function";
    this.display.description = "A cloud function (FaaS)";

    if (!scope) {
      this.assetPath = undefined as any;
      return;
    }

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    const logger = Logger.of(this);

    // indicates that we are calling "handle" on the handler resource
    // and that we are calling "print" on the logger.
    inflight._bind(this, ["handle"]);
    logger._bind(this, ["print"]);

    const inflightClient = inflight._toInflight();
    const loggerClientCode = logger._toInflight();
    const lines = new Array<string>();

    // create a logger inflight client and attach it to `console.log`.
    // TODO: attach console.error, console.warn, once our logger supports log levels.
    lines.push(`const $logger = ${loggerClientCode.text};`);
    lines.push(`console.log = (...args) => $logger.print(...args);`);

    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${inflightClient.text}.handle(event);`);
    lines.push("};");

    // add an annotation that the Wing logger is implicitly used
    Resource.addConnection({
      from: this,
      to: logger,
      relationship: "print",
      implicit: true,
    });

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

    // the bundled contains line comments with file paths, which are not useful for us, especially
    // since they may contain system-specific paths. sadly, esbuild doesn't have a way to disable
    // this, so we simply filter those out from the bundle.
    const outlines = readFileSync(outfile, "utf-8").split("\n");
    const isNotLineComment = (line: string) => !line.startsWith("//");
    writeFileSync(outfile, outlines.filter(isNotLineComment).join("\n"));

    this.assetPath = outfile;
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
 * Represents a function.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
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
 * @internal
 */
export enum FunctionInflightMethods {
  /** `Function.invoke` */
  INVOKE = "invoke",
}
