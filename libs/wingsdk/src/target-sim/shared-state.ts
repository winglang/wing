import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { SHARED_STATE_TYPE, SharedStateSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as core from "../core";
import * as std from "../std";
import { BaseResourceSchema } from "../testing/simulator";

/**
 * Simulator implementation of `std.SharedState`
 *
 * @inflight `@winglang/sdk.std.ISharedStateClient`
 */
export class SharedState extends std.SharedState implements ISimulatorResource {
  private readonly initial: std.MutJson;
  constructor(scope: Construct, id: string, initial: any) {
    super(scope, id, initial);
    this.initial = initial;
  }

  public bind(host: std.IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: SharedStateSchema = {
      type: SHARED_STATE_TYPE,
      path: this.node.path,
      props: {
        initialValue: this.initial,
      },
      attrs: {} as any,
    };
    return schema;
  }
}
