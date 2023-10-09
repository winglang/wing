import { Construct } from "constructs";
import { Function } from "./function";
import { DynamodbTable as AwsDynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import * as core from "../core";
import * as ex from "../ex";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { IInflightHost } from "../std";

/**
 * Table names must be between 3 and 255 characters.
 * You can use alphanumeric characters, dot (.), dash (-), and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  maxLen: 255,
  disallowedRegex: /[^a-zA-Z0-9\_\.\-]+/g,
};

/**
 * AWS implementation of `ex.DynamodbTable`.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 */
export class DynamodbTable extends ex.DynamodbTable {
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

  public bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error(
        "Dynamodb tables can only be bound by tfaws.Function for now"
      );
    }

    if (ops.includes(ex.DynamodbTableInflightMethods.PUT_ITEM)) {
      host.addPolicyStatements({
        actions: ["dynamodb:PutItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.UPDATE_ITEM)) {
      host.addPolicyStatements({
        actions: ["dynamodb:UpdateItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.DELETE_ITEM)) {
      host.addPolicyStatements({
        actions: ["dynamodb:DeleteItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.GET_ITEM)) {
      host.addPolicyStatements({
        actions: ["dynamodb:GetItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.SCAN)) {
      host.addPolicyStatements({
        actions: ["dynamodb:Scan"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.QUERY)) {
      host.addPolicyStatements({
        actions: ["dynamodb:Query"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.TRANSACT_GET_ITEMS)) {
      host.addPolicyStatements({
        actions: ["dynamodb:GetItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.TRANSACT_WRITE_ITEMS)) {
      // TODO: Merge into a single policy statement.
      host.addPolicyStatements({
        actions: ["dynamodb:PutItem"],
        resources: [this.table.arn],
      });
      host.addPolicyStatements({
        actions: ["dynamodb:UpdateItem"],
        resources: [this.table.arn],
      });
      host.addPolicyStatements({
        actions: ["dynamodb:DeleteItem"],
        resources: [this.table.arn],
      });
      host.addPolicyStatements({
        actions: ["dynamodb:ConditionCheckItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.BATCH_GET_ITEM)) {
      host.addPolicyStatements({
        actions: ["dynamodb:BatchGetItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.DynamodbTableInflightMethods.BATCH_WRITE_ITEM)) {
      host.addPolicyStatements({
        actions: ["dynamodb:BatchWriteItem"],
        resources: [this.table.arn],
      });
    }

    host.addEnvironment(this.envName(), this.table.name);

    super.bind(host, ops);
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
}
