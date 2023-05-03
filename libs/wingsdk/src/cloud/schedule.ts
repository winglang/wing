import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Duration, IResource, Resource } from "../std";

/**
 * Global identifier for `Schedule`.
 */
export const SCHEDULE_FQN = fqnForType("cloud.Schedule");

/**
 * Properties for `Schedule`.
 */
export interface ScheduleProps {
  /**
   * Trigger events at a periodic rate.
   * @example 1m
   * @default undefined
   */
  readonly rate?: Duration;

  /**
   * Trigger events according to a cron schedule using the UNIX cron format.
   * [minute] [hour] [day of month] [month] [day of week]
   * @example "0/1 * ? * *"
   * @default undefined
   */
  readonly cron?: string;
}

/**
 * Represents a schedule.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export abstract class Schedule extends Resource {
  /**
   * Create a new schedule.
   * @internal
   */
  public static _newSchedule(
    scope: Construct,
    id: string,
    props: ScheduleProps = {}
  ): Schedule {
    return App.of(scope).newAbstract(SCHEDULE_FQN, scope, id, props);
  }

  constructor(scope: Construct, id: string, props: ScheduleProps = {}) {
    super(scope, id);

    this.display.title = "Schedule";
    this.display.description =
      "A cloud schedule to trigger events at regular intervals";

    const { cron, rate } = props;

    if (rate && cron) {
      throw new Error("rate and cron cannot be configured simultaneously.");
    }
    if (!rate && !cron) {
      throw new Error("rate or cron need to be filled.");
    }
    if (rate && rate.seconds < 60) {
      throw new Error("rate can not be set to less than 1 minute.");
    }
    if (cron && cron.split(" ").length > 5) {
      throw new Error(
        "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]"
      );
    }
  }

  /**
   * Create a function that runs when receiving the scheduled event.
   */
  public abstract onTick(
    inflight: IScheduleOnTickHandler,
    props?: ScheduleOnTickProps
  ): Function;
}

/**
 * Options for Schedule.onTick.
 */
export interface ScheduleOnTickProps extends FunctionProps {}

/**
 * Represents a resource with an inflight "handle" method that can be passed to
 * `Schedule.on_tick`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleOnTickHandlerClient`
 */
export interface IScheduleOnTickHandler extends IResource {}

/**
 * Inflight interface for `Schedule`.
 */
export interface IScheduleClient {}

/**
 * Inflight client for `IScheduleOnTickHandler`.
 */
export interface IScheduleOnTickHandlerClient {
  /**
   * Function that will be called when a message is received from the schedule.
   * @inflight
   */
  handle(): Promise<void>;
}
