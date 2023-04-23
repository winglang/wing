import { Redis as IoRedis } from "ioredis";
import { test, expect } from "vitest";
import * as redis from "../../src/redis";
import { SimApp } from "../sim-app";

test("create a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");

  // THEN
  await app._withSimulator(async (s) => {
    expect(s.getResourceConfig("/my_redis")).toEqual({
      attrs: {
        handle: expect.any(String),
      },
      path: "root/my_redis",
      props: {},
      type: "wingsdk.redis.Redis",
    });
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("access a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    expect((await client.url()).startsWith("redis://")).toBeTruthy();
    const redisClient = (await client.rawClient()) as IoRedis;
    await redisClient.set("foo", "bar");
    expect(await redisClient.get("foo")).toEqual("bar");
  });
});

test("can set and get a value", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");
  const key = "wing";
  const expectedValue = "does redis";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    await client.set(key, expectedValue);
    const value = await client.get(key);
    expect(value).toEqual(expectedValue);
  });
});

test("can hset and hget values", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");
  const key = "wing";
  const field = "secret_message";
  const expectedValue = "does redis";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    await client.hset(key, field, expectedValue);
    const value = await client.hget(key, field);
    expect(value).toEqual(expectedValue);
  });
});

test("can sadd and smembers values", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");
  const key = "wing";
  const expectedValues = ["a", "b", "c"];

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    await client.sadd(key, "a");
    await client.sadd(key, "b");
    await client.sadd(key, "c");
    const value = await client.smembers(key);
    expect(value.sort()).toEqual(expectedValues);
  });
});

test("can del a value", async () => {
  // GIVEN
  const app = new SimApp();
  const r = redis.Redis._newRedis(app, "my_redis");
  const key = "wing";
  const expectedValue = "does redis";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    await client.set(key, expectedValue);
    const recordsDeleted = await client.del(key);
    const value = await client.get(key);
    expect(recordsDeleted).toEqual(1);
    expect(value).toEqual(null);
  });
});

test("return empty array when smembers on a non-existent key", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");
  const key = "wing";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    const value = await client.smembers(key);
    expect(value).toEqual([]);
  });
});

test("get a value that does not exist", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");
  const key = "wing";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    const value = await client.get(key);
    expect(value).toEqual(null);
  });
});
