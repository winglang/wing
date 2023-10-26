import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as ex from "../../src/ex";
import { SimApp } from "../sim-app";

test("create a table", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "create_table", {
    name: "new_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });

  const s = await app.startSimulator();
  expect(s.getResourceConfig("/create_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/create_table",
    props: {
      name: "new_table",
      attributeDefinitions: {
        id: "S",
      },
      hashKey: "id",
    },
    type: ex.DYNAMODB_TABLE_FQN,
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("put item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "put_table", {
    name: "my_insert_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/put_table") as ex.IDynamodbTableClient;

  const expectedValue = { id: "1", name: "Joe Doe", age: 50 };
  await client.putItem({ item: expectedValue as any });
  const result = await client.getItem({ key: { id: "1" } as any });
  expect(result.item).toEqual(expectedValue);

  expect(s.getResourceConfig("/put_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/put_table",
    props: {
      name: "my_insert_table",
      attributeDefinitions: {
        id: "S",
      },
      hashKey: "id",
    },
    type: ex.DYNAMODB_TABLE_FQN,
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("get item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "get_table", {
    name: "my_get_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/get_table") as ex.IDynamodbTableClient;

  const expectedValue = { id: "1", name: "Joe Doe", age: 50 };
  await client.putItem({ item: expectedValue as any });
  const joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toEqual(expectedValue);

  expect(s.getResourceConfig("/get_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/get_table",
    props: {
      name: "my_get_table",
      attributeDefinitions: {
        id: "S",
      },
      hashKey: "id",
    },
    type: ex.DYNAMODB_TABLE_FQN,
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("update item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "update_table", {
    name: "my_update_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/update_table") as ex.IDynamodbTableClient;

  const expectedValue = { id: "1", name: "Joe Doe", age: 50 };
  await client.putItem({ item: expectedValue as any });
  let joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toEqual(expectedValue);
  await client.updateItem({
    key: { id: "1" } as any,
    updateExpression: "set age = :age",
    expressionAttributeValues: { ":age": 51 } as any,
  });
  joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toEqual({ id: "1", name: "Joe Doe", age: 51 });

  expect(s.getResourceConfig("/update_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/update_table",
    props: {
      name: "my_update_table",
      attributeDefinitions: {
        id: "S",
      },
      hashKey: "id",
    },
    type: ex.DYNAMODB_TABLE_FQN,
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("inserting the same id twice", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "put_twice_table", {
    name: "my_insert_twice_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/put_twice_table") as ex.IDynamodbTableClient;

  await client.putItem({ item: { id: "1", name: "Joe Doe" } as any });
  let joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toEqual({ id: "1", name: "Joe Doe" });

  await client.putItem({ item: { id: "1", name: "Joe Doe II" } as any });
  joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toEqual({ id: "1", name: "Joe Doe II" });

  await expect(() =>
    client.putItem({
      item: { id: "1", name: "Joe Doe III" } as any,
      conditionExpression: "attribute_not_exists(id)",
    })
  ).rejects.toThrow(/The conditional request failed/);

  await s.stop();
});

test("update non-existent item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(
    app,
    "update_non_existing_table",
    {
      name: "my_update_non_existent_table",
      attributeDefinitions: { id: "S" } as any,
      hashKey: "id",
    }
  );
  const s = await app.startSimulator();
  const client = s.getResource(
    "/update_non_existing_table"
  ) as ex.IDynamodbTableClient;

  await client.updateItem({
    key: { id: "1" } as any,
    updateExpression: "set age = :age",
    expressionAttributeValues: { ":age": 50 } as any,
  });
  const joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toEqual({ id: "1", age: 50 });

  await s.stop();
});

test("delete item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "delete_table", {
    name: "my_delete_non_existent_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/delete_table") as ex.IDynamodbTableClient;

  await client.putItem({ item: { id: "1", age: 50 } as any });
  await client.deleteItem({ key: { id: "1" } as any });
  let joe = await client.getItem({ key: { id: "1" } as any });
  expect(joe.item).toBeUndefined();

  // will not throw
  await client.deleteItem({ key: { id: "1" } as any });

  await s.stop();
});

test("scan", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "scan_table", {
    name: "scan_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/scan_table") as ex.IDynamodbTableClient;

  await client.putItem({ item: { id: "1", age: 50 } as any });
  await client.putItem({ item: { id: "2", loc: "US" } as any });
  const result = await client.scan();
  expect(result.items).toEqual([
    { id: "1", age: 50 },
    { id: "2", loc: "US" },
  ]);

  await s.stop();
});

test("query", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "query_table", {
    name: "query_table",
    attributeDefinitions: { id: "S", age: "N" } as any,
    hashKey: "id",
    rangeKey: "age",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/query_table") as ex.IDynamodbTableClient;

  await client.putItem({ item: { id: "1", age: 2 } as any });
  await client.putItem({ item: { id: "1", age: 1 } as any });
  await client.putItem({ item: { id: "2", age: 3 } as any });
  await client.putItem({ item: { id: "2", age: 1 } as any });
  {
    const result = await client.query({
      keyConditionExpression: "id = :id",
      expressionAttributeValues: { ":id": "1" } as any,
    });
    expect(result.items).toEqual([
      { id: "1", age: 1 },
      { id: "1", age: 2 },
    ]);
  }
  {
    const result = await client.query({
      keyConditionExpression: "id = :id",
      expressionAttributeValues: { ":id": "2" } as any,
    });
    expect(result.items).toEqual([
      { id: "2", age: 1 },
      { id: "2", age: 3 },
    ]);
  }

  await s.stop();
});

test("transact get items", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(
    app,
    "transact_get_items_table",
    {
      name: "transact_get_items_table",
      attributeDefinitions: { id: "S" } as any,
      hashKey: "id",
    }
  );
  const s = await app.startSimulator();
  const client = s.getResource(
    "/transact_get_items_table"
  ) as ex.IDynamodbTableClient;

  // WHEN
  await client.batchWriteItem({
    requestItems: [
      {
        putRequest: {
          item: {
            id: "1",
            age: 50,
          } as any,
        },
      },
      {
        putRequest: {
          item: {
            id: "2",
            age: 80,
          } as any,
        },
      },
    ],
  });

  // THEN
  const { responses } = await client.transactGetItems({
    transactItems: [
      {
        get: {
          key: {
            id: "1",
          } as any,
        },
      },
      {
        get: {
          key: {
            id: "2",
          } as any,
        },
      },
    ],
  });
  expect(responses).toEqual([
    { item: { id: "1", age: 50 } },
    { item: { id: "2", age: 80 } },
  ]);

  await s.stop();
});

test("transact write items", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(
    app,
    "transact_write_items_table",
    {
      name: "transact_write_items_table",
      attributeDefinitions: { id: "S" } as any,
      hashKey: "id",
    }
  );
  const s = await app.startSimulator();
  const client = s.getResource(
    "/transact_write_items_table"
  ) as ex.IDynamodbTableClient;

  await client.putItem({ item: { id: "1", age: 50 } as any });
  await client.putItem({ item: { id: "2", age: 80 } as any });
  await client.transactWriteItems({
    transactItems: [
      {
        put: {
          item: {
            id: "3",
            age: 30,
          } as any,
        },
      },
      {
        update: {
          key: { id: "1" } as any,
          updateExpression: "set age = :age",
          expressionAttributeValues: { ":age": 51 } as any,
        },
      },
      {
        delete: {
          key: { id: "2" } as any,
        },
      },
    ],
  });

  let item1 = await client.getItem({ key: { id: "1" } as any });
  expect(item1.item).toEqual({ id: "1", age: 51 });

  let item2 = await client.getItem({ key: { id: "2" } as any });
  expect(item2.item).toBeUndefined();

  let item3 = await client.getItem({ key: { id: "3" } as any });
  expect(item3.item).toEqual({ id: "3", age: 30 });

  await s.stop();
});

test("batch get item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "batch_get_item_table", {
    name: "batch_get_item_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource(
    "/batch_get_item_table"
  ) as ex.IDynamodbTableClient;

  await client.putItem({ item: { id: "1", age: 50 } as any });
  await client.putItem({ item: { id: "2", age: 80 } as any });

  const { responses } = await client.batchGetItem({
    requestItem: {
      keys: [
        {
          id: "1",
        } as any,
        {
          id: "2",
        } as any,
      ],
    },
  });
  expect(responses).toEqual([
    { id: "1", age: 50 },
    { id: "2", age: 80 },
  ]);

  await s.stop();
});

