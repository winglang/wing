import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Resource } from "../core";
import { Function } from "./function";
import { addBindConnections } from "./util";

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

  /**
   * @internal
   */
  public _bind(
    captureScope: Resource,
    metadata: core.CaptureMetadata
  ): core.Code {
    if (!(captureScope instanceof Function)) {
      throw new Error(
        "counters can only be captured by tfaws.Function for now"
      );
    }

    const env = `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;

    const methods = new Set(metadata.methods ?? []);
    if (methods.has(cloud.CounterInflightMethods.INC)) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["dynamodb:UpdateItem"],
        resource: this.table.arn,
      });
    }

    captureScope.addEnvironment(env, this.table.name);

    addBindConnections(this, captureScope);

    return core.InflightClient.for(__filename, "CounterClient", [
      `process.env["${env}"]`,
      `${this.initialValue}`,
    ]);
  }
}
