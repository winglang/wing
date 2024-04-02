import { test, expect } from "vitest";
import { Redis, IRedisClient, REDIS_FQN } from "../../src/ex";
import { SimApp } from "../sim-app";

test("create a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");

  // WHEN
  const s = await app.startSimulator();
  const redisResource = s.getResourceConfig("/my_redis");
  await s.stop();

  // THEN
  expect(redisResource).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_redis",
    addr: expect.any(String),
    props: {
      port: expect.any(String),
    },
    type: REDIS_FQN,
  });
  expect(app.snapshot()).toMatchSnapshot();
});

test("can set and get a value", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");
  const key = "wing";
  const expectedValue = "does redis";

  // WHEN
  const s = await app.startSimulator();
  const client = s.getResource("/my_redis") as IRedisClient;
  await client.set(key, expectedValue);
  const value = await client.get(key);
  await s.stop();

  // THEN
  expect(value).toEqual(expectedValue);
});

test("can hset and hget values", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");
  const key = "wing";
  const field = "secret_message";
  const expectedValue = "does redis";

  // WHEN
  const s = await app.startSimulator();
  const client = s.getResource("/my_redis") as IRedisClient;
  await client.hset(key, field, expectedValue);
  const value = await client.hget(key, field);
  await s.stop();

  // THEN
  expect(value).toEqual(expectedValue);
});

test("can sadd and smembers values", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");
  const key = "wing";
  const expectedValues = ["a", "b", "c"];

  // WHEN
  const s = await app.startSimulator();
  const client = s.getResource("/my_redis") as IRedisClient;
  await client.sadd(key, "a");
  await client.sadd(key, "b");
  await client.sadd(key, "c");
  const value = await client.smembers(key);
  await s.stop();

  // THEN
  expect(value.sort()).toEqual(expectedValues);
});

test("can del a value", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");
  const key = "wing";
  const expectedValue = "does redis";

  // WHEN
  const s = await app.startSimulator();
  const client = s.getResource("/my_redis") as IRedisClient;
  await client.set(key, expectedValue);
  const recordsDeleted = await client.del(key);
  const value = await client.get(key);
  await s.stop();

  // THEN
  expect(recordsDeleted).toEqual(1);
  expect(value).toBeUndefined();
});

test("return empty array when smembers on a non-existent key", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");
  const key = "wing";

  // THEN
  const s = await app.startSimulator();
  const client = s.getResource("/my_redis") as IRedisClient;
  const value = await client.smembers(key);
  await s.stop();

  expect(value).toEqual([]);
});

test("get a value that does not exist", async () => {
  // GIVEN
  const app = new SimApp();
  new Redis(app, "my_redis");
  const key = "wing";

  // WHEN
  const s = await app.startSimulator();
  const client = s.getResource("/my_redis") as IRedisClient;
  const value = await client.get(key);
  await s.stop();

  // THEN
  expect(value).toBeUndefined();
});
