import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Function } from "./function";
import { Code, Resource } from "../core";
import { Duration } from "../std";

/**
 * Global identifier for `Timer`.
 */
export const TIMER_TYPE = "wingsdk.cloud.Timer";

/**
 * Properties for `Timer`.
 */
export interface TimerProps {}

/**
 * Functionality shared between all `Timer` implementations.
 */
export abstract class TimerBase extends Resource {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: TimerProps = {}) {
    super(scope, id);

    this.display.title = "Timer";
    this.display.description = "A distributed timer";

    if (!scope) {
      return;
    }

    props;
  }
}

/**
 * Represents a timer.
 *
 * @inflight `@winglang/sdk.cloud.ITimerClient`
 */
export class Timer extends TimerBase {
  constructor(scope: Construct, id: string, props: TimerProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(TIMER_TYPE, scope, id, props) as Timer;
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Timer`.
 */
export interface ITimerClient {
  /**
   * Invokes the specified callback after the specified duration.
   * @param after Duration to wait before invoking the callback.
   * @param callback Callback to invoke.
   * @param payload Optional payload to pass to the callback.
   * @inflight
   */
  setTimeout(
    after: Duration,
    callback: Function,
    payload?: string
  ): Promise<void>;
}

/**
 * List of inflight operations available for `Timer`.
 * @internal
 */
export enum TimerInflightMethods {
  /** `Timer.setTimeout` */
  SET_TIMEOUT = "set_timeout",
}
