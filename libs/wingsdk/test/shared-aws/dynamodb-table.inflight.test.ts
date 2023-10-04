import {
  PutItemCommandInput,
  UpdateItemCommandInput,
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
  PutItemCommandOutput,
  UpdateItemCommandOutput,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
  DeleteItemCommand,
  GetItemCommandInput,
  GetItemCommandOutput,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import "aws-sdk-client-mock-jest";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, describe, beforeEach } from "vitest";
import { DynamodbTableClient } from "../../src/shared-aws/dynamodb-table.inflight";

const MOCK_TABLE_NAME = "MyBeautifulTable";
const dynamoMock = mockClient(DynamoDBClient);

describe("inflight table tests", () => {
  let client: DynamodbTableClient,
    row: { id: string; somenumber: number },
    key: string;
  beforeEach(() => {
    key = "test";
    row = { id: key, somenumber: 1 };
    client = new DynamodbTableClient(MOCK_TABLE_NAME);
    dynamoMock.reset();
  });

  test("putItem", async () => {
    // GIVEN
    const expectedRequest: PutItemCommandInput = {
      TableName: MOCK_TABLE_NAME,
      Item: {
        id: { S: key },
        somenumber: { N: String(row.somenumber) },
      },
    };
    const mockResponse: PutItemCommandOutput = {
      $metadata: {},
    };
    dynamoMock.on(PutItemCommand, expectedRequest).resolves(mockResponse);
    // WHEN
    const response = await client.putItem({ item: row as any });
    // THEN
    expect(response.attributes).toEqual(undefined);
    expect(dynamoMock).toHaveReceivedCommandWith(
      PutItemCommand,
      expectedRequest
    );
  });

  test("updateItem", async () => {
    // GIVEN
    const expectedRequest: UpdateItemCommandInput = {
      TableName: MOCK_TABLE_NAME,
      Key: { id: { S: key } },
      UpdateExpression: `SET somenumber = :somenumber`,
      ExpressionAttributeValues: {
        ":somenumber": { N: `${row.somenumber}` },
      },
    };
    const mockResponse: UpdateItemCommandOutput = {
      $metadata: {},
      Attributes: {
        id: { S: key },
      },
    };
    dynamoMock.on(UpdateItemCommand, expectedRequest).resolves(mockResponse);
    // WHEN
    const response = await client.updateItem({
      key: { id: key } as any,
      updateExpression: `SET somenumber = :somenumber`,
      expressionAttributeValues: {
        ":somenumber": row.somenumber,
      } as any,
      returnValues: "ALL_OLD",
    });
    // THEN
    expect(response.attributes).toEqual({ id: key });
    expect(dynamoMock).toHaveReceivedCommandWith(
      UpdateItemCommand,
      expectedRequest
    );
  });

  test("deleteItem", async () => {
    // GIVEN
    const expectedRequest: DeleteItemCommandInput = {
      TableName: MOCK_TABLE_NAME,
      Key: { id: { S: row.id } },
    };
    const mockResponse: DeleteItemCommandOutput = {
      $metadata: {},
    };
    dynamoMock.on(DeleteItemCommand, expectedRequest).resolves(mockResponse);
    // WHEN
    await client.deleteItem({ key: { id: row.id } as any });
    // THEN
    expect(dynamoMock).toHaveReceivedCommandWith(
      DeleteItemCommand,
      expectedRequest
    );
  });

  test("getItem on an empty table", async () => {
    // GIVEN
    const expectedRequest: GetItemCommandInput = {
      TableName: MOCK_TABLE_NAME,
      Key: { id: { S: key } },
    };
    const mockResponse: GetItemCommandOutput = {
      $metadata: {},
    };
    dynamoMock.on(GetItemCommand, expectedRequest).resolves(mockResponse);
    // WHEN
    const response = await client.getItem({ key: { id: key } as any });
    // THEN
    expect(response.item).toBeUndefined();
    expect(dynamoMock).toHaveReceivedCommandWith(
      GetItemCommand,
      expectedRequest
    );
  });

  test("getItem", async () => {
    // GIVEN
    const expectedRequest: GetItemCommandInput = {
      TableName: MOCK_TABLE_NAME,
      Key: {
        id: { S: key },
      },
    };
    const mockResponse: GetItemCommandOutput = {
      $metadata: {},
      Item: {
        id: { S: `${key}` },
        somenumber: { N: `${row.somenumber}` },
      },
    };
    dynamoMock.on(GetItemCommand, expectedRequest).resolves(mockResponse);
    // WHEN
    const response = await client.getItem({ key: { id: key } as any });
    // THEN
    expect(response.item).toEqual({ id: key, somenumber: row.somenumber });
    expect(dynamoMock).toHaveReceivedCommandWith(
      GetItemCommand,
      expectedRequest
    );
  });
});
