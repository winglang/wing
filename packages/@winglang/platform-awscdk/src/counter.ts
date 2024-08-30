import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { cloud, std } from "@winglang/sdk";
import { COUNTER_HASH_KEY } from "@winglang/sdk/lib/shared-aws/commons";
import { calculateCounterPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsCounter } from "@winglang/sdk/lib/shared-aws/counter";
import { addPolicyStatements, isAwsCdkFunction } from "./function";
import { InflightClient, LiftMap } from "@winglang/sdk/lib/core";

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter implements IAwsCounter {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("counter", "counter.inflight"),
      "CounterClient"
    );
  }

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
  public get _liftMap(): LiftMap {
    return {
      [cloud.CounterInflightMethods.INC]: [],
      [cloud.CounterInflightMethods.DEC]: [],
      [cloud.CounterInflightMethods.PEEK]: [],
      [cloud.CounterInflightMethods.SET]: [],
    };
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement 'isAwsCdkFunction' method");
    }

    addPolicyStatements(
      host.awscdkFunction,
      calculateCounterPermissions(this.table.tableArn, ops)
    );

    host.addEnvironment(this.envName(), this.table.tableName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $tableName: `process.env["${this.envName()}"]`,
      $initial: `${this.initial}`,
    };
  }

  private envName(): string {
    return `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }

  public get dynamoTableArn(): string {
    return this.table.tableArn;
  }

  public get dynamoTableName(): string {
    return this.table.tableName;
  }
}
