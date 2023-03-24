import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { COUNTER_HASH_KEY } from "../shared-aws/commons";
import { NameOptions, ResourceNames } from "../utils/resource-names";

/**
 * Counter (Table) names must be between 3 and 255 characters.
 * You can use alphanumeric characters, dot (.), dash (-), and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  maxLen: 255,
  disallowedRegex: /[^a-zA-Z0-9\_\.\-]+/g,
  prefix: "wing-counter-",
};

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.table = new DynamodbTable(this, "Default", {
      name: ResourceNames.generateName(this, NAME_OPTS),
      attribute: [{ name: COUNTER_HASH_KEY, type: "S" }],
      hashKey: COUNTER_HASH_KEY,
      billingMode: "PAY_PER_REQUEST",
    });
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("counters can only be bound by tfaws.Function for now");
    }

    if (
      ops.includes(cloud.CounterInflightMethods.INC) ||
      ops.includes(cloud.CounterInflightMethods.DEC) ||
      ops.includes(cloud.CounterInflightMethods.RESET)
    ) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["dynamodb:UpdateItem"],
        resource: this.table.arn,
      });
    }

    if (ops.includes(cloud.CounterInflightMethods.PEEK)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["dynamodb:GetItem"],
        resource: this.table.arn,
      });
    }

    host.addEnvironment(this.envName(), this.table.name);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "CounterClient",
      [`process.env["${this.envName()}"]`, `${this.initial}`]
    );
  }

  private envName(): string {
    return `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }
}

Counter._annotateInflight(cloud.CounterInflightMethods.INC, {});
Counter._annotateInflight(cloud.CounterInflightMethods.DEC, {});
Counter._annotateInflight(cloud.CounterInflightMethods.PEEK, {});
Counter._annotateInflight(cloud.CounterInflightMethods.RESET, {});
