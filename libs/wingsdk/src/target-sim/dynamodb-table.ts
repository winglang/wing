import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { DynamodbTableSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as ex from "../ex";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `ex.DynamodbTable`.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 */
export class DynamodbTable
  extends ex.DynamodbTable
  implements ISimulatorResource
{
  private readonly props: ex.DynamodbTableProps;

  constructor(scope: Construct, id: string, props: ex.DynamodbTableProps) {
    super(scope, id, props);

    this.props = props;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: DynamodbTableSchema = {
      type: ex.DYNAMODB_TABLE_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        name: this.name,
        attributeDefinitions: this.props.attributeDefinitions,
        hashKey: this.props.hashKey,
        rangeKey: this.props.rangeKey,
        globalSecondaryIndex: this.props.globalSecondaryIndex,
      },
      attrs: {} as any,
    };
    return schema;
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
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
