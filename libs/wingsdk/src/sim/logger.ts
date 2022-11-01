import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, NodeJsCode } from "../core";
import { Function } from "./function";
import { IResourceSim } from "./handle-manager";
import { IResource } from "./resource";
import { BaseResourceSchema } from "./schema";

/**
 * Simulator implementation of `cloud.Logger`.
 *
 * @inflight `@monadahq/wingsdk.sim.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase implements IResource {
  private readonly callers = new Array<string>();
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _toResourceSchema(): BaseResourceSchema {
    return {
      type: cloud.LOGGER_TYPE,
      props: {},
      attrs: {} as any,
    };
  }

  /** @internal */
  public get _handle(): string {
    return `\${${this.node.path}#attrs.handle}`;
  }

  /** @internal */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("loggers can only be captured by a sim.Function for now");
    }

    this.callers.push(captureScope.node.path);

    const env = `LOGGER_HANDLE__${this.node.addr}`;
    captureScope.addEnvironment(env, this._handle);

    captureScope.node.addDependency(this);

    return NodeJsCode.fromInline(
      `HandleManager.findInstance(process.env["${env}"])`
    );
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Logger`.
 */
export interface ILoggerClient extends cloud.ILoggerClient, IResourceSim {}
