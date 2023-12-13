import { Redis as IoRedis } from "ioredis";
import { test, expect } from "vitest";
import * as ex from "../../src/ex";
import { SimApp } from "../sim-app";

test("create a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  new ex.Redis(app, "my_redis");

  // THEN
  await app._withSimulator(async (s) => {
    expect(s.getResourceConfig("/my_redis")).toEqual({
      attrs: {
        handle: expect.any(String),
      },
      path: "root/my_redis",
      props: {},
      type: ex.REDIS_FQN,
    });
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("can set and get a value", async () => {
  // GIVEN
  const app = new SimApp();
  new ex.Redis(app, "my_redis");
  const key = "wing";
  const expectedValue = "does redis";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as ex.IRedisClient;
    await client.set(key, expectedValue);
    const value = await client.get(key);
    expect(value).toEqual(expectedValue);
  });
});

test("can hset and hget values", async () => {
  // GIVEN
  const app = new SimApp();
  new ex.Redis(app, "my_redis");
  const key = "wing";
  const field = "secret_message";
  const expectedValue = "does redis";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as ex.IRedisClient;
    await client.hset(key, field, expectedValue);
    const value = await client.hget(key, field);
    expect(value).toEqual(expectedValue);
  });
});

test("can sadd and smembers values", async () => {
  // GIVEN
  const app = new SimApp();
  new ex.Redis(app, "my_redis");
  const key = "wing";
  const expectedValues = ["a", "b", "c"];

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as ex.IRedisClient;
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
  const r = new ex.Redis(app, "my_redis");
  const key = "wing";
  const expectedValue = "does redis";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as ex.IRedisClient;
    await client.set(key, expectedValue);
    const recordsDeleted = await client.del(key);
    const value = await client.get(key);
    expect(recordsDeleted).toEqual(1);
    expect(value).toBeUndefined();
  });
});

test("return empty array when smembers on a non-existent key", async () => {
  // GIVEN
  const app = new SimApp();
  new ex.Redis(app, "my_redis");
  const key = "wing";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as ex.IRedisClient;
    const value = await client.smembers(key);
    expect(value).toEqual([]);
  });
});

test("get a value that does not exist", async () => {
  // GIVEN
  const app = new SimApp();
  new ex.Redis(app, "my_redis");
  const key = "wing";

  // THEN
  await app._withSimulator(async (s) => {
    const client = s.getResource("/my_redis") as ex.IRedisClient;
    const value = await client.get(key);
    expect(value).toBeUndefined();
  });
});
