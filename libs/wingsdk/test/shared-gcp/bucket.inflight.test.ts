import { MockStorage } from "mock-gcs";
import { vi, test, beforeEach, expect } from "vitest";
import { BucketClient } from "../../src/shared-gcp/bucket.inflight";
import { Duration } from "../../src/std";

vi.mock("@google-cloud/storage", () => ({
  Storage: MockStorage,
}));

beforeEach(() => {
  vi.resetAllMocks;
});

test("put object to bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.put(KEY, VALUE);

  expect(res).toBe(undefined);
});

test("putJson an object into the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = { cool: "beans" };

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.putJson(KEY, VALUE as any);

  expect(res).toBe(undefined);
});

test("get an object from bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const data = await client.get(KEY);

  expect(data).toBe(VALUE);
});

test("get a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);

  await expect(() => client.get(NON_EXISTENT_KEY)).rejects.toThrowError(
    `Failed to get object. (key=${NON_EXISTENT_KEY})`
  );
});

test("getJson an object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = { cool: "beans" };

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, JSON.stringify(VALUE));

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.getJson(KEY);

  expect(res).toEqual(VALUE);
});

test("list objects in bucket", async () => {
  const BUCKET_NAME = "test-bucket";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put("test-file-1", "test-content-1");
  await storage.bucket(BUCKET_NAME).put("test-file-2", "test-content-2");
  await storage.bucket(BUCKET_NAME).put("test-file-3", "test-content-3");

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.list();

  expect(res).toEqual(["test-file-1", "test-file-2", "test-file-3"]);
});

test("delete object from bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.delete(KEY);

  expect(res).toBe(undefined);
});

test("delete object from the bucket with mustExist option", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);

  await expect(() =>
    client.delete(NON_EXISTENT_KEY, { mustExist: true })
  ).rejects.toThrowError(`Failed to delete object. (key=${NON_EXISTENT_KEY})`);
});

test("delete a non-existent object from the bucket with mustExist option", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);

  await expect(() =>
    client.delete(NON_EXISTENT_KEY, { mustExist: true })
  ).rejects.toThrowError(`Failed to delete object. (key=${NON_EXISTENT_KEY})`);
});

test("Given a non public bucket when reaching to a key public url it should throw an error", async () => {
  const BUCKET_NAME = "test-bucket";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);

  await expect(() => client.publicUrl("test-file-1")).rejects.toThrowError(
    "Cannot provide public URL for a non-public bucket"
  );
});

test("Given a public bucket when reaching to a non existent key, public url it should throw an error", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, true, storage as any);

  await expect(() => client.publicUrl(KEY)).rejects.toThrowError(
    `Failed to get public URL. (key=${KEY})`
  );
});

test("Given a public bucket, when giving one of its keys, we should get its public url", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, true, storage as any);
  const res = await client.publicUrl(KEY);

  expect(res).toEqual(`https://storage.googleapis.com/${BUCKET_NAME}/${KEY}`);
});

test("check that an object exists in the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.exists(KEY);

  expect(res).toBe(true);
});

test("check that an object doesn't exist in the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.exists(KEY);

  expect(res).toBe(false);
});

test("tryGet an existing object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.tryGet(KEY);

  expect(res).toBe(VALUE);
});

test("tryGet a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "test-file-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.tryGet(NON_EXISTENT_KEY);

  expect(res).toBe(undefined);
});

test("tryGetJson an existing object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = { cool: "beans" };

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, JSON.stringify(VALUE));

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.tryGetJson(KEY);

  expect(res).toEqual(VALUE);
});

test("tryGetJson a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.tryGetJson(NON_EXISTENT_KEY);

  expect(res).toBe(undefined);
});

test("tryGetJson an existing non-Json object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const NON_JSON_VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, NON_JSON_VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);

  await expect(() => client.tryGetJson(KEY)).rejects.toThrowError(
    `Failed to tryGet JSON object. (key=${KEY})`
  );
});

test("tryDelete an existing object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.tryDelete(KEY);

  expect(res).toBe(true);
});

test("tryDelete a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.tryDelete(NON_EXISTENT_KEY);

  expect(res).toBe(false);
});

test("Given a bucket, when giving one of its keys, we should get its signed url", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  const res = await client.signedUrl(KEY, {
    duration: Duration.fromSeconds(86400),
  });
  expect(res).toBe(
    `https://storage.googleapis.com/${BUCKET_NAME}/${KEY}?X-Goog-Algorithm=MOCKED`
  );
});

test("Given a bucket when reaching to a non existent key, signed url it should throw an error", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, false, storage as any);
  await expect(() => client.signedUrl(NON_EXISTENT_KEY)).rejects.toThrowError(
    `Failed to get signed URL. (key=${NON_EXISTENT_KEY})`
  );
});
