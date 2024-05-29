import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { TableSchema } from "./schema-resources";
import {
  bindSimulatorResource,
  makeSimulatorJsClientType,
  simulatorLiftedFieldsFor,
} from "./util";
import { LiftMap } from "../core";
import * as ex from "../ex";
import { ToSimulatorOutput } from "../simulator/simulator";
import { Json, IInflightHost } from "../std";

/**
 * Simulator implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export class Table extends ex.Table implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("Table", Table._methods);
  }

  private readonly initialRows: Record<string, Json> = {};
  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
    super(scope, id, props);
  }

  public addRow(key: string, row: Json): void {
    this.initialRows[key] = { ...row, [this.primaryKey]: key } as Json;
  }

  public toSimulator(): ToSimulatorOutput {
    const props: TableSchema = {
      name: this.name,
      columns: this.columns,
      primaryKey: this.primaryKey,
      initialRows: this.initialRows,
    };
    return {
      type: ex.TABLE_FQN,
      props,
    };
  }

  /** @internal */
  public get _liftMap(): LiftMap {
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

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}
