import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { SimApp } from "../../src/testing";

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
      initialObjects: {},
    },
    type: "wingsdk.cloud.Bucket",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("put and get and tryGet objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response1 = await client.get("greeting.txt");
  const response2 = await client.tryGet("greeting.txt");

  // THEN
  await s.stop();

  expect(response1).toEqual(VALUE);
  expect(response2).toEqual(VALUE);
  expect(listMessages(s)).toMatchSnapshot();
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
  expect(listMessages(s)).toMatchSnapshot();
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

  expect(listMessages(s)).toMatchSnapshot();
  expect(s.listTraces()[2].data.status).toEqual("failure");
});

test("tryGet invalid object returns empty", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  // THEN
  const response = await client.tryGet("unknown.txt");
  await s.stop();

  expect(response).toEqual(undefined);
  expect(listMessages(s)).toMatchSnapshot();
});

test("remove object from a bucket with mustExist as option", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, bucketName);

  const s = await app.startSimulator();

  const client = s.getResource(`/${bucketName}`) as cloud.IBucketClient;

  // THEN

  // create file
  await client.put(fileName, JSON.stringify({ msg: "Hello world!" }));

  // delete file
  const response = await client.delete(fileName, { mustExist: true });

  await s.stop();

  expect(response).toEqual(undefined);
  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("remove object from a bucket", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, bucketName);

  const s = await app.startSimulator();

  const client = s.getResource(`/${bucketName}`) as cloud.IBucketClient;

  // THEN

  // create file
  await client.put(fileName, JSON.stringify({ msg: "Hello world!" }));

  // delete file
  const response = await client.delete(fileName);

  await s.stop();

  expect(response).toEqual(undefined);
  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("remove non-existent object from a bucket", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, bucketName);

  const s = await app.startSimulator();

  const client = s.getResource(`/${bucketName}`) as cloud.IBucketClient;

  // THEN
  const response = await client.delete(fileName, { mustExist: false });
  await s.stop();

  expect(response).toEqual(undefined);
});

test("remove non-existent object from a bucket with mustExist option", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, bucketName);

  const s = await app.startSimulator();

  const client = s.getResource(`/${bucketName}`) as cloud.IBucketClient;

  // THEN
  await s.stop();

  await expect(async () =>
    client.delete(fileName, { mustExist: true })
  ).rejects.toThrowError();
});

test("bucket has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  const treeJson = treeJsonOf(app.synth());
  const bucket = app.node.tryFindChild("my_bucket") as cloud.Bucket;

  // THEN
  expect(bucket.display.hidden).toBeUndefined();
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).not.toMatchObject({
    my_bucket: {
      display: {
        hidden: expect.any(Boolean),
      },
    },
  });
});

test("bucket has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Bucket(app, "my_bucket");

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const bucket = app.node.tryFindChild("my_bucket") as cloud.Bucket;

  // THEN
  expect(bucket.display.title).toBeDefined();
  expect(bucket.display.description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_bucket: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});

test("can add object in preflight", async () => {
  // GIVEN
  const KEY = "greeting.txt";
  const VALUE = "Hello world!";

  const app = new SimApp();
  const bucket = new cloud.Bucket(app, "my_bucket");
  bucket.addObject(KEY, VALUE);

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  // WHEN
  await client.get(KEY);
  const getResponse = await client.get("greeting.txt");
  const listResponse = await client.list();

  // THEN
  await s.stop();

  expect(getResponse).toEqual(VALUE);
  expect(listResponse).toEqual([KEY]);
  expect(listMessages(s)).toMatchSnapshot();
});
