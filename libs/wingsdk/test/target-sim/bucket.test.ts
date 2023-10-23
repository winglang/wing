import * as fs from "fs";
import { resolve } from "path";
import * as url from "url";
import { vi, test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { BucketEventType } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Node } from "../../src/std";
import { SimApp } from "../sim-app";

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

test("update an object in bucket", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  const testInflight = Testing.makeHandler(app, "inflight_test", "null");
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

test("bucket on event creates 3 topics, and sends the right event and key in the event handlers ", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  const logBucket = cloud.Bucket._newBucket(app, "log_bucket");
  const testInflight = Testing.makeHandler(
    app,
    "inflight_test",
    `async handle(key, event) { await this.bucket.put(key, event); }`,
    {
      bucket: {
        obj: logBucket,
        ops: [cloud.BucketInflightMethods.PUT],
      },
    }
  );

  bucket.onEvent(testInflight);

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  const logClient = s.getResource("/log_bucket") as cloud.IBucketClient;

  expect(Object.keys((client as any).topicHandlers)).toMatchObject([
    BucketEventType.CREATE,
    BucketEventType.UPDATE,
    BucketEventType.DELETE,
  ]);

  // THEN
  await client.put("a", "1");
  expect(await logClient.get("a")).toBe(BucketEventType.CREATE);
  await client.put("a", "2");
  expect(await logClient.get("a")).toBe(BucketEventType.UPDATE);
  await client.delete("a");
  expect(await logClient.get("a")).toBe(BucketEventType.DELETE);
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

test("put and get object from bucket", async () => {
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

test("put and get metadata of objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  const KEY1 = "file1.main.w";
  const KEY2 = "file2.txt";
  const KEY3 = "file3.txt";
  const VALUE1 = "bring cloud;";
  const VALUE2 = "hello world";
  const VALUE3 = JSON.stringify({ msg: "hello world" });
  const CONTENT_TYPE3 = "application/json";

  // WHEN
  await client.put(KEY1, VALUE1);
  await client.put(KEY2, VALUE2);
  await client.put(KEY3, VALUE3, { contentType: CONTENT_TYPE3 });
  const response1 = await client.metadata("file1.main.w");
  const response2 = await client.metadata("file2.txt");
  const response3 = await client.metadata("file3.txt");

  // THEN
  await s.stop();
  const currentYear = new Date().getFullYear();

  expect(response1.size).toEqual(12);
  expect(response1.contentType).toEqual("application/octet-stream");
  expect(response1.lastModified.year).toEqual(currentYear);
  expect(response2.size).toEqual(11);
  expect(response2.contentType).toEqual("text/plain");
  expect(response2.lastModified.year).toEqual(currentYear);
  expect(response3.size).toEqual(21);
  expect(response3.contentType).toEqual("application/json");
  expect(response3.lastModified.year).toEqual(currentYear);
  expect(listMessages(s)).toMatchSnapshot();
});

test("putJson and get metadata of object from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  const KEY = "json-file.txt";
  const VALUE = "bring cloud;";

  // WHEN
  await client.putJson(KEY, VALUE as any);
  const response = await client.metadata("json-file.txt");

  // THEN
  await s.stop();
  const currentYear = new Date().getFullYear();

  expect(response.size).toEqual(14);
  expect(response.contentType).toEqual("application/json");
  expect(response.lastModified.year).toEqual(currentYear);
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
  await expect(() => client.get("unknown.txt")).rejects.toThrowError(
    /Object does not exist/
  );
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
  const testInflight = Testing.makeHandler(app, "inflight_test", "null");
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
  expect(Node.of(bucket).hidden).toBeUndefined();
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
  expect(Node.of(bucket).title).toBeDefined();
  expect(Node.of(bucket).description).toBeDefined();
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

test("can add file in preflight", async () => {
  // GIVEN
  const FILENAME = "test.txt";
  const PATH = resolve(__dirname, "../test-files/test1.txt");

  const app = new SimApp();
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  bucket.addFile(FILENAME, PATH);

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  // WHEN
  await client.get(FILENAME);
  const getResponse = await client.get(FILENAME);
  const listResponse = await client.list();

  // THEN
  await s.stop();

  expect(getResponse).toEqual(fs.readFileSync(PATH, "utf8"));
  expect(listResponse).toEqual([FILENAME]);
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
  // GIVEN
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
  const filePath = `${client.fileDir}/${KEY}`;
  expect(response).toEqual(url.pathToFileURL(filePath).href);
});

test("check if an object exists in the bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  await client.put(KEY, VALUE);
  const existingObjectExists = await client.exists(KEY);
  const nonExistentObjectExists = await client.exists("NON_EXISTENT_KEY");

  // THEN
  await s.stop();
  expect(existingObjectExists).toBe(true);
  expect(nonExistentObjectExists).toBe(false);
});

test("tryGet objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  await client.put(KEY, VALUE);
  const existingObjectTryGet = await client.tryGet(KEY);
  const nonExistentObjectTryGet = await client.tryGet("NON_EXISTENT_KEY");

  // THEN
  await s.stop();
  expect(existingObjectTryGet).toEqual(VALUE);
  expect(nonExistentObjectTryGet).toEqual(undefined);
});

test("tryGetJson objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  await client.put(KEY, VALUE);
  const existingObjectTryGet = await client.tryGet(KEY);
});

test("tryGetJson an existing non-Json object from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  await client.put(KEY, VALUE);

  // THEN
  // it seems to throw a different error per OS/ node version
  await expect(() => client.tryGetJson(KEY)).rejects.toThrowError();
  await s.stop();
});

