import { Construct } from "constructs";
import { vi, test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { BucketEventType, IBucketEventHandler } from "../../src/cloud";
import { Inflight, NodeJsCode } from "../../src/core";
import { SimApp } from "../sim-app";

class InflightBucketEventHandler
  extends Inflight
  implements IBucketEventHandler
{
  constructor(scope: Construct, id: string) {
    super(scope, id, { code: NodeJsCode.fromInline("null") });
  }
}

test("create a bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

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
      topics: {},
    },
    type: "wingsdk.cloud.Bucket",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("put json objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "greeting.json";
  const VALUE = { msg: "Hello world!" };

  // WHEN

  const notifyListeners = vi.spyOn(client as any, "notifyListeners");
  await client.putJson(KEY, VALUE as any);
  const response = await client.getJson("greeting.json");

  // THEN
  await s.stop();

  expect(response).toEqual(VALUE);
  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
  expect(notifyListeners).toBeCalledWith(cloud.BucketEventType.CREATE, KEY);
});

test("update an object in bucket", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  const testInflight = new InflightBucketEventHandler(app, "inflight_test");
  bucket.onCreate(testInflight);

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  // @ts-expect-error - private method
  const notifyListeners = vi.spyOn(client, "notifyListeners");

  await client.put(KEY, VALUE);
  expect(notifyListeners).toBeCalledWith(cloud.BucketEventType.CREATE, KEY);

  await client.put(KEY, JSON.stringify({ msg: "another msg" }));
  expect(notifyListeners).toBeCalledWith(cloud.BucketEventType.UPDATE, KEY);
  expect(Object.keys((client as any).topicHandlers)).toMatchObject([
    BucketEventType.CREATE,
  ]);

  // THEN
  await s.stop();
  expect(notifyListeners).toBeCalledTimes(2);
  expect(listMessages(s)).toMatchSnapshot();
});

test("bucket on event creates 3 topics ", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  const testInflight = new InflightBucketEventHandler(app, "inflight_test");
  bucket.onEvent(testInflight);

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  expect(Object.keys((client as any).topicHandlers)).toMatchObject([
    BucketEventType.CREATE,
    BucketEventType.UPDATE,
    BucketEventType.DELETE,
  ]);

  // THEN
  await s.stop();
  expect(listMessages(s)).toMatchSnapshot();
});

test("put multiple json objects and list all from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  const KEY1 = "greeting1.json";
  const KEY2 = "greeting2.json";
  const KEY3 = "greeting3.json";
  const VALUE1 = { msg: "Hello world!" };
  const VALUE2 = { msg: "Hello world again!" };
  const VALUE3 = { msg: "Hello world again!" };

  // WHEN
  await client.putJson(KEY1, VALUE1 as any);
  await client.putJson(KEY2, VALUE2 as any);
  await client.putJson(KEY3, VALUE3 as any);
  const response = await client.list();

  // THEN
  await s.stop();

  expect(response).toEqual([KEY1, KEY2, KEY3]);
  expect(listMessages(s)).toMatchSnapshot();
});

test("put and get objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

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
  expect(listMessages(s)).toMatchSnapshot();
});

test("put multiple objects and list all from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

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

test("list respects prefixes", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  const ROOT_DIR = "path";
  const DIR1 = "dir1";
  const DIR2 = "dir2";
  const filename1 = "file1.txt";
  const filename2 = "file2.txt";
  const KEY1 = `${ROOT_DIR}/${DIR1}/${filename1}`;
  const KEY2 = `${ROOT_DIR}/${DIR2}/${filename2}`;
  const VALUE1 = JSON.stringify({ msg: "Hello world!" });
  const VALUE2 = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY1, VALUE1);
  await client.put(KEY2, VALUE2);
  const responseRoot = await client.list();
  const responsePath = await client.list(ROOT_DIR);
  const responseDir1 = await client.list(`${ROOT_DIR}/${DIR1}`);
  const responseDir2 = await client.list(`${ROOT_DIR}/${DIR2}`);

  // THEN
  await s.stop();

  expect(responseRoot).toEqual([KEY1, KEY2]);
  expect(responsePath).toEqual([KEY1, KEY2]);
  expect(responseDir1).toEqual([KEY1]);
  expect(responseDir2).toEqual([KEY2]);
  expect(listMessages(s)).toMatchSnapshot();
});

