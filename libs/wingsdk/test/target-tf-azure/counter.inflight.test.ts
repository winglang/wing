import {
  GetTableEntityResponse,
  TableClient,
  TableEntityResult,
} from "@azure/data-tables";
import { test, expect, beforeEach, afterEach, vi } from "vitest";
import { CounterClient } from "../../src/shared-azure/counter.inflight";

vi.mock("@azure/data-tables");

type TestPath = "happy" | "sad";
let TEST_PATH: TestPath;

const mockTableClient = new TableClient(
  "https://some-fake-url.com",
  "MOCK_TABLE"
);

// mockTableClient.getEntity = vi.fn((partitionKey, rowKey) => {
//   if (TEST_PATH === "happy") {
//     return Promise.resolve({ partitionKey, rowKey, counterValue: 100 });
//   } else {
//     return Promise.reject(new Error("Entity not found"));
//   }
// });

// mockTableClient.upsertEntity = vi.fn((entity) => {
//   return Promise.resolve();
// });

beforeEach(() => {
  vi.clearAllMocks();
  process.env.dummyKey = "fakeKey";
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.dummyKey;
});

type CounterEntity = {
  partitionKey: string;
  rowKey: string;
  counterValue: number;
};

TableClient.prototype.getEntity = vi
  .fn()
  .mockImplementation((partitionKey, rowKey) => {
    if (TEST_PATH === "happy") {
      return Promise.resolve({
        value: { partitionKey, rowKey, counterValue: 100 }, // Mocked entity
      });
    } else {
      return Promise.reject(new Error("Entity not found"));
    }
  });

// Simplified mock for upsertEntity
TableClient.prototype.upsertEntity = vi.fn().mockResolvedValue({});

test("increment counter value", async () => {
  const client = new CounterClient("dummyAccount", "dummyTable", "dummyKey");
  const result = await client.inc(1, "testKey");

  expect(result).toBe(100);
  expect(TableClient.prototype.getEntity).toHaveBeenCalled();
  expect(TableClient.prototype.upsertEntity).toHaveBeenCalled();
});

// Additional tests for `dec`, `peek`, `set` methods follow...

// test("decrement counter value", async () => {
//   const result = await counterClient.dec(1, "testKey");
//   expect(result).toBe(/* expected value */);
// });

// test("peek at counter value", async () => {
//   const result = await counterClient.peek("testKey");
//   expect(result).toBe();
// });

// test("set counter value", async () => {
//   await counterClient.set(5, "testKey");

//   const result = await counterClient.peek("testKey");
//   expect(result).toBe(5);
// });
