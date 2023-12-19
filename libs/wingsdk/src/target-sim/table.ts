import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { TableSchema } from "./schema-resources";
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
      type: ex.TABLE_FQN,
      path: this.node.path,
      addr: this.node.addr,
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
  public _supportedOps(): string[] {
    return [
      ex.TableInflightMethods.INSERT,
      ex.TableInflightMethods.UPSERT,
      ex.TableInflightMethods.UPDATE,
      ex.TableInflightMethods.DELETE,
      ex.TableInflightMethods.GET,
      ex.TableInflightMethods.TRYGET,
      ex.TableInflightMethods.LIST,
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
