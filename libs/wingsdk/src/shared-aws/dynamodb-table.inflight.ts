import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { captureAWSv3Client } from "aws-xray-sdk";
import { DynamodbTableClientBase } from "../ex/dynamodb-table";

export class DynamodbTableClient extends DynamodbTableClientBase {
  constructor(
    tableName: string,
    private readonly _client = captureAWSv3Client(new DynamoDBClient({}))
  ) {
    super(tableName);
  }

  public async _rawClient(): Promise<DynamoDBClient> {
    return this._client;
  }
}
