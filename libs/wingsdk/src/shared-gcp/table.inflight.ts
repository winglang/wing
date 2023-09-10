import { Bigtable } from "@google-cloud/bigtable";
import { ITableClient } from "../ex";
import { log } from "../shared/log";
import { validateRow } from "../shared/table-utils";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly instanceId: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    private readonly client = new Bigtable({ projectId: process.env.GOOGLE_PROJECT_ID })
  ) { }

  public async insert(key: string, row: Json): Promise<void> {
    validateRow(row, JSON.parse(this.columns));

    const rowToInsert = { key: key, ...row };
    const instance = this.client.instance(this.instanceId);
    const table = instance.table(this.tableName);

    try {
      const [tableExists] = await table.exists();
      if (!tableExists) {
        // NOTE (wiktor.zajac)
        // As far as I can understand it should be resolved on a preflight stage, it have to be valid here
        throw new Error(`Table with name ${this.tableName} does not exist for an instance with id: ${this.instanceId}`)
      }
    } catch (err) {
      log(`Error: ${err}`)
    }
    await table.insert(rowToInsert)
  }
  update(key: string, row: Json): Promise<void> {
    log(`method invoked for ${this.tableName} ${this.primaryKey} ${this.columns}`);
    throw new Error(`Method not implemented. ${key} ${row}`);
  }
  delete(key: string): Promise<void> {
    log(`method invoked for ${this.tableName} ${this.primaryKey} ${this.columns}`);
    throw new Error(`Method not implemented. ${key}`);
  }
  get(key: string): Promise<Json> {
    log(`method invoked for ${this.tableName} ${this.primaryKey} ${this.columns}`);
    throw new Error(`Method not implemented. ${key}`);
  }
  list(): Promise<Json[]> {
    log(`method invoked for ${this.tableName} ${this.primaryKey} ${this.columns}`);
    throw new Error("Method not implemented.");
  }
}
