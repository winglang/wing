import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";
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

  private get ref(): string {
    return `\${${this.node.path}#attrs.logsDir}`;
  }

  /** @internal */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("loggers can only be captured by a sim.Function for now");
    }

    this.callers.push(captureScope.node.path);

    const env = `LOGGER_ADDR__${this.node.addr}`;
    captureScope.addEnvironment(env, this.ref);

    captureScope.node.addDependency(this);

    // The inflight client is passed the compute resource ID as a second
    // argument so that all of the logs from the same resource are grouped
    // together. Perhaps this should be some kind of $context passed to every
    // inflight function automatically?
    return InflightClient.for(__filename, "LoggerClient", [
      `process.env["${env}"]`,
      `"${captureScope.node.id}"`,
    ]);
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Logger`.
 */
export interface ILoggerClient extends cloud.ILoggerClient, IResourceSim {}
