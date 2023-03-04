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
  ScanCommandInput,
  ScanCommandOutput,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import { mockClient } from "aws-sdk-client-mock";
import { TableClient } from "../../src/target-tf-aws/table.inflight";
import { ColumnType } from "../../src/cloud";

const MOCK_TABLE_NAME = "MyBeautifulTable";
const dynamoMock = mockClient(DynamoDBClient);


describe('inflight table tests', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    dynamoMock.reset();
    process.env = {
      ...OLD_ENV,
      PRIMARY_KEY: "id",
      COLUMNS: `{ "id": ${ColumnType.STRING} }`,
    }
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("insert", async () => {
    // GIVEN
    const row = { id: "test" };
    setupInsertMock({
      expectedTableName: MOCK_TABLE_NAME,
      row: row
    })
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.insert(row as any);
    // THEN
    expect(response).toEqual(undefined);
  });

  test("update", async () => {
    // GIVEN
    const row = { id: "test" };
    setupUpdateMock({
      expectedTableName: MOCK_TABLE_NAME,
      row: row,
      newValue: 123,
      primaryKeyValue: "test",
    })
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.update(row as any);
    // THEN
    expect(response).toEqual(undefined);
  });

  test("delete", async () => {
    // GIVEN
    const key = "test";
    setupDeleteMock({
      expectedTableName: MOCK_TABLE_NAME,
      primaryKeyValue: key,
    })
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.delete(key);
    // THEN
    expect(response).toEqual(undefined);
  });

  test("get", async () => {
    // GIVEN
    const key = "test";
    setupGetMock({
      expectedTableName: MOCK_TABLE_NAME,
      primaryKeyValue: key,
      emptyTable: false,
    })
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.get(key);
    // THEN
    expect(response).toEqual({ id: "test" });
  });

  test("get to a empty table", async () => {
    // GIVEN
    const key = "test";
    setupGetMock({
      expectedTableName: MOCK_TABLE_NAME,
      primaryKeyValue: key,
      emptyTable: true,
    })
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.get(key);
    // THEN
    expect(response).toEqual(null);
  });

  test("get", async () => {
    // GIVEN
    const key = "test";
    setupGetMock({
      expectedTableName: MOCK_TABLE_NAME,
      primaryKeyValue: key,
      emptyTable: false,
    })
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.get(key);
    // THEN
    expect(response).toEqual({ id: "test" });
  });

  test("list", async () => {
    // GIVEN
    setupListMock({
      expectedTableName: MOCK_TABLE_NAME,
      emptyTable: false,
    });
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.list();
    // THEN
    expect(response).toEqual([{ id: "test1" }, { id: "test2" }]);
  });

  test("empty list", async () => {
    // GIVEN
    setupListMock({
      expectedTableName: MOCK_TABLE_NAME,
      emptyTable: true,
    });
    // WHEN
    const client = new TableClient(MOCK_TABLE_NAME);
    const response = await client.list();
    // THEN
    expect(response).toEqual([]);
  });
});

interface MockOptions {
  readonly expectedTableName: string;
  readonly row?: any;
  readonly newValue?: number;
  readonly primaryKeyValue?: string;
  readonly emptyTable?: boolean;
}

function setupInsertMock(opts: MockOptions) {
  const expectedRequest: PutItemCommandInput = {
    TableName: opts.expectedTableName,
    Item: marshall(opts.row),
  };
  const mockResponse: PutItemCommandOutput = {
    $metadata: {},
  };
  dynamoMock.on(PutItemCommand, expectedRequest).resolves(mockResponse);
}

function setupUpdateMock(opts: MockOptions) {
  const expectedRequest: UpdateItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: marshall({ id: opts.primaryKeyValue }),
    UpdateExpression: `SET somenumber = :somenumber`,
    ExpressionAttributeValues: {
      ":somenumber": { N: `${opts.newValue}` },
    }
  };
  const mockResponse: UpdateItemCommandOutput = {
    $metadata: {}
  }
  dynamoMock.on(UpdateItemCommand, expectedRequest).resolves(mockResponse);
}

function setupDeleteMock(opts: MockOptions) {
  const expectedRequest: DeleteItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: marshall({ id: opts.primaryKeyValue }),
  };
  const mockResponse: DeleteItemCommandOutput = {
    $metadata: {},
  };
  dynamoMock.on(DeleteItemCommand, expectedRequest).resolves(mockResponse);
}

function setupGetMock(opts: MockOptions) {
  const expectedRequest: GetItemCommandInput = {
    TableName: opts.expectedTableName,
    Key: { id: { S: opts.primaryKeyValue! } },
  };
  const mockResponse: GetItemCommandOutput = {
    $metadata: {},
  };
  if (!opts.emptyTable) {
    mockResponse["Item"] = { id: { S: `${opts.primaryKeyValue}` } };
  }
  dynamoMock.on(GetItemCommand, expectedRequest).resolves(mockResponse);
}

function setupListMock(opts: MockOptions) {
  const expectedRequest: ScanCommandInput = {
    TableName: opts.expectedTableName,
  }
  const mockResponse: ScanCommandOutput = {
    $metadata: {},
    Count: 0,
    Items: opts.emptyTable
      ? []
      : [{ id: { S: "test1" } }, { id: { S: "test2" } }]
  }
  dynamoMock.on(ScanCommand, expectedRequest).resolves(mockResponse);
}