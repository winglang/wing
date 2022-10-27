import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";

/**
 * AWS implementation of `cloud.Logger`.
 *
 * @inflight `@monadahq/wingsdk.tfaws.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    // TODO: fixme
    return InflightClient.for(__filename, "LoggerClient", []);
  }
}

/**
 * AWS implementation of inflight client for `cloud.Logger`.
 */
export interface ILoggerClient extends cloud.ILoggerClient {}
