import { marshall } from "@aws-sdk/util-dynamodb";
import { Construct } from "constructs";
import { App } from "./app";
import { DynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import { DynamodbTableItem } from "../.gen/providers/aws/dynamodb-table-item";
import * as core from "../core";
import * as ex from "../ex";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { AwsInflightHost } from "../shared-aws";
import { IAwsTable } from "../shared-aws/table";
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
export class Table extends ex.Table implements IAwsTable {
  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename
        .replace("target-tf-aws", "shared-aws")
        .replace("table", "table.inflight"),
      "TableClient"
    );
  }

  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
    super(scope, id, props);

    const isTestEnvironment = App.of(scope).isTestEnvironment;

    this.table = new DynamodbTable(this, "Default", {
      name: ResourceNames.generateName(this, {
        prefix: this.name,
        ...NAME_OPTS,
      }),
      attribute: [{ name: this.primaryKey, type: "S" }],
      hashKey: this.primaryKey,
      billingMode: "PAY_PER_REQUEST",
      pointInTimeRecovery: isTestEnvironment ? undefined : { enabled: true },
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

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    if (
      ops.includes(ex.TableInflightMethods.INSERT) ||
      ops.includes(ex.TableInflightMethods.UPSERT)
    ) {
      host.addPolicyStatements({
        actions: ["dynamodb:PutItem"],
        resources: [this.table.arn],
      });
    }
    if (ops.includes(ex.TableInflightMethods.UPDATE)) {
      host.addPolicyStatements({
        actions: ["dynamodb:UpdateItem"],
        resources: [this.table.arn],
      });
    }

    if (ops.includes(ex.TableInflightMethods.DELETE)) {
      host.addPolicyStatements({
        actions: ["dynamodb:DeleteItem"],
        resources: [this.table.arn],
      });
    }

    if (
      ops.includes(ex.TableInflightMethods.GET) ||
      ops.includes(ex.TableInflightMethods.TRYGET)
    ) {
      host.addPolicyStatements({
        actions: ["dynamodb:GetItem"],
        resources: [this.table.arn],
      });
    }

    if (ops.includes(ex.TableInflightMethods.LIST)) {
      host.addPolicyStatements({
        actions: ["dynamodb:Scan"],
        resources: [this.table.arn],
      });
    }

    host.addEnvironment(this.envName(), this.table.name);
    host.addEnvironment(this.primaryKeyEnvName(), this.primaryKey);
    host.addEnvironment(this.columnsEnvName(), JSON.stringify(this.columns));

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedFields(): Record<string, string> {
    return {
      $tableName: `process.env["${this.envName()}"]`,
      $primaryKey: `process.env["${this.primaryKeyEnvName()}"]`,
      $columns: `process.env["${this.columnsEnvName()}"]`,
    };
  }

  /** @internal */
  public get _liftMap(): core.LiftMap {
    return {
      [ex.TableInflightMethods.INSERT]: [],
      [ex.TableInflightMethods.UPSERT]: [],
      [ex.TableInflightMethods.UPDATE]: [],
      [ex.TableInflightMethods.DELETE]: [],
      [ex.TableInflightMethods.GET]: [],
      [ex.TableInflightMethods.TRYGET]: [],
      [ex.TableInflightMethods.LIST]: [],
    };
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

  public get dynamoTableArn(): string {
    return this.table.arn;
  }

  public get dynamoTableName(): string {
    return this.table.name;
  }
}
