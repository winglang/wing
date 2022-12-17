import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { addConnections } from "./util";

export const HASH_KEY = "id";

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/wingsdk.cloud.ICounterClient`
 */
export class Counter extends cloud.CounterBase {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.table = new DynamodbTable(this, "Default", {
      name: `wingsdk-counter-${this.node.addr}`,
      attribute: [{ name: HASH_KEY, type: "S" }],
      hashKey: HASH_KEY,
      billingMode: "PAY_PER_REQUEST",
    });
  }

  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("counters can only be bound by tfaws.Function for now");
    }

    const env = `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;

    if (ops.includes(cloud.CounterInflightMethods.INC)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["dynamodb:UpdateItem"],
        resource: this.table.arn,
      });
    }

    host.addEnvironment(env, this.table.name);

    addConnections(this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    // TODO: assert that `env` is added to the `host` resource
    const env = `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
    return core.InflightClient.for(__filename, "CounterClient", [
      `process.env["${env}"]`,
      `${this.initial}`,
    ]);
  }
}

Counter._annotateInflight("inc", {});
