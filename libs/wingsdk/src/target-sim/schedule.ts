import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import { Policy } from "./policy";
import { ISimulatorResource } from "./resource";
import { ScheduleSchema } from "./schema-resources";
import {
  bindSimulatorResource,
  convertDurationToCronExpression,
  makeSimulatorJsClientType,
  simulatorLiftedFieldsFor,
} from "./util";
import { Function } from "../cloud";
import * as cloud from "../cloud";
import { lift } from "../core";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

/**
 * Simulator implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("Schedule", cloud.Schedule._methods);
  }

  private readonly cronExpression: string;
  private readonly policy: Policy;

  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props);
    const { rate, cron } = props;

    this.cronExpression = cron ?? convertDurationToCronExpression(rate!);
    this.policy = new Policy(this, "Policy", { principal: this });
  }

  public onTick(
    inflight: cloud.IScheduleOnTickHandler,
    props: cloud.ScheduleOnTickOptions = {}
  ): cloud.Function {
    const functionHandler = ScheduleOnTickHandler.toFunctionHandler(inflight);
    const fn = new Function(
      this,
      App.of(this).makeId(this, "OnTick"),
      functionHandler,
      props
    );
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = "onTick()";

    new EventMapping(this, App.of(this).makeId(this, "OnTickMapping"), {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {},
    });

    Node.of(this).addConnection({
      source: this,
      sourceOp: cloud.ScheduleInflightMethods.TICK,
      target: fn,
      targetOp: cloud.FunctionInflightMethods.INVOKE,
      name: "onTick()",
    });
    this.policy.addStatement(fn, cloud.FunctionInflightMethods.INVOKE);

    return fn;
  }

  public toSimulator(): ToSimulatorOutput {
    const props: ScheduleSchema = {
      cronExpression: this.cronExpression,
    };
    return {
      type: cloud.SCHEDULE_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}

/**
 * Utility class to work with schedule on tick handlers.
 */
export class ScheduleOnTickHandler {
  /**
   * Converts a `cloud.IScheduleOnTickHandler` to a `cloud.IFunctionHandler`.
   * @param handler the handler to convert
   * @returns the function handler
   */
  public static toFunctionHandler(
    handler: cloud.IScheduleOnTickHandler
  ): cloud.IFunctionHandler {
    return lift({ handler }).inflight(async (ctx) => {
      await ctx.handler();
      return undefined;
    });
  }
}
