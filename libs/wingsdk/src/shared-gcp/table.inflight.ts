import { ITableClient } from "../ex";
import { log } from "../shared/log";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: string,
    // TODO(wiktor.zajac) resolve client
  ) { }

  insert(key: string, row: Json): Promise<void> {
    log(`method invoked for ${this.tableName} ${this.primaryKey} ${this.columns}`);
    throw new Error(`Method not implemented. ${key} ${row}`);
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
