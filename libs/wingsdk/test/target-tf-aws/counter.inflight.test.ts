import {
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
  DynamoDBClient,
  UpdateItemCommand,
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
  setupMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 1,
    responseValue: prevValue,
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
  setupMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 5,
    responseValue: 887,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.inc(5);

  // THEN
  expect(response).toEqual(prevValue); // returns previous value
});

test("fails when counter is not initialized", async () => {
  setupMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 1,
  });

  const client = new CounterClient(MOCK_TABLE_NAME);
  await expect(client.inc()).rejects.toThrow("");
});

interface MockOptions {
  readonly expectedTableName: string;
  readonly expectedAmount: number;
  readonly responseValue?: number;
}

function setupMock(opts: MockOptions) {
  const expectedRequest: UpdateItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: "counter" } },
    UpdateExpression: `SET value = value + :amount`,
    ExpressionAttributeValues: { ":amount": { N: `${opts.expectedAmount}` } },
    ConditionExpression: `attribute_exists(value)`,
    ReturnValues: "UPDATED_OLD",
  };
  const mockResponse: UpdateItemCommandOutput = {
    $metadata: {},
    Attributes: !opts.responseValue
      ? undefined
      : {
          value: { N: `${opts.responseValue}` },
        },
  };

  dynamoMock.on(UpdateItemCommand, expectedRequest).resolves(mockResponse);
}
