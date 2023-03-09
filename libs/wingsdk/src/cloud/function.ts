import { spawnSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { Logger } from "./logger";
import { fqnForType } from "../constants";
import { IInflightHost, IResource, Inflight, Resource, App } from "../core";
import { Duration } from "../std";
import { mkdtemp, normalPath } from "../util";

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
    inflight: Inflight,
    props: FunctionProps = {}
  ): Function {
    return App.of(scope).newAbstract(FUNCTION_FQN, scope, id, inflight, props);
  }

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
    props: FunctionProps = {}
  ) {
    super(scope, id);

    this.display.title = "Function";
    this.display.description = "A cloud function (FaaS)";

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    const logger = Logger.of(this);

    // indicates that we are calling "handle" on the handler resource
    // and that we are calling "print" on the logger.
    inflight._registerBind(this, ["handle"]);
    logger._registerBind(this, ["print"]);

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
    const infile = join(tempdir, "prebundle.js");
    const outfile = join(tempdir, "index.js");
    writeFileSync(infile, lines.join("\n"));

    // We would invoke esbuild directly here, but there is a bug where esbuild
    // mangles the stdout/stderr of the process that invokes it.
    // https://github.com/evanw/esbuild/issues/2927
    // To workaround the issue, spawn a new process and invoke esbuild inside it.

    let esbuildScript = [
      `const esbuild = require("${normalPath(
        require.resolve("esbuild-wasm")
      )}");`,
      `esbuild.buildSync({ bundle: true, entryPoints: ["${normalPath(
        infile
      )}"], outfile: "${normalPath(
        outfile
      )}", minify: false, platform: "node", target: "node16", external: ["aws-sdk"] });`,
    ].join("\n");
    let result = spawnSync(process.argv[0], ["-e", esbuildScript]);
    if (result.status !== 0) {
      throw new Error(
        `Failed to bundle function: ${result.stderr.toString("utf-8")}`
      );
    }

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
