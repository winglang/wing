import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { TableSchema, TABLE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { Json, IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

/**
 * Simulator implementation of `cloud.Table`.
 *
 * @inflight `@winglang/sdk.cloud.ITableClient`
 */
export class Table extends cloud.Table implements ISimulatorResource {
  private readonly initialRows: Record<string, Json> = {};
  constructor(scope: Construct, id: string, props: cloud.TableProps = {}) {
    super(scope, id, props);
  }

  public addRow(key: string, row: Json): void {
    this.initialRows[key] = row;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: TableSchema = {
      type: TABLE_TYPE,
      path: this.node.path,
      props: {
        name: this.name,
        columns: this.columns,
        primaryKey: this.primaryKey,
        initialRows: this.initialRows,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
