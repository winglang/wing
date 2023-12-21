import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamodbTableClientBase } from "../ex/dynamodb-table/table";

export class DynamodbTableClient extends DynamodbTableClientBase {
  constructor(
    tableName: string,
    private readonly _client = new DynamoDBClient({})
  ) {
    super(tableName);
  }

  public async _rawClient(): Promise<DynamoDBClient> {
    return this._client;
  }
}
