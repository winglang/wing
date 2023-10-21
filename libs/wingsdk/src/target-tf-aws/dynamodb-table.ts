import { Construct } from "constructs";
import { Function } from "./function";
import { DynamodbTable as AwsDynamodbTable } from "../.gen/providers/aws/dynamodb-table";
import * as core from "../core";
import * as ex from "../ex";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { calculateDynamodbTablePermissions } from "../shared-aws/permissions";
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
}
