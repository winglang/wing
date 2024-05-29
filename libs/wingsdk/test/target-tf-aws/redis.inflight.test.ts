import {
  ElastiCacheClient,
  DescribeCacheClustersCommand,
} from "@aws-sdk/client-elasticache";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect } from "vitest";
import { RedisClient } from "../../src/target-tf-aws/redis.inflight";

const getMockClient = () =>
  new RedisClient({ $clusterId: "fake-cluster", $connection: new MockRedis() });
mockClient(ElastiCacheClient)
  .on(DescribeCacheClustersCommand)
  .resolves({
    CacheClusters: [
      {
        CacheNodes: [
          {
            Endpoint: {
              Address: "fake-cluster.1234567890.us-east-1.cache.amazonaws.com",
            },
          },
        ],
      },
    ],
  });

test("can set and get a value", async () => {
  // GIVEN
  const key = "wing";
  const expectedValue = "does redis";

  // WHEN
  const client = getMockClient();
  await client.set(key, expectedValue);
  const value = await client.get(key);

  // THEN
  expect(value).toEqual(expectedValue);
});

test("can hset and hget values", async () => {
  // GIVEN
  const key = "wing";
  const field1 = "foo";
  const field2 = "hello";
  const expectedValue1 = "bar";
  const expectedValue2 = "world";

  // WHEN
  const client = getMockClient();
  await client.hset(key, field1, expectedValue1);
  await client.hset(key, field2, expectedValue2);
  const value1 = await client.hget(key, field1);
  const value2 = await client.hget(key, field2);

  // THEN
  expect(value1).toEqual(expectedValue1);
  expect(value2).toEqual(expectedValue2);
});

test("can sadd and smembers values", async () => {
  // GIVEN
  const key = "wing";
  const expectedValues = ["a", "b", "c"];

  // WHEN
  const client = getMockClient();
  await client.sadd(key, "a");
  await client.sadd(key, "b");
  await client.sadd(key, "c");
  const values = (await client.smembers(key)).sort();

  // THEN
  expect(values).toEqual(expectedValues);
});

test("can delete a key", async () => {
  // GIVEN
  const key = "wing";

  // WHEN
  const client = getMockClient();
  await client.set(key, "does redis");
  await client.del(key);
  const value = await client.get(key);

  // THEN
  expect(value).toBeUndefined();
});

class MockRedis {
  public items: Map<string, string | Set<string>> = new Map();

  public set(key: string, value: string) {
    this.items.set(key, value);
  }

  public get(key: string) {
    return this.items.get(key);
  }

  public hset(key: string, field: string, value: string) {
    this.items.set(`${key}:${field}`, value);
  }

  public hget(key: string, field: string) {
    return this.items.get(`${key}:${field}`);
  }

  public sadd(key: string, value: string) {
    if (!this.items.has(key)) {
      const set = new Set<string>();
      this.items.set(key, set);
    }

    const set = this.items.get(key);
    if (set === undefined || typeof set === "string") {
      throw new Error("Not a set");
    }
    set.add(value);
  }

  public smembers(key: string) {
    const set = this.items.get(key);
    if (!set) {
      return [];
    } else if (typeof set === "string") {
      throw new Error("Not a set");
    } else {
      return Array.from(set);
    }
  }

  public del(key: string) {
    this.items.delete(key);
  }
}
