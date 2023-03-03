import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../utils/resource-names";

/**
 * Counter (Table) names must be between 3 and 255 characters.
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

  constructor(scope: Construct, id: string, props: cloud.TableProps) {
    super(scope, id, props);

    if (this.columns[this.primaryKey] === undefined) {
      throw new Error(`${this.primaryKey} not found on columns`);
    }
    // The only data types allowed for primary key attributes are string, number, or binary (binary is not available).
    const primaryKeyType =
      this.columns[this.primaryKey] == cloud.ColumnType.NUMBER ? "N" : "S";
    this.table = new DynamodbTable(this, "Default", {
      name: ResourceNames.generateName(this, NAME_OPTS),
      attribute: [{ name: this.primaryKey, type: primaryKeyType }],
      billingMode: "PAY_PER_REQUEST",
    });
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("tables can only be bound by tfaws.Function for now");
    }

    if (ops.includes(cloud.TableInflightMethods.INSERT)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["dynamodb:PutItem"],
        resource: this.table.arn,
      });
    }

    host.addEnvironment(this.envName(), this.table.name);
    host.addEnvironment("PARTITION_KEY", this.primaryKey);
    host.addEnvironment("COLUMNS", JSON.stringify(this.columns));

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "CounterClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }
}

Table._annotateInflight("insert", {});