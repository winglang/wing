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
    initialValue: 0,
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
  setupMock({
    expectedTableName: MOCK_TABLE_NAME,
    expectedAmount: 5,
    initialValue: 0,
    responseValue: 887 + 5,
  });

  // WHEN
  const client = new CounterClient(MOCK_TABLE_NAME);
  const response = await client.inc(5);

  // THEN
  expect(response).toEqual(prevValue); // returns previous value
});

interface MockOptions {
  readonly expectedTableName: string;
  readonly expectedAmount: number;
  readonly initialValue?: number;
  readonly responseValue?: number;
}

function setupMock(opts: MockOptions) {
  const expectedRequest: UpdateItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: "counter" } },
    UpdateExpression: `SET counter_value = if_not_exists(counter_value, :initial_value) + :amount`,
    ExpressionAttributeValues: {
      ":amount": { N: `${opts.expectedAmount}` },
      ":initial_value": { N: `${opts.initialValue}` },
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
