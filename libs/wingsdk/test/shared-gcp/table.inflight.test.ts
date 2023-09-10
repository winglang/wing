import { beforeEach, describe, expect, test } from "vitest";
import { ColumnType } from "../../src/ex";
import { TableClient } from "../../src/shared-gcp/table.inflight";

const MOCK_TABLE_NAME = "MyBeautifulTable";
const PRIMARY_KEY = "id";

describe("inflight table tests", () => {
  let client: TableClient, row: { id?: any; somenumber?: number; }, key: string;
  beforeEach(() => {
    key = "test";
    row = { somenumber: 1 };
    const columns = {
      somenumber: ColumnType.NUMBER,
    };
    client = new TableClient(
      MOCK_TABLE_NAME,
      PRIMARY_KEY,
      JSON.stringify(columns)
    );
  });

  test('insert', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.insert(key, row as any);
    // THEN
    expect(response).toEqual(undefined);
  })
  test('update', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.update(key, row as any);
    // THEN
    expect(response).toEqual(undefined);
  })
  test('delete', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.delete(row.id);
    // THEN
    expect(response).toEqual(undefined);
  })
  test('get to an empty table', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.get(key);
    // THEN
    expect(response).toEqual({});
  })
  test('get', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.get(key);
    // THEN
    expect(response).toEqual({ id: key, somenumber: row.somenumber });
  })
  test('list', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.list();
    // THEN
    expect(response).toEqual([
      { id: "test1", somenumber: 1 },
      { id: "test2", somenumber: 2 },
    ]);
  })
  test('empty list', async () => {
    // GIVEN 
    // TODO(wiktor.zajac) fill tests

    // WHEN
    const response = await client.list();
    // THEN
    expect(response).toEqual([]);
  })
});
