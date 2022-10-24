import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";

/**
 * Simulator implementation of `cloud.Logger`.
 *
 * @inflight `@monadahq/wingsdk.sim.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return InflightClient.for(__filename, "LoggerClient", []);
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Logger`.
 */
export interface ILoggerClient extends cloud.ILoggerClient {}
