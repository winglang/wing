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
/*
import {
  BigtableInstanceIamMember,
  BigtableInstanceIamMemberConfig,
} from "../.gen/providers/google/bigtable-instance-iam-member";
import {
  BigtableTableIamMember,
  BigtableTableIamMemberConfig,
} from "../.gen/providers/google/bigtable-table-iam-member";
*/
import * as ex from "../ex";
import {
  ResourceNames,
  NameOptions,
  CaseConventions,
} from "../shared/resource-names";
import { IInflightHost, Json } from "../std";

/*
 * Table names must be between 1 and 50 characters. We reserve 9 characters for
 * a random ID, so the maximum length is 41.
 *
 * Must only contain
 * hyphens, underscores, periods, letters and numbers.
 *
 * We skip generating a hash since we need to append a random string to the
 * bucket name to make it globally unique.
 *
 */
const TABLE_NAME_OPTS: NameOptions = {
  maxLen: 41,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9.\-\_]+)/g,
  includeHash: false,
};


/*
const INSTANCE_NAME_OPTS: NameOptions = {
  maxLen: 30,
  disallowedRegex: /([a-z][a-z0-9\-]+[a-z0-9])/g,
  sep: undefined,
};
*/

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
    // const instanceName = ResourceNames.generateName(this, INSTANCE_NAME_OPTS);


    const columnsFamily: BigtableTableColumnFamily[] = [];
    for (let key in this.columns) {
      columnsFamily.push({ family: key });
    }

    const instanceCluster: BigtableInstanceCluster = {
      clusterId: 'my-wing-cluster',
      numNodes: 1,
      storageType: 'HDD',
      zone: 'us-central1-a',
    }

    /*
    const instanceIamConfig: BigtableInstanceIamMemberConfig = {
      instance: instanceName,
      member: 'allUsers', // https://cloud.google.com/billing/docs/reference/rest/v1/Policy#Binding
      role: 'roles/bigtable.admin',
    }
    new BigtableInstanceIamMember(this, "InstanceIam", instanceIamConfig);
    */

    const instanceConfig: BigtableInstanceConfig = {
      name: 'rampampam123',
      cluster: [instanceCluster],
    }

    let instance = new BigtableInstance(this, "Instance", instanceConfig);


    const tableConfig: BigtableTableConfig = {
      name: tableName,
      instanceName: instance.name,
      columnFamily: columnsFamily,
      project: app.projectId,
    };

    new BigtableTable(this, "Default", tableConfig);

    /*
    const bigtableIamConfig: BigtableTableIamMemberConfig = {
      instance: instance.name,
      member: 'allUsers', // https://cloud.google.com/billing/docs/reference/rest/v1/Policy#Binding
      role: 'roles/bigtable.admin',
      table: table.name,
    }

    new BigtableTableIamMember(this, "BigtableIam", bigtableIamConfig);
    */
  }

  public addRow(_key: string, _row: Json): void {
    throw new Error("Method not implemented.");
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
