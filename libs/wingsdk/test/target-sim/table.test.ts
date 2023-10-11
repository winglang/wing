import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as ex from "../../src/ex";
import { SimApp } from "../sim-app";

test("create a table", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "new_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
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
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {},
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("insert row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_insert_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  await client.insert("joe-id", { name: "Joe Doe", age: 50 } as any);

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_insert_table",
      columns: {
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {},
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("get row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_get_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  const KEY = "joe-id";
  await client.insert(KEY, { name: "Joe Doe", age: 50 } as any);
  const joe = await client.get(KEY);
  expect(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });

  await expect(() => client.get("NON_EXISTENT_KEY")).rejects.toThrowError(
    /Row does not exist/
  );

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_get_table",
      columns: {
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {},
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("tryGet row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_get_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  const KEY = "joe-id";
  await client.insert(KEY, { name: "Joe Doe", age: 50 } as any);
  const joe = await client.tryGet(KEY);
  expect(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });

  const nonExistentRow = await client.tryGet("NON_EXISTENT_KEY");
  expect(nonExistentRow).toEqual(undefined);

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_get_table",
      columns: {
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {},
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("update row", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_update_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  await client.insert("joe-id", { name: "Joe Doe", age: 50 } as any);
  let joe = await client.get("joe-id");
  expect(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
  await client.update("joe-id", { age: 51 } as any);
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
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {},
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("list table", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_list_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  await client.insert("joe-id", { name: "Joe Doe", age: 50 } as any);
  await client.insert("jane-id", { name: "Jane Doe", age: 45 } as any);
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
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {},
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("inserting the same id twice", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_insert_twice_table",
    columns: {
      name: ex.ColumnType.STRING,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  await client.insert("joe-id", { name: "Joe Doe" } as any);
  await expect(() =>
    client.insert("joe-id", { name: "Joe Doe II" } as any)
  ).rejects.toThrow(
    `The primary key "joe-id" already exists in the "my_insert_twice_table" table.`
  );
});

test("update non-existent item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_update_non_existent_table",
    columns: {
      name: ex.ColumnType.STRING,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  await expect(() =>
    client.update("joe-id", { name: "Joe Doe" } as any)
  ).rejects.toThrow(
    `The primary key "joe-id" was not found in the "my_update_non_existent_table" table.`
  );
});

test("deleting non-existent item", async () => {
  // GIVEN
  const app = new SimApp();
  const t = ex.Table._newTable(app, "my_table", {
    name: "my_delete_non_existent_table",
    columns: {
      name: ex.ColumnType.STRING,
    },
    primaryKey: "id",
  });
  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  await expect(() => client.delete("joe-id")).rejects.toThrow(
    `The primary key "joe-id" not found in the "my_delete_non_existent_table" table.`
  );
});

test("can add row in preflight", async () => {
  // GIVEN
  const KEY = "joe-id";
  const ROW = { name: "Joe Doe", age: 50 };

  const app = new SimApp();
  const table = ex.Table._newTable(app, "my_table", {
    name: "my_addrow_table",
    columns: {
      name: ex.ColumnType.STRING,
      age: ex.ColumnType.NUMBER,
    },
    primaryKey: "id",
    initialRows: {},
  });
  table.addRow(KEY, ROW as any);

  const s = await app.startSimulator();
  const client = s.getResource("/my_table") as ex.ITableClient;

  const joe = await client.get("joe-id");
  expect(joe).toEqual({ name: "Joe Doe", age: 50, id: KEY });

  expect(s.getResourceConfig("/my_table")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_table",
    props: {
      name: "my_addrow_table",
      columns: {
        name: ex.ColumnType.STRING,
        age: ex.ColumnType.NUMBER,
      },
      primaryKey: "id",
      initialRows: {
        "joe-id": { name: "Joe Doe", age: 50, id: KEY },
      },
    },
    type: "wingsdk.cloud.Table",
  });
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});
