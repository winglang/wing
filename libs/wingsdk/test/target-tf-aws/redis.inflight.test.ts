import {
  ElastiCacheClient,
  DescribeCacheClustersCommand,
} from "@aws-sdk/client-elasticache";
import { mockClient } from "aws-sdk-client-mock";
import { test, vi, beforeEach, expect } from "vitest";
import { RedisClient } from "../../src/target-tf-aws/redis.inflight";

beforeEach(() => {
  mockElastiCache.reset();
  fakeRedisClient.items.clear();

  mockElastiCache.on(DescribeCacheClustersCommand).resolves({
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
});

test("can set and get a value", async () => {
  // GIVEN
  const key = "wing";
  const expectedValue = "does redis";

  // WHEN
  const client = new RedisClient("fake-cluster", fakeRedisClient);
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
  const client = new RedisClient("fake-cluster", fakeRedisClient);
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
  const client = new RedisClient("fake-cluster", fakeRedisClient);
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
  const client = new RedisClient("fake-cluster", fakeRedisClient);
  await client.set(key, "does redis");
  await client.del(key);
  const value = await client.get(key);

  // THEN
  expect(value).toBeUndefined();
});

const fakeRedisClient = {
  items: new Map<any, any>(),
  set: (key: string, value: string) => {
    fakeRedisClient.items.set(key, value);
  },
  get: (key: string) => {
    return fakeRedisClient.items.get(key);
  },
  hset: (key: string, field: string, value: string) => {
    fakeRedisClient.items.set(`${key}:${field}`, value);
  },
  hget: (key: string, field: string) => {
    return fakeRedisClient.items.get(`${key}:${field}`);
  },
  sadd: (key: string, value: string) => {
    if (!fakeRedisClient.items.has(key)) {
      const set = new Set<string>();
      set.add(value);
      fakeRedisClient.items.set(key, set);
    }
    const set = fakeRedisClient.items.get(key);
    set.add(value);
  },
  smembers: (key: string) => {
    const set = fakeRedisClient.items.get(key);
    return Array.from(set);
  },
  del: (key: string) => {
    fakeRedisClient.items.delete(key);
  },
};

const mockElastiCache = mockClient(ElastiCacheClient);
