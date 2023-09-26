import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { TableSchema, TABLE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as ex from "../ex";
import { BaseResourceSchema } from "../simulator/simulator";
import { Json, IInflightHost } from "../std";

/**
 * Simulator implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export class Table extends ex.Table implements ISimulatorResource {
  private readonly initialRows: Record<string, Json> = {};
  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
    super(scope, id, props);
  }

  public addRow(key: string, row: Json): void {
    this.initialRows[key] = { ...row, [this.primaryKey]: key } as Json;
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

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
