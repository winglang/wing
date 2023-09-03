import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamodbTableClientBase } from "../ex/dynamodb-table";

export class DynamodbTableClient extends DynamodbTableClientBase {
  constructor(
    tableName: string,
    primaryKey: string,
    private readonly _client = new DynamoDBClient({})
  ) {
    super(tableName, primaryKey);
  }

  public async _rawClient(): Promise<any> {
    return this._client;
  }
}
