import { TableClient } from "@azure/data-tables";
import { test, expect, beforeEach, afterEach, vi } from "vitest";
import { CounterClient } from "../../src/shared-azure/counter.inflight";

vi.mock("@azure/data-tables");

beforeEach(() => {
  vi.clearAllMocks();
  process.env.dummyKey = "fakeKey";
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.dummyKey;
});

test("increment counter value", async () => {
  const mockedTableClient = vi.mocked(TableClient, true);
  const mockGetEntity = mockedTableClient.prototype.getEntity;
  const mockUpsertEntity = mockedTableClient.prototype.upsertEntity;

  const client = new CounterClient("dummyAccount", "dummyTable", "dummyKey");
  const result = await client.inc(1, "testKey");

  expect(result).toBe(100);
  expect(mockGetEntity).toHaveBeenCalled();
  expect(mockUpsertEntity).toHaveBeenCalled();
});
