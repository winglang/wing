import { Construct } from "constructs";
import { App } from "./app";
import {
  BigtableTable,
  BigtableTableConfig,
  BigtableTableColumnFamily,
} from "../.gen/providers/google/bigtable-table";
import {
  BigtableInstance,
  BigtableInstanceCluster,
  BigtableInstanceConfig,
} from "../.gen/providers/google/bigtable-instance";
import * as ex from "../ex";
import {
  ResourceNames,
  NameOptions,
  CaseConventions,
} from "../shared/resource-names";
import { IInflightHost, Json } from "../std";

const TABLE_NAME_OPTS: NameOptions = {
  maxLen: 41,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9.\-\_]+)/g,
  includeHash: false,
};


// TODO(wiktor.zajac)  proper name opts
const INSTANCE_NAME_OPTS: NameOptions = {
  maxLen: 30,
  disallowedRegex: /([a-z][a-z0-9\-]+[a-z0-9])/g,
  sep: undefined,
};

/**
 * GCP implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export class Table extends ex.Table {
  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
    super(scope, id, props);

    const app = App.of(this) as App;

    const tableName = ResourceNames.generateName(this, TABLE_NAME_OPTS);
    const instanceName = ResourceNames.generateName(this, INSTANCE_NAME_OPTS);


    const columnsFamily: BigtableTableColumnFamily[] = [];
    for (let key in this.columns) {
      columnsFamily.push({ family: key });
    }

    let clusterId = props.clusterId;
    if (!props.clusterId) {
      clusterId = "default"; // ???
    }

    const instanceCluster: BigtableInstanceCluster = {
      clusterId: clusterId!,
      numNodes: props.numNodes,
      storageType: props.storageType,
      zone: app.zone,
    }


    const instanceConfig: BigtableInstanceConfig = {
      name: instanceName,
      cluster: [instanceCluster], // TODO(wiktor.zajac) should we allow for more clusters?
    }

    let instance = new BigtableInstance(this, "Instance", instanceConfig);


    const tableConfig: BigtableTableConfig = {
      name: tableName,
      instanceName: instance.name,
      columnFamily: columnsFamily,
      project: app.projectId,
    };

    new BigtableTable(this, "Default", tableConfig);

  }

  public addRow(_key: string, _row: Json): void {
    throw new Error("Method is not supported as preflight for GCP target.");
  }

  public bind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }

  public _toInflight(): string {
    throw new Error(
      "cloud.Function cannot be used as an Inflight resource on GCP yet"
    );
  }
}
