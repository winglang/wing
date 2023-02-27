import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { IResource, Inflight, Resource, App } from "../core";
import { Duration } from "../std";

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
   */
  public static newSchedule(
    scope: Construct,
    id: string,
    props: ScheduleProps = {}
  ): Schedule {
    return App.of(scope).new(SCHEDULE_FQN, undefined, scope, id, props);
  }

  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: ScheduleProps = {}) {
    super(scope, id);

    this.display.title = "Schedule";
    this.display.description =
      "A cloud schedule to trigger events at regular intervals";

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
export interface ScheduleOnTickProps extends FunctionProps {}

/**
 * Represents a resource with an inflight "handle" method that can be passed to
 * `Schedule.on_tick`.
 *
 * @inflight `wingsdk.cloud.IScheduleOnTickHandlerClient`
 */
export interface IScheduleOnTickHandler extends IResource {}

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
