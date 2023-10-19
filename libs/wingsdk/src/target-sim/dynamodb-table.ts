import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { DynamodbTableSchema, DYNAMODB_TABLE_TYPE } from "./schema-resources";
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
      type: DYNAMODB_TABLE_TYPE,
      path: this.node.path,
      props: {
        name: this.name,
        attributeDefinitions: this.props.attributeDefinitions,
        hashKey: this.props.hashKey,
        rangeKey: this.props.rangeKey,
      },
      attrs: {} as any,
    };
    return schema;
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
