import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { isAwsCdkFunction } from "./function";
import { core, ex, std } from "@winglang/sdk";
import { ResourceNames } from "@winglang/sdk/lib/shared/resource-names";
import { IAwsDynamodbTable, NAME_OPTS } from "@winglang/sdk/lib/shared-aws/dynamodb-table";
import { calculateDynamodbTablePermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

/**
 * AWS implementation of `ex.DynamodbTable`.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 */
export class DynamodbTable extends ex.DynamodbTable implements IAwsDynamodbTable {
  private readonly table: Table;

  constructor(scope: Construct, id: string, props: ex.DynamodbTableProps) {
    super(scope, id, props);

    const attributeDefinitions = props.attributeDefinitions as any;

    this.table = new Table(this, "Default", {
      tableName: ResourceNames.generateName(this, {
        prefix: this.name,
        ...NAME_OPTS,
      }),
      partitionKey: {
        name: props.hashKey,
        type: attributeDefinitions[props.hashKey] as AttributeType,
      },
      sortKey: props.rangeKey
        ? {
          name: props.rangeKey,
          type: attributeDefinitions[props.rangeKey] as AttributeType,
        }
        : undefined,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement 'isAwsCdkFunction' method");
    }

    host.awscdkFunction.addToRolePolicy(new PolicyStatement(
      ...calculateDynamodbTablePermissions(this.table.tableArn, ops)
    ));

    host.addEnvironment(this.envName(), this.table.tableName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      ex.DynamodbTableInflightMethods.PUT_ITEM,
      ex.DynamodbTableInflightMethods.UPDATE_ITEM,
      ex.DynamodbTableInflightMethods.DELETE_ITEM,
      ex.DynamodbTableInflightMethods.GET_ITEM,
      ex.DynamodbTableInflightMethods.SCAN,
      ex.DynamodbTableInflightMethods.QUERY,
      ex.DynamodbTableInflightMethods.TRANSACT_GET_ITEMS,
      ex.DynamodbTableInflightMethods.TRANSACT_WRITE_ITEMS,
      ex.DynamodbTableInflightMethods.BATCH_GET_ITEM,
      ex.DynamodbTableInflightMethods.BATCH_WRITE_ITEM,
    ];
  }

  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "DynamodbTableClient",
      [`process.env["${this.envName()}"]`]
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
