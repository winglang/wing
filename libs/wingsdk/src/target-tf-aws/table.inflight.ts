import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ColumnType, ITableClient } from "../cloud";
import { Json } from "../std";

export class TableClient implements ITableClient {
  constructor(
    private readonly tableName: string,
    private readonly primaryKey: string,
    private readonly columns: Map<string, ColumnType>,
    private readonly client = new DynamoDBClient({})
  ) { }

  public async insert(row: Json): Promise<void> {
    const primaryKeyType =
      this.columns.get(this.primaryKey) == ColumnType.STRING
        ? "string"
        : "number";

    if (!row.get(this.primaryKey)) {
      throw new Error(`${this.primaryKey} not found`);
    }
    if (typeof row.get(this.primaryKey) !== primaryKeyType) {
      throw new Error(`${this.primaryKey} is not a valid type.`);
    }

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(row),
    });
    await this.client.send(command);
  }
}
