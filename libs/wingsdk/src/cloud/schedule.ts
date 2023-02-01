import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Function, FunctionProps } from "./function";
import { Code, IResource, Inflight, Resource } from "../core";
import { Duration } from "../std";

/**
 * Global identifier for `Schedule`.
 */
export const SCHEDULE_TYPE = "wingsdk.cloud.Schedule";

/**
 * Properties for `Schedule`.
 */
export interface ScheduleProps {
  readonly rate?: Duration;
  readonly cron?: string;
}

/**
 * Functionality shared between all `Schedule` implementations.
 */
export abstract class ScheduleBase extends Resource {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: ScheduleProps = {}) {
    super(scope, id);

    this.display.title = "Schedule";
    this.display.description = "A cloud schedule";

    if (!scope) {
      return;
    }

    props;
  }

  /**
   * Create a function that runs when receiving the scheduled event.
   */
  public abstract onTick(
    inflight: Inflight,
    props?: ScheduleOnTickProps
  ): Function;
}

/**
 * Options for Schedule.onTick.
 */
export interface ScheduleOnTickProps extends FunctionProps { }

/**
 * Represents a schedule.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends ScheduleBase {
  constructor(scope: Construct, id: string, props: ScheduleProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(SCHEDULE_TYPE, scope, id, props) as Schedule;
  }

  public onTick(
    inflight: Inflight,
    props: ScheduleOnTickProps = {}
  ): Function {
    inflight;
    props;
    throw new Error("Method not implemented.");
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Represents a resource with an inflight "handle" method that can be passed to
 * `Schedule.on_tick`.
 *
 * @inflight `wingsdk.cloud.IScheduleOnTickHandlerClient`
 */
export interface IScheduleOnTickHandler extends IResource { }

/**
 * Inflight client for `IScheduleOnTickHandler`.
 */
export interface IScheduleOnTickHandlerClient {
  /**
   * Function that will be called when a message is received from the schedule.
   * @inflight
   */
  handle(message: string): Promise<void>;
}