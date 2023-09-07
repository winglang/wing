import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { DynamodbTableSchema, DYNAMODB_TABLE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as ex from "../ex";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

/**
 * Simulator implementation of `ex.DynamodbTable`.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 */
export class DynamodbTable
  extends ex.DynamodbTable
  implements ISimulatorResource
{
  constructor(scope: Construct, id: string, props: ex.DynamodbTableProps) {
    super(scope, id, props);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: DynamodbTableSchema = {
      type: DYNAMODB_TABLE_TYPE,
      path: this.node.path,
      props: {
        name: this.name,
        attributeDefinitions: this.attributeDefinitions,
        keySchema: this.keySchema,
      },
      attrs: {} as any,
    };
    return schema;
  }

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
