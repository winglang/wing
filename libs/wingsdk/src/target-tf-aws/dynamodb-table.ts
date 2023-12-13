import { Construct } from "constructs";
import { Function } from "./function";
import { DynamodbTable as AwsDynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import * as core from "../core";
import * as ex from "../ex";
import { ResourceNames } from "../shared/resource-names";
import { IAwsDynamodbTable, NAME_OPTS } from "../shared-aws/dynamodb-table";
import { calculateDynamodbTablePermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";

/**
 * AWS implementation of `ex.DynamodbTable`.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 */
export class DynamodbTable
  extends ex.DynamodbTable
  implements IAwsDynamodbTable
{
  private readonly table: AwsDynamodbTable;

  constructor(scope: Construct, id: string, props: ex.DynamodbTableProps) {
    super(scope, id, props);

    this.table = new AwsDynamodbTable(this, "Default", {
      name: ResourceNames.generateName(this, {
        prefix: this.name,
        ...NAME_OPTS,
      }),
      attribute: Object.entries(props.attributeDefinitions).map(([k, v]) => ({
        name: k,
        type: v,
      })),
      hashKey: props.hashKey,
      rangeKey: props.rangeKey,
      billingMode: "PAY_PER_REQUEST",
    });
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

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error(
        "Dynamodb tables can only be bound by tfaws.Function for now"
      );
    }

    host.addPolicyStatements(
      ...calculateDynamodbTablePermissions(this.table.arn, ops)
    );

    host.addEnvironment(this.envName(), this.table.name);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "DynamodbTableClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }

  public get dynamoTableArn(): string {
    return this.table.arn;
  }

  public get dynamoTableName(): string {
    return this.table.name;
  }
}
