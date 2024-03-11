import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { cloud, core, std } from "@winglang/sdk";
import { COUNTER_HASH_KEY } from "@winglang/sdk/lib/shared-aws/commons";
import { calculateCounterPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsCounter } from "@winglang/sdk/lib/shared-aws/counter";
import { addPolicyStatements, isAwsCdkFunction } from "./function";

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter implements IAwsCounter {
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
  public _supportedOps(): string[] {
    return [
      cloud.CounterInflightMethods.INC,
      cloud.CounterInflightMethods.DEC,
      cloud.CounterInflightMethods.PEEK,
      cloud.CounterInflightMethods.SET,
    ];
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement 'isAwsCdkFunction' method");
    }

    addPolicyStatements(host.awscdkFunction, calculateCounterPermissions(this.table.tableArn, ops));

    host.addEnvironment(this.envName(), this.table.tableName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "CounterClient",
      [`process.env["${this.envName()}"]`, `${this.initial}`]
    );
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
