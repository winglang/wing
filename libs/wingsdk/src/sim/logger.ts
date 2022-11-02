import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
import { IResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { captureSimulatorResource } from "./util";

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
  public _addCallers(...callers: string[]) {
    this.callers.push(...callers);
  }

  /** @internal */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return captureSimulatorResource("logger", this, captureScope);
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Logger`.
 */
export interface ILoggerClient extends cloud.ILoggerClient {}
