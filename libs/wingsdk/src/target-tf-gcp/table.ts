import { Construct } from "constructs";
import {
  BigtableTable,
  BigtableTableConfig,
  BigtableTableColumnFamily,
} from "../.gen/providers/google/bigtable-table";
import { Id } from "../.gen/providers/random/id";
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

const INSTANCE_NAME_OPTS: NameOptions = {
  maxLen: 30,
  disallowedRegex: /([^a-z0-9.\-\_]+)/g,
};

/**
 * GCP implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export class Table extends ex.Table {
  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
    super(scope, id, props);

    const tableName = ResourceNames.generateName(this, TABLE_NAME_OPTS);
    const instanceName = ResourceNames.generateName(this, INSTANCE_NAME_OPTS);

    const randomId = new Id(this, "Id", {
      byteLength: 4, // 4 bytes = 8 hex characters
    });

    const columnsFamily: BigtableTableColumnFamily[] = [];
    for (let key in this.columns) {
      columnsFamily.push({ family: key });
    }

    const config: BigtableTableConfig = {
      name: tableName + `-${randomId.hex}`,
      instanceName: instanceName,
      columnFamily: columnsFamily,
    };

    new BigtableTable(this, "Default", config);
  }

  public addRow(key: string, row: Json): void {
    throw new Error(`Can not insert ${row} at given ${key}`);
  }

  public bind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.")
  }

  public _toInflight(): string {
    throw new Error(
      "cloud.Function cannot be used as an Inflight resource on GCP yet"
    );
  }
}
