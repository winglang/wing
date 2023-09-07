import * as ex from "../ex";
import { Construct } from "constructs";
import { Json } from "../std";
import { BigtableTable } from "../.gen/providers/google/bigtable-table";
import { ResourceNames, NameOptions, CaseConventions } from "../shared/resource-names";
import { Id } from "../.gen/providers/random/id";
import { log } from "console";

/*
 * Table names must be between 1 and 50 characters. We reserve 9 characters for
 * a random ID, so the maximum length is 41.
*
 * Must be 1-50 characters and must only contain 
 * hyphens, underscores, periods, letters and numbers.
*
 * We skip generating a hash since we need to append a random string to the
 * bucket name to make it globally unique.
 *
 */

/**
 * GCP implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
const TABLE_NAME_OPTS: NameOptions = {
  maxLen: 41,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9.\-\_]+)/g,
  includeHash: false,
};

// NOTES
// Bigtable requires atleast one ColumnFamily
// before data can be written

// NOTE
// I could not find exact specifications about instance
// name requirements, it is only based on what GC console showed me
const INSTANCE_NAME_OPTS: NameOptions = {
  maxLen: 30,
  disallowedRegex: /()/g,
};

/**
 * GCP implementation of `ex.Table`.
 *
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export class Table extends ex.Table {
  private readonly table: BigtableTable;

  constructor(scope: Construct, id: string, props: ex.TableProps = {}) {
    super(scope, id, props);

    const tableName = ResourceNames.generateName(this, TABLE_NAME_OPTS);
    const instanceName = ResourceNames.generateName(this, INSTANCE_NAME_OPTS);

    const randomId = new Id(this, "Id", {
      byteLength: 4, // 4 bytes = 8 hex characters
    });

    this.table = new BigtableTable(this, "Default", {
      name: tableName + `-${randomId.hex}`,
      instanceName: instanceName,
    });

    log(`What the hell am I supposed to do with ${this.table}`);
  }


  public addRow(key: string, row: Json): void {
    throw new Error(`Method not implemented. Can not add ${row} at a ${key}`);
  }

  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}
