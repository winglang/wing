import {
  PutItemCommandInput,
  PutItemCommandOutput,
  DynamoDBClient,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

import { mockClient } from "aws-sdk-client-mock";
import { TableClient } from "../../src/target-tf-aws/table.inflight";
import { ColumnType } from "../../src/cloud";

const MOCK_TABLE_NAME = "MyBeautifulTable";
const dynamoMock = mockClient(DynamoDBClient);

test("insert", async () => {
  // GIVEN
  const primaryKey = "id";
  const columns = { id: ColumnType.STRING };
  const row = { id: "test" };
  // WHEN
  const client = new TableClient(MOCK_TABLE_NAME, primaryKey, columns as any);
  const response = await client.insert(row as any);

  // THEN
  expect(response).toEqual(undefined);
});
