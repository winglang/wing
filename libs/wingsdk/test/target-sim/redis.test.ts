import { test, expect } from "vitest";
import * as redis from "../../src/redis";
import { SimApp } from "../../src/testing";
import { Redis as IoRedis } from "ioredis";

test("create a Redis resource", async () => {
  // GIVEN
  const app = new SimApp();
  redis.Redis._newRedis(app, "my_redis", { password: "123" });

  // THEN
  const s = await app.startSimulator();
  try {
    expect(s.getResourceConfig("/my_redis")).toEqual({
      attrs: {
        handle: expect.any(String),
      },
      path: "root/my_redis",
      props: {
        password: "123",
      },
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
  redis.Redis._newRedis(app, "my_redis", { password: "123" });

  // THEN
  const s = await app.startSimulator();
  try {
    const client = s.getResource("/my_redis") as redis.IRedisClient;
    const redisClient = (await client.get_c()) as IoRedis;
    await redisClient.set("foo", "bar");
    expect(await redisClient.get("foo")).toEqual("bar");
  } finally {
    await s.stop();
  }
  expect(app.snapshot()).toMatchSnapshot();
});
