import { Redis as IoRedis } from "ioredis";
import { test, expect } from "vitest";
import * as redis from "../../src/redis";
import { SimApp } from "../../src/testing";

test("create a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");

  // THEN
  const s = await app.startSimulator();
  try {
    expect(s.getResourceConfig("/my_redis")).toEqual({
      attrs: {
        handle: expect.any(String),
      },
      path: "root/my_redis",
      props: {},
      type: "wingsdk.redis.Redis",
    });
  } finally {
    await s.stop();
  }
  expect(app.snapshot()).toMatchSnapshot();
});

test("access a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis");

  // THEN
  const s = await app.startSimulator();
  try {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    expect((await client.url()).startsWith("redis://")).toBeTruthy();
    const redisClient = (await client.ioredis()) as IoRedis;
    await redisClient.set("foo", "bar");
    expect(await redisClient.get("foo")).toEqual("bar");
  } finally {
    await s.stop();
  }
  expect(app.snapshot()).toMatchSnapshot();
});
