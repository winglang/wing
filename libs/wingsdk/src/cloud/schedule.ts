import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { AbstractMemberError } from "../core/errors";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Duration, IInflight, Node, Resource } from "../std";

/**
 * Global identifier for `Schedule`.
 */
export const SCHEDULE_FQN = fqnForType("cloud.Schedule");

/**
 * Options for `Schedule`.
 */
export interface ScheduleProps {
  /**
   * Trigger events at a periodic rate.
   * @example 1m
   * @default undefined
   */
  readonly rate?: Duration;

  /**
   * Trigger events according to a cron schedule using the UNIX cron format. Timezone is UTC.
   * [minute] [hour] [day of month] [month] [day of week]
   * @example "0/1 * ? * *"
   * @default undefined
   */
  readonly cron?: string;
}

/**
 * A schedule.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 * @abstract
 */
export class Schedule extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IScheduleClient;

  constructor(scope: Construct, id: string, props: ScheduleProps = {}) {
    if (new.target === Schedule) {
      return Resource._newFromFactory(SCHEDULE_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Schedule";
    Node.of(this).description =
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
        "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]",
      );
    }
    if (cron && cron.split(" ")[2] == "*" && cron.split(" ")[4] == "*") {
      throw new Error(
        "cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other",
      );
    }
  }

  /**
   * Create a function that runs when receiving the scheduled event.
   * @abstract
   */
  public onTick(
    inflight: IScheduleOnTickHandler,
    props?: ScheduleOnTickOptions,
  ): Function {
    inflight;
    props;
    throw new AbstractMemberError();
  }
}

/**
 * Options for Schedule.onTick.
 */
export interface ScheduleOnTickOptions extends FunctionProps {}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `Schedule.on_tick`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleOnTickHandlerClient`
 */
export interface IScheduleOnTickHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IScheduleOnTickHandlerClient["handle"];
}

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
