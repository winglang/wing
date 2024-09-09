import * as azureDataTables from "@azure/data-tables";
import { test, expect, vi, describe } from "vitest";
import { CounterClient } from "../../src/shared-azure/counter.inflight";

// @ts-expect-error - un-matching spy argument types
vi.spyOn(azureDataTables, "TableClient").mockImplementation(() => {
  const counter = {};
  return {
    getEntity: vi.fn((partitionKey, rowKey) => {
      return Promise.resolve({
        partitionKey,
        rowKey,
        counterValue: counter[rowKey],
      });
    }),
    upsertEntity: vi.fn(
      (entity: {
        partitionKey: string;
        rowKey: string;
        counterValue: string;
      }) => {
        counter[entity.rowKey] = entity.counterValue;
        return Promise.resolve();
      }
    ),
  };
});

vi.stubEnv("dummyKey", "value");

describe("no initial value", async () => {
  test("increment- no key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
    });

    expect(await client.inc()).toBe(0);
    expect(await client.inc(2)).toBe(1);
    expect(await client.inc(-1)).toBe(3);
    expect(await client.inc(0)).toBe(2);
  });

  test("increment- with a key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
    });

    expect(await client.inc(2, "testKey")).toBe(0);
    expect(await client.inc(-1, "testKey")).toBe(2);
    expect(await client.inc(0, "testKey")).toBe(1);
  });

  test("decrement - no key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
    });

    expect(await client.dec()).toBe(0);
    expect(await client.dec(2)).toBe(-1);
    expect(await client.dec(-1)).toBe(-3);
    expect(await client.dec(0)).toBe(-2);
  });

  test("decrement - with a key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
    });

    expect(await client.dec(2, "testKey")).toBe(0);
    expect(await client.dec(-1, "testKey")).toBe(-2);
    expect(await client.dec(0, "testKey")).toBe(-1);
  });

  test("peeking", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
    });

    expect(await client.peek()).toBe(0);
    expect(await client.peek("testKey")).toBe(0);

    await client.dec(2, "testKey");
    await client.inc(2);

    expect(await client.peek()).toBe(2);
    expect(await client.peek("testKey")).toBe(-2);
  });

  test("setting", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
    });

    expect(await client.set(150)).toBe(undefined);
    expect(await client.peek()).toBe(150);

    expect(await client.set(-15, "testKey")).toBe(undefined);
    expect(await client.peek("testKey")).toBe(-15);
  });
});

describe("positive initial value", async () => {
  test("increment- no key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: 10,
    });

    expect(await client.inc()).toBe(10);
    expect(await client.inc(2)).toBe(11);
    expect(await client.inc(-10)).toBe(13);
    expect(await client.inc(0)).toBe(3);
  });

  test("increment- with a key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: 10,
    });

    expect(await client.inc(2, "testKey")).toBe(10);
    expect(await client.inc(-1, "testKey")).toBe(12);
    expect(await client.inc(0, "testKey")).toBe(11);
  });

  test("decrement - no key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: 10,
    });

    expect(await client.dec()).toBe(10);
    expect(await client.dec(2)).toBe(9);
    expect(await client.dec(-1)).toBe(7);
    expect(await client.dec(0)).toBe(8);
  });

  test("decrement - with a key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: 10,
    });

    expect(await client.dec(2, "testKey")).toBe(10);
    expect(await client.dec(-1, "testKey")).toBe(8);
    expect(await client.dec(0, "testKey")).toBe(9);
  });

  test("peeking", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: 10,
    });

    expect(await client.peek()).toBe(10);
    expect(await client.peek("testKey")).toBe(10);

    await client.dec(20, "testKey");
    await client.inc(20);

    expect(await client.peek()).toBe(30);
    expect(await client.peek("testKey")).toBe(-10);
  });

  test("setting", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: 10,
    });

    expect(await client.set(150)).toBe(undefined);
    expect(await client.peek()).toBe(150);

    expect(await client.set(-15, "testKey")).toBe(undefined);
    expect(await client.peek("testKey")).toBe(-15);
  });
});

describe("negative initial value", async () => {
  test("increment- no key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: -5,
    });

    expect(await client.inc()).toBe(-5);
    expect(await client.inc(2)).toBe(-4);
    expect(await client.inc(-1)).toBe(-2);
    expect(await client.inc(0)).toBe(-3);
  });

  test("increment- with a key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: -5,
    });

    expect(await client.inc(2, "testKey")).toBe(-5);
    expect(await client.inc(-1, "testKey")).toBe(-3);
    expect(await client.inc(0, "testKey")).toBe(-4);
  });

  test("decrement - no key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: -5,
    });

    expect(await client.dec()).toBe(-5);
    expect(await client.dec(2)).toBe(-6);
    expect(await client.dec(-1)).toBe(-8);
    expect(await client.dec(0)).toBe(-7);
  });

  test("decrement - with a key", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: -5,
    });

    expect(await client.dec(2, "testKey")).toBe(-5);
    expect(await client.dec(-1, "testKey")).toBe(-7);
    expect(await client.dec(0, "testKey")).toBe(-6);
  });

  test("peeking", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: -5,
    });

    expect(await client.peek()).toBe(-5);
    expect(await client.peek("testKey")).toBe(-5);

    await client.dec(2, "testKey");
    await client.inc(20);

    expect(await client.peek()).toBe(15);
    expect(await client.peek("testKey")).toBe(-7);
  });

  test("setting", async () => {
    const client = new CounterClient({
      $storageAccountName: "dummyAccount",
      $storageTableName: "dummyTable",
      $accountKeyVariable: "dummyKey",
      $initial: -5,
    });

    expect(await client.set(150)).toBe(undefined);
    expect(await client.peek()).toBe(150);

    expect(await client.set(-15, "testKey")).toBe(undefined);
    expect(await client.peek("testKey")).toBe(-15);
  });
});