test("objects can have keys that look like directories", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  // WHEN
  const KEY1 = "foo";
  const KEY2 = "foo/";
  const KEY3 = "foo/bar";
  const KEY4 = "foo/bar/";
  const KEY5 = "foo/bar/baz";
  await client.put(KEY1, "text");
  await client.put(KEY2, "text");
  await client.put(KEY3, "text");
  await client.put(KEY4, "text");
  await client.put(KEY5, "text");
  const response = await client.list();
  const responseFoo = await client.list(KEY1);
  const responseFooSlash = await client.list(KEY2);
  const responseFooBar = await client.list(KEY3);
  const responseFooBarSlash = await client.list(KEY4);
  const responseFooBarBaz = await client.list(KEY5);

  // THEN
  await s.stop();

  expect(response).toEqual([KEY1, KEY2, KEY3, KEY4, KEY5]);
  expect(responseFoo).toEqual([KEY1, KEY2, KEY3, KEY4, KEY5]);
  expect(responseFooSlash).toEqual([KEY2, KEY3, KEY4, KEY5]);
  expect(responseFooBar).toEqual([KEY3, KEY4, KEY5]);
  expect(responseFooBarSlash).toEqual([KEY4, KEY5]);
  expect(responseFooBarBaz).toEqual([KEY5]);
  expect(listMessages(s)).toMatchSnapshot();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(s.listTraces()[2].data.status).toEqual("failure");
  expect(app.snapshot()).toMatchSnapshot();
});

test("remove object from a bucket with mustExist as option", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();

  cloud.Bucket._newBucket(app, bucketName);

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
});

test("removing a key will call onDelete method", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();

  const bucket = cloud.Bucket._newBucket(app, bucketName);
  const testInflight = new InflightBucketEventHandler(app, "inflight_test");
  bucket.onDelete(testInflight);

  const s = await app.startSimulator();

  const client = s.getResource(`/${bucketName}`) as cloud.IBucketClient;

  // THEN

  // create file
  await client.put(fileName, JSON.stringify({ msg: "Hello world!" }));

  // delete file
  //@ts-expect-error
  const notifyListeners = vi.spyOn(client, "notifyListeners");
  const response = await client.delete(fileName);

  expect(Object.keys((client as any).topicHandlers)).toMatchObject([
    BucketEventType.DELETE,
  ]);

  await s.stop();

  expect(notifyListeners).toBeCalledWith(
    cloud.BucketEventType.DELETE,
    fileName
  );
  expect(response).toEqual(undefined);
  expect(listMessages(s)).toMatchSnapshot();
});

test("remove object from a bucket", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, bucketName);

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
});

test("remove non-existent object from a bucket", async () => {
  const bucketName = "my_bucket";
  const fileName = "unknown.txt";

  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, bucketName);

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
  cloud.Bucket._newBucket(app, bucketName);

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
  cloud.Bucket._newBucket(app, "my_bucket");

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
  cloud.Bucket._newBucket(app, "my_bucket");

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
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
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
  expect(app.snapshot()).toMatchSnapshot();
});

test("Given a non public bucket when reaching to a key public url it should throw an error", async () => {
  //GIVEN
  let error;
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";

  // WHEN
  try {
    await client.publicUrl(KEY);
  } catch (err) {
    error = err;
  }

  // THEN
  expect(error?.message).toBe(
    "Cannot provide public url for a non-public bucket"
  );
  await s.stop();
});

test("Given a public bucket when reaching to a non existent key, public url it should throw an error", async () => {
  //GIVEN
  let error;
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket", { public: true });

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";

  // WHEN
  try {
    await client.publicUrl(KEY);
  } catch (err) {
    error = err;
  }

  expect(error?.message).toBe(
    "Cannot provide public url for an non-existent key (key=KEY)"
  );
  // THEN
  await s.stop();
});

test("Given a public bucket, when giving one of its keys, we should get it's public url", async () => {
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket", { public: true });

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.publicUrl(KEY);

  // THEN
  await s.stop();
  expect(response).toEqual(
    // @ts-expect-error (reaching into private property)
    `${client.fileDir}/${KEY}`
  );
});