test("tryDelete objects from bucket", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Bucket._newBucket(app, "my_bucket");

  const s = await app.startSimulator();
  const client = s.getResource("/my_bucket") as cloud.IBucketClient;

  const KEY1 = "KEY";
  const VALUE1 = "VALUE";
  const KEY2 = "file.json";
  const VALUE2 = { msg: "Hello world!" };

  // WHEN
  await client.put(KEY1, VALUE1);
  await client.putJson(KEY2, VALUE2 as any);
  const existingObject1TryDelete = await client.tryDelete(KEY1);
  const existingObject2TryDelete = await client.tryDelete(KEY2);
  const nonExistentObjectTryDelete = await client.tryDelete("NON_EXISTENT_KEY");

  // THEN
  await s.stop();
  expect(existingObject1TryDelete).toEqual(true);
  expect(existingObject2TryDelete).toEqual(true);
  expect(nonExistentObjectTryDelete).toEqual(false);
});

// Deceided to seperate this feature in a different release,(see https://github.com/winglang/wing/issues/4143)

// test("Given a bucket when reaching to a non existent key, signed url it should throw an error", async () => {
//   //GIVEN
//   let error;
//   const app = new SimApp();
//   cloud.Bucket._newBucket(app, "my_bucket", { public: true });

//   const s = await app.startSimulator();
//   const client = s.getResource("/my_bucket") as cloud.IBucketClient;

//   const KEY = "KEY";

//   // WHEN
//   try {
//     await client.signedUrl(KEY);
//   } catch (err) {
//     error = err;
//   }

//   expect(error?.message).toBe(
//     "Cannot provide signed url for an non-existent key (key=${KEY})"
//   );
//   // THEN
//   await s.stop();
// });

// test("Given a bucket, when giving one of its keys, we should get it's signed url", async () => {
//   // GIVEN
//   const app = new SimApp();
//   cloud.Bucket._newBucket(app, "my_bucket", { public: true });

//   const s = await app.startSimulator();
//   const client = s.getResource("/my_bucket") as cloud.IBucketClient;

//   const KEY = "KEY";
//   const VALUE = "VALUE";

//   // WHEN
//   await client.put(KEY, VALUE);
//   const response = await client.signedUrl(KEY);

//   // THEN
//   await s.stop();
//   const filePath = `${client.fileDir}/${KEY}`;
//   expect(response).toEqual(url.pathToFileURL(filePath).searchParams.append("Expires","86400"));
// });
