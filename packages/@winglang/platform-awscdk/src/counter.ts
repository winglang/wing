import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { cloud } from "@winglang/sdk";
import { Counter as AwsCounter, COUNTER_HASH_KEY } from "@winglang/sdk/lib/shared-aws/counter";

/**
 * AWS implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends AwsCounter {
  private readonly table: Table;
  
  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.table = new Table(this, "Default", {
      partitionKey: { name: COUNTER_HASH_KEY, type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
  public get dynamoTableArn(): string {
    return this.table.tableArn;
  }

  public get dynamoTableName(): string {
    return this.table.tableName;
  }
}