test("batch write item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.DynamodbTable._newDynamodbTable(app, "batch_write_item_table", {
    name: "batch_write_item_table",
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource(
    "/batch_write_item_table"
  ) as ex.IDynamodbTableClient;

  // WHEN
  await client.batchWriteItem({
    requestItems: [
      {
        putRequest: {
          item: {
            id: "1",
            age: 50,
          } as any,
        },
      },
      {
        putRequest: {
          item: {
            id: "2",
            age: 80,
          } as any,
        },
      },
    ],
  });

  // THEN
  {
    const { responses } = await client.batchGetItem({
      requestItem: {
        keys: [
          {
            id: "1",
          } as any,
          {
            id: "2",
          } as any,
        ],
      },
    });
    expect(responses).toEqual([
      { id: "1", age: 50 },
      { id: "2", age: 80 },
    ]);
  }

  // WHEN
  await client.batchWriteItem({
    requestItems: [
      {
        deleteRequest: {
          key: {
            id: "1",
          } as any,
        },
      },
      {
        deleteRequest: {
          key: {
            id: "2",
          } as any,
        },
      },
    ],
  });

  // THEN
  {
    const { responses } = await client.batchGetItem({
      requestItem: {
        keys: [
          {
            id: "1",
          } as any,
          {
            id: "2",
          } as any,
        ],
      },
    });
    expect(responses).toEqual([]);
  }

  await s.stop();
});
