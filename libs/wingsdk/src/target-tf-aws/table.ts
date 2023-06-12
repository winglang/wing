import { Construct } from "constructs";
import { Function } from "./function";
import { DynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import { DynamodbTableItem } from "../.gen/providers/aws/dynamodb-table-item";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { Json, IInflightHost } from "../std";

/**
 * Table names must be between 3 and 255 characters.
 * You can use alphanumeric characters, dot (.), dash (-), and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  maxLen: 255,
  disallowedRegex: /[^a-zA-Z0-9\_\.\-]+/g,
};

/**
 * AWS implementation of `cloud.Table`.
 *
 * @inflight `@winglang/sdk.cloud.ITableClient`
 */
export class Table extends cloud.Table {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: cloud.TableProps = {}) {
    super(scope, id, props);

    this.table = new DynamodbTable(this, "Default", {
      name: ResourceNames.generateName(this, {
        prefix: this.name,
        ...NAME_OPTS,
      }),
      attribute: [{ name: this.primaryKey, type: "S" }],
      hashKey: this.primaryKey,
      billingMode: "PAY_PER_REQUEST",
    });
  }

  public addRow(key: string, row: Json): void {
    new DynamodbTableItem(this, `DynamodbTableItem-${key}`, {
      tableName: this.table.name,
      hashKey: key,
      item: JSON.stringify(row),
    });
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("tables can only be bound by tfaws.Function for now");
    }

    if (ops.includes(cloud.TableInflightMethods.INSERT)) {
      host.addPolicyStatements({
        actions: ["dynamodb:PutItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(cloud.TableInflightMethods.UPDATE)) {
      host.addPolicyStatements({
        actions: ["dynamodb:UpdateItem"],
        resources: [this.table.arn],
      });
    }

    if (ops.includes(cloud.TableInflightMethods.DELETE)) {
      host.addPolicyStatements({
        actions: ["dynamodb:DeleteItem"],
        resources: [this.table.arn],
      });
    }

    if (ops.includes(cloud.TableInflightMethods.GET)) {
      host.addPolicyStatements({
        actions: ["dynamodb:GetItem"],
        resources: [this.table.arn],
      });
    }

    if (ops.includes(cloud.TableInflightMethods.LIST)) {
      host.addPolicyStatements({
        actions: ["dynamodb:Scan"],
        resources: [this.table.arn],
      });
    }

    host.addEnvironment(this.envName(), this.table.name);
    host.addEnvironment(this.primaryKeyEnvName(), this.primaryKey);
    host.addEnvironment(this.columnsEnvName(), JSON.stringify(this.columns));

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "TableClient",
      [
        `process.env["${this.envName()}"]`,
        `process.env["${this.primaryKeyEnvName()}"]`,
        `process.env["${this.columnsEnvName()}"]`,
      ]
    );
  }

  private envName(): string {
    return `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }

  private primaryKeyEnvName(): string {
    return `${this.envName()}_PRIMARY_KEY`;
  }

  private columnsEnvName(): string {
    return `${this.envName()}_COLUMNS`;
  }
}
