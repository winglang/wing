import {
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
  GetItemCommandInput,
  GetItemCommandOutput,
  DynamoDBClient,
  UpdateItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach } from "vitest";
import { CounterClient } from "../../src/shared-aws/counter.inflight";

const MOCK_TABLE_NAME = "MyBeautifulCounter";
const dynamoMock = mockClient(DynamoDBClient);

beforeEach(() => {
  dynamoMock.reset();
});

test("inc(1)", async () => {
  // GIVEN
  const prevValue = 887;
  setupIncMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 1,
    initial: 0,
    responseValue: prevValue + 1,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.inc();

  // THEN
  expect(response).toEqual(prevValue); // returns previous value
});

test("inc(5)", async () => {
  // GIVEN
  const prevValue = 887;
  setupIncMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 5,
    initial: 0,
    responseValue: 887 + 5,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.inc(5);

  // THEN
  expect(response).toEqual(prevValue); // returns previous value
});

test("key inc(1)", async () => {
  // GIVEN
  const prevValue = 887;
  setupIncMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 1,
    initial: 0,
    responseValue: prevValue + 1,
    key: "my-key",
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.inc(undefined, "my-key");

  // THEN
  expect(response).toEqual(prevValue); // returns previous value
});

test("key inc(5)", async () => {
  // GIVEN
  const prevValue = 887;
  setupIncMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 5,
    initial: 0,
    responseValue: 887 + 5,
    key: "my-key",
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.inc(5, "my-key");

  // THEN
  expect(response).toEqual(prevValue); // returns previous value
});

test("set(0)", async () => {
  // GIVEN
  setupSetMock({
    expectedTableName: MOCK_TABLE_NAME,
    setValue: 0,
  });
  setupPeekMock({
    expectedTableName: MOCK_TABLE_NAME,
    responseValue: 0,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  await client.set(0);
  const response = await client.peek();

  // THEN
  expect(response).toEqual(0);
});

test("set(10, 'my-key')", async () => {
  // GIVEN
  setupSetMock({
    expectedTableName: MOCK_TABLE_NAME,
    setValue: 0,
    key: "my-key",
  });
  setupPeekMock({
    expectedTableName: MOCK_TABLE_NAME,
    responseValue: 10,
    key: "my-key",
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  await client.set(10, "my-key");
  const response = await client.peek("my-key");

  // THEN
  expect(response).toEqual(10);
});

test("peek with initial value", async () => {
  setupPeekMock({
    expectedTableName: MOCK_TABLE_NAME,
    responseValue: 123,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.peek();

  expect(response).toEqual(123);
});

test("peek without initial value", async () => {
  setupPeekMock({
    expectedTableName: MOCK_TABLE_NAME,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.peek();

  expect(response).toEqual(0);
});

test("peek with value", async () => {
  setupPeekMock({
    expectedTableName: MOCK_TABLE_NAME,
    responseValue: 123,
    key: "my-key",
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.peek("my-key");

  expect(response).toEqual(123);
});

test("key peek without value", async () => {
  setupPeekMock({
    expectedTableName: MOCK_TABLE_NAME,
    key: "my-key",
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.peek("my-key");

  expect(response).toEqual(0);
});

interface MockOptions {
  readonly key?: string;
  readonly expectedTableName: string;
  readonly expectedAmount?: number;
  readonly initial?: number;
  readonly responseValue?: number;
  readonly setValue?: number;
}

function setupIncMock(opts: MockOptions) {
  const expectedRequest: UpdateItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: opts.key ?? "counter" } },
    UpdateExpression: `SET counter_value = if_not_exists(counter_value, :initial) + :amount`,
    ExpressionAttributeValues: {
      ":amount": { N: `${opts.expectedAmount}` },
      ":initial": { N: `${opts.initial}` },
    },
    ReturnValues: "UPDATED_NEW",
  };
  const mockResponse: UpdateItemCommandOutput = {
    $metadata: {},
    Attributes: !opts.responseValue
      ? undefined
      : {
          counter_value: { N: `${opts.responseValue}` },
        },
  };

  dynamoMock.on(UpdateItemCommand, expectedRequest).resolves(mockResponse);
}

function setupPeekMock(opts: MockOptions) {
  const expectedRequest: GetItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: opts.key ?? "counter" } },
  };
  const mockResponse: GetItemCommandOutput = {
    $metadata: {},
    Item: !opts.responseValue
      ? {
          counter_value: { N: "0" },
        }
      : {
          counter_value: { N: `${opts.responseValue}` },
        },
  };

  dynamoMock.on(GetItemCommand, expectedRequest).resolves(mockResponse);
}

function setupSetMock(opts: MockOptions) {
  const expectedRequest: UpdateItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: opts.key ?? "counter" } },
    UpdateExpression: `SET counter_value = :set_value`,
    ExpressionAttributeValues: {
      ":set_value": { N: `${opts.setValue}` },
    },
    ReturnValues: "UPDATED_NEW",
  };
  const mockResponse: UpdateItemCommandOutput = {
    $metadata: {},
    Attributes:
      opts.setValue === undefined
        ? undefined
        : {
            counter_value: { N: `${opts.setValue}` },
          },
  };

  dynamoMock.on(UpdateItemCommand, expectedRequest).resolves(mockResponse);
}
