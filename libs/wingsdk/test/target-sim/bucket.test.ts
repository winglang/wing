import * as cloud from "../../src/cloud";
import { SimApp, Simulator } from "../../src/testing";

test("create a bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  // THEN
  const s = await app.startSimulator();
  expect(s.getResourceConfig("/my_bucket")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_bucket",
    props: {
      public: false,
    },
    type: "wingsdk.cloud.Bucket",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("put and get objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  await s.stop();

  expect(response).toEqual(VALUE);
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Bucket created.",
    "Put (key=greeting.txt).",
    "Get (key=greeting.txt).",
    "wingsdk.cloud.Bucket deleted.",
  ]);
  expect(app.snapshot()).toMatchSnapshot();
});

test("put multiple objects and list all from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
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
  await s.stop();

  expect(response).toEqual([KEY1, KEY2, KEY3]);
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Bucket created.",
    "Put (key=greeting1.txt).",
    "Put (key=greeting2.txt).",
    "Put (key=greeting3.txt).",
    "List (prefix=null).",
    "wingsdk.cloud.Bucket deleted.",
  ]);
  expect(app.snapshot()).toMatchSnapshot();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Bucket created.",
    "Get (key=unknown.txt).",
    "wingsdk.cloud.Bucket deleted.",
  ]);
  expect(s.listTraces()[1].data.status).toEqual("failure");
  expect(app.snapshot()).toMatchSnapshot();
});

function listMessages(s: Simulator) {
  return s.listTraces().map((event) => event.data.message);
}
