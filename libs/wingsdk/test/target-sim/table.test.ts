import { test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { ITableClient } from "../../src/cloud";
import { SimApp } from "../../src/testing";

test("create a table", async () => {
  // GIVEN
  const app = new SimApp();
  const t = cloud.Table._newTable(app, "my_table", {
    name: "new_table",
    columns: {
      name: cloud.ColumnType.STRING,
      age: cloud.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });

  const s = await app.startSimulator();
  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "new_table",
      columns: {
        name: cloud.ColumnType.STRING,
        age: cloud.ColumnType.NUMBER,
      },
      primaryKey: "id",
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("insert row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = cloud.Table._newTable(app, "my_table", {
    name: "my_insert_table",
    columns: {
      name: cloud.ColumnType.STRING,
      age: cloud.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ITableClient;

  await client.insert({ id: "joe-id", name: "Joe Doe", age: 50 } as any);

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_insert_table",
      columns: {
        name: cloud.ColumnType.STRING,
        age: cloud.ColumnType.NUMBER,
      },
      primaryKey: "id",
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Table created.",
    "insert row joe-id into the table my_insert_table.",
    "wingsdk.cloud.Table deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);

  expect(app.snapshot()).toMatchSnapshot();
});

test("get row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = cloud.Table._newTable(app, "my_table", {
    name: "my_get_table",
    columns: {
      name: cloud.ColumnType.STRING,
      age: cloud.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ITableClient;

  await client.insert({ id: "joe-id", name: "Joe Doe", age: 50 } as any);
  const joe = await client.get("joe-id");
  expect(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_get_table",
      columns: {
        name: cloud.ColumnType.STRING,
        age: cloud.ColumnType.NUMBER,
      },
      primaryKey: "id",
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Table created.",
    "insert row joe-id into the table my_get_table.",
    "get row joe-id from table my_get_table.",
    "wingsdk.cloud.Table deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);

  expect(app.snapshot()).toMatchSnapshot();
});

test("update row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = cloud.Table._newTable(app, "my_table", {
    name: "my_update_table",
    columns: {
      name: cloud.ColumnType.STRING,
      age: cloud.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ITableClient;

  await client.insert({ id: "joe-id", name: "Joe Doe", age: 50 } as any);
  let joe = await client.get("joe-id");
  expect(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
  await client.update({ id: "joe-id", age: 51 } as any);
  joe = await client.get("joe-id");
  expect(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 51 });

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_update_table",
      columns: {
        name: cloud.ColumnType.STRING,
        age: cloud.ColumnType.NUMBER,
      },
      primaryKey: "id",
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Table created.",
    "insert row joe-id into the table my_update_table.",
    "get row joe-id from table my_update_table.",
    "get row joe-id from table my_update_table.",
    "update row joe-id in table my_update_table.",
    "get row joe-id from table my_update_table.",
    "wingsdk.cloud.Table deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);

  expect(app.snapshot()).toMatchSnapshot();
});

test("list table", async () => {
  // GIVEN
  const app = new SimApp();
  const t = cloud.Table._newTable(app, "my_table", {
    name: "my_list_table",
    columns: {
      name: cloud.ColumnType.STRING,
      age: cloud.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ITableClient;

  await client.insert({ id: "joe-id", name: "Joe Doe", age: 50 } as any);
  await client.insert({ id: "jane-id", name: "Jane Doe", age: 45 } as any);
  const list = await client.list();
  expect(list[0]).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
  expect(list[1]).toEqual({ id: "jane-id", name: "Jane Doe", age: 45 });

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_list_table",
      columns: {
        name: cloud.ColumnType.STRING,
        age: cloud.ColumnType.NUMBER,
      },
      primaryKey: "id",
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Table created.",
    "insert row joe-id into the table my_list_table.",
    "insert row jane-id into the table my_list_table.",
    "list all rows from table my_list_table.",
    "wingsdk.cloud.Table deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);

  expect(app.snapshot()).toMatchSnapshot();
});
