import { Construct } from "constructs";
import { Function } from "./function";
import { DynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import * as cloud from "../cloud";
import * as core from "../core";
import { COUNTER_HASH_KEY } from "../shared-aws/commons";
import { calculateCounterPermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";
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
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("counters can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(
      ...calculateCounterPermissions(this.table.arn, ops)
    );

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
