import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { TableSchema, TABLE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Simulator implementation of `cloud.Table`.
 *
 * @inflight `@winglang/sdk.cloud.ITableClient`
 */
export class Table extends cloud.Table implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: cloud.TableProps = {}) {
    super(scope, id, props);
  }
  public toSimulator(): BaseResourceSchema {
    const schema: TableSchema = {
      type: TABLE_TYPE,
      path: this.node.path,
      props: {
        name: this.name,
        columns: this.columns,
        primaryKey: this.primaryKey,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource("table", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient("table", this);
  }
}

Table._annotateInflight("insert", {});
Table._annotateInflight("update", {});
Table._annotateInflight("delete", {});
Table._annotateInflight("get", {});
Table._annotateInflight("list", {});
