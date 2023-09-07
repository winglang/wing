import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamodbTableClientBase } from "../ex/dynamodb-table";

export class DynamodbTableClient extends DynamodbTableClientBase {
  constructor(
    tableName: string,
    attributeDefinitions: string,
    keySchema: string,
    private readonly _client = new DynamoDBClient({})
  ) {
    super(tableName, JSON.parse(attributeDefinitions), JSON.parse(keySchema));
  }

  public async _rawClient(): Promise<DynamoDBClient> {
    return this._client;
  }
}
