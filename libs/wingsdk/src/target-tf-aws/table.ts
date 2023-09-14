import { marshall } from "@aws-sdk/util-dynamodb";
import { Construct } from "constructs";
import { Function } from "./function";
import { DynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import { DynamodbTableItem } from "../.gen/providers/aws/dynamodb-table-item";
import * as core from "../core";
import * as ex from "../ex";
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
 * AWS implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export class Table extends ex.Table {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
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
    const item = { [this.primaryKey]: key, ...row };
    const marshalledItem = marshall(item);
    const stringifiedItem = JSON.stringify(marshalledItem);

    new DynamodbTableItem(this, `DynamodbTableItem-${key}`, {
      tableName: this.table.name,
      hashKey: this.table.hashKey,
      item: stringifiedItem,
    });
  }

  public bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("tables can only be bound by tfaws.Function for now");
    }

    if (
      ops.includes(ex.TableInflightMethods.INSERT) ||
      ops.includes(ex.TableInflightMethods.UPSERT)
    ) {
      host.addPolicyStatements([
        {
          actions: ["dynamodb:PutItem"],
          resources: [this.table.arn],
        },
      ]);
    }
    if (ops.includes(ex.TableInflightMethods.UPDATE)) {
      host.addPolicyStatements([
        {
          actions: ["dynamodb:UpdateItem"],
          resources: [this.table.arn],
        },
      ]);
    }

    if (ops.includes(ex.TableInflightMethods.DELETE)) {
      host.addPolicyStatements([
        {
          actions: ["dynamodb:DeleteItem"],
          resources: [this.table.arn],
        },
      ]);
    }

    if (ops.includes(ex.TableInflightMethods.GET)) {
      host.addPolicyStatements([
        {
          actions: ["dynamodb:GetItem"],
          resources: [this.table.arn],
        },
      ]);
    }

    if (ops.includes(ex.TableInflightMethods.LIST)) {
      host.addPolicyStatements([
        {
          actions: ["dynamodb:Scan"],
          resources: [this.table.arn],
        },
      ]);
    }

    host.addEnvironment(this.envName(), this.table.name);
    host.addEnvironment(this.primaryKeyEnvName(), this.primaryKey);
    host.addEnvironment(this.columnsEnvName(), JSON.stringify(this.columns));

    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
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
