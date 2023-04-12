import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { COUNTER_HASH_KEY } from "../shared-aws/commons";
import { calculateCounterPermissions } from "../shared-aws/permissions";

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  private readonly table: Table;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.table = new Table(this, "Default", {
      partitionKey: { name: COUNTER_HASH_KEY, type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("counters can only be bound by awscdk.Function for now");
    }

    host.addPolicyStatements(
      ...calculateCounterPermissions(this.table.tableArn, ops)
    );

    host.addEnvironment(this.envName(), this.table.tableName);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
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
