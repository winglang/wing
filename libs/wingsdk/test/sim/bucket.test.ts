import * as cloud from "../../src/cloud";
import { IBucketClient } from "../../src/sim";
import { SimApp } from "./util";

test("create a bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  // THEN
  const s = await app.startSimulator();
  expect(s.getAttributes("root/my_bucket")).toEqual({
    handle: expect.any(String),
  });
  expect(s.getProps("root/my_bucket")).toEqual({
    public: false,
  });
  await s.stop();

  expect(s.tree).toMatchSnapshot();
});

test("put and get objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResourceByPath("root/my_bucket") as IBucketClient;

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
  await s.stop();

  expect(s.tree).toMatchSnapshot();
});

test("put multiple objects and list all from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResourceByPath("root/my_bucket") as IBucketClient;
  const KEY1 = "greeting1.txt";
  const KEY2 = "greeting2.txt";
  const KEY3 = "greeting3.txt";
  const VALUE1 = JSON.stringify({ msg: "Hello world!" });
  const VALUE2 = JSON.stringify({ msg: "Hello world again!" });
  const VALUE3 = JSON.stringify({ msg: "Hello world again!" });

  // WHEN
  await client.put(KEY1, VALUE1);
  await client.put(KEY2, VALUE2);
  await client.put(KEY3, VALUE3);
  const response = await client.list();

  // THEN
  expect(response).toEqual([KEY1, KEY2, KEY3]);
  await s.stop();

  expect(s.tree).toMatchSnapshot();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResourceByPath("root/my_bucket") as IBucketClient;

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.stop();

  expect(s.tree).toMatchSnapshot();
});
