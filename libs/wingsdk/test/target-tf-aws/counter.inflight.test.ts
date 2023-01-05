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
import { CounterClient } from "../../src/target-tf-aws/counter.inflight";

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

interface MockOptions {
  readonly expectedTableName: string;
  readonly expectedAmount?: number;
  readonly initial?: number;
  readonly responseValue?: number;
}

function setupIncMock(opts: MockOptions) {
  const expectedRequest: UpdateItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: "counter" } },
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
    Key: { id: { S: "counter" } },
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
