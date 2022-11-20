import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
import { IResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { captureSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Logger`.
 *
 * @inflight `@winglang/wingsdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase implements IResource {
  private readonly inbound = new Array<string>();
  private readonly outbound = new Array<string>();
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _toResourceSchema(): BaseResourceSchema {
    return {
      type: cloud.LOGGER_TYPE,
      props: {},
      attrs: {} as any,
      inbound: this.inbound,
      outbound: this.outbound,
    };
  }

  /** @internal */
  public _addInbound(...resources: string[]) {
    this.inbound.push(...resources);
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return captureSimulatorResource("logger", this, captureScope);
  }
}
