import { CloudwatchEventRule } from "@cdktf/provider-aws/lib/cloudwatch-event-rule";
import { CloudwatchEventTarget } from "@cdktf/provider-aws/lib/cloudwatch-event-target";
import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { Inflight, NodeJsCode } from "../core";
import { NameOptions, ResourceNames } from "../utils/resource-names";

/**
 * DynamoDB table names must be between 3 and 255 characters. You can use alphanumeric characters,
 * dot (.), dash (-), and underscores (_).
 */
const DYNAMODB_NAME_OPTS: NameOptions = {
  maxLen: 255,
  disallowedRegex: /[^a-zA-Z0-9\_\.\-]+/g,
  prefix: "wing-timers-",
};

export const TIMERS_TABLE_ATTRIBUTES = {
  timerId: "timer_id",
  expiresAt: "expires_at",
  payload: "payload",
  callbackArn: "callback_arn",
};

/**
 * AWS implementation of `cloud.Timer`.
 *
 * @inflight `@winglang/sdk.cloud.ITimerClient`
 */
export class Timer extends cloud.TimerBase {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: cloud.TimerProps) {
    super(scope, id, props);

    const rule = new CloudwatchEventRule(this, "Schedule", {
      isEnabled: true,
      scheduleExpression: "rate(1 minute)",
    });

    const onTickHandler = new Inflight(this, "OnTickHandler", {
      code: NodeJsCode.fromInline("async handle() { console.log('tick'); }"),
    });

    const fn = new Function(this, "OnTick", onTickHandler);
    fn.addPermissionToInvoke(this, "events.amazonaws.com", rule.arn);

    new CloudwatchEventTarget(this, "ScheduleTarget", {
      arn: fn.qualifiedArn,
      rule: rule.name,
    });

    this.table = new DynamodbTable(this, "Timers", {
      name: ResourceNames.generateName(this, DYNAMODB_NAME_OPTS),
      attribute: [{ name: TIMERS_TABLE_ATTRIBUTES.timerId, type: "S" }],
      hashKey: TIMERS_TABLE_ATTRIBUTES.timerId,
      ttl: {
        attributeName: TIMERS_TABLE_ATTRIBUTES.expiresAt,
        enabled: true,
      },
      billingMode: "PAY_PER_REQUEST",
    });
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error(
        "tfaws.Timers can only be bound by tfaws.Function for now"
      );
    }

    if (ops.includes(cloud.TimerInflightMethods.SET_TIMEOUT)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["dynamodb:UpdateItem"],
        resource: this.table.arn,
      });
    }

    host.addEnvironment(this.envName(), this.table.name);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "TimerClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `TIMERS_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }
}

Timer._annotateInflight("set_timeout", {});
