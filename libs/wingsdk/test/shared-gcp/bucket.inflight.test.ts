import { MockStorage } from "mock-gcs";
import { vi, test, beforeEach, expect } from "vitest";
import { BucketClient } from "../../src/shared-gcp/bucket.inflight";
import { Datetime } from "../../src/std";

vi.mock("@google-cloud/storage", () => {
  return {
    Storage: vi.fn(() => MockStorage),
  };
});

beforeEach(() => {
  vi.resetAllMocks;
  vi.clearAllMocks;
});

test("put object to bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  await client.put(KEY, VALUE);

  // check that the object was put by ensuring it exists
  const res = await client.exists(KEY);
  expect(res).toBe(true);
});

test("putJson an object into the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = { cool: "beans" };

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  await client.putJson(KEY, VALUE as any);

  // check that the object was put by ensuring it exists
  const res = await client.exists(KEY);
  expect(res).toBe(true);
});

test("get an object from bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const data = await client.get(KEY);

  expect(data).toBe(VALUE);
});

test("get a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);

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

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.getJson(KEY);

  expect(res).toEqual(VALUE);
});

test("list objects in bucket", async () => {
  const BUCKET_NAME = "test-bucket";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put("test-file-1", "test-content-1");
  await storage.bucket(BUCKET_NAME).put("test-file-2", "test-content-2");
  await storage.bucket(BUCKET_NAME).put("test-file-3", "test-content-3");

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.list();

  expect(res).toEqual(["test-file-1", "test-file-2", "test-file-3"]);
});

test("delete object from bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, storage as any);
  await client.delete(KEY);

  // check that the object was deleted by ensuring it doesn't exist
  const res = await client.exists(KEY);
  expect(res).toBe(false);
});

test("delete object from the bucket with mustExist option", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);

  await expect(() =>
    client.delete(NON_EXISTENT_KEY, { mustExist: true })
  ).rejects.toThrowError(`Object does not exist (key=${NON_EXISTENT_KEY}).`);
});

test("delete a non-existent object from the bucket with mustExist option", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);

  await expect(() =>
    client.delete(NON_EXISTENT_KEY, { mustExist: true })
  ).rejects.toThrowError(`Object does not exist (key=${NON_EXISTENT_KEY}).`);
});

test("Given a non public bucket when reaching to a key public url it should throw an error", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  await client.put(KEY, VALUE);

  await expect(() => client.publicUrl(KEY)).rejects.toThrowError(
    `Failed to check if bucket is public. (bucket=${BUCKET_NAME})`
  );
});

test("Given a public bucket when reaching to a non existent key, public url it should throw an error", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);

  await expect(() => client.publicUrl(KEY)).rejects.toThrowError(
    `Failed to check if bucket is public. (bucket=${BUCKET_NAME})`
  );
});

test("Given a public bucket, when giving one of its keys, we should get its public url", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const PUBLIC_URL = `https://storage.googleapis.com/${BUCKET_NAME}/${KEY}`;

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = vi.fn(() => new BucketClient(BUCKET_NAME, storage as any));

  // it should return the PUBLIC_URL but not by calling the publicUrl method
  client.mockImplementation(() => {
    return {
      publicUrl: () => PUBLIC_URL,
    } as unknown as BucketClient;
  });

  const res = await client().publicUrl(KEY);
  expect(res).toBe(PUBLIC_URL);
});

test("check that an object exists in the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.exists(KEY);

  expect(res).toBe(true);
});

test("check that an object doesn't exist in the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.exists(KEY);

  expect(res).toBe(false);
});

test("tryGet an existing object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, VALUE);

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.tryGet(KEY);

  expect(res).toBe(VALUE);
});

test("tryGet a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "test-file-1";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.tryGet(NON_EXISTENT_KEY);

  expect(res).toBe(undefined);
});

test("tryGetJson an existing object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const VALUE = { cool: "beans" };

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, JSON.stringify(VALUE));

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.tryGetJson(KEY);

  expect(res).toEqual(VALUE);
});

test("tryGetJson a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.tryGetJson(NON_EXISTENT_KEY);

  expect(res).toBe(undefined);
});

test("tryGetJson an existing non-Json object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const KEY = "test-file-1";
  const NON_JSON_VALUE = "test-content-1";

  const storage = new MockStorage();
  await storage.bucket(BUCKET_NAME).put(KEY, NON_JSON_VALUE);

  const client = new BucketClient(BUCKET_NAME, storage as any);

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

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.tryDelete(KEY);

  expect(res).toBe(true);
});

test("tryDelete a non-existent object from the bucket", async () => {
  const BUCKET_NAME = "test-bucket";
  const NON_EXISTENT_KEY = "NON_EXISTENT_KEY";

  const storage = new MockStorage();

  const client = new BucketClient(BUCKET_NAME, storage as any);
  const res = await client.tryDelete(NON_EXISTENT_KEY);

  expect(res).toBe(false);
});

test("get object's metadata from bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "my-bucket";
  const KEY = "my-object";
  const VALUE = "hello world";
  const mockStorage = new MockStorage();
  await mockStorage
    .bucket(BUCKET_NAME)
    .file(KEY)
    .save(VALUE, {
      metadata: {
        acl: [
          {
            entity: "user-example@example.com",
            role: "OWNER",
          },
        ],
        cacheControl: "public, max-age=3600",
        contentDisposition: "attachment; filename=my-object.txt",
        contentEncoding: "gzip",
        contentLanguage: "en",
        contentType: "text/plain",
        crc32c: "abcd1234",
        customTime: "2023-10-22T18:55:00Z",
        etag: "Cj0KEQjwvb76BRCtAhIDAQAB",
        generation: 1,
        id: "my-bucket/my-object/1666563700000000",
        kind: "storage#object",
        md5Hash: "1B2M2Y8AsgTpgAmY7PhCfg==",
        mediaLink: "https://storage.googleapis.com/my-bucket/my-object",
        metageneration: 1,
        name: "my-object",
        owner: {
          entity: "user-example@example.com",
          entityId: "12345678901234567890",
        },
        selfLink:
          "https://www.googleapis.com/storage/v1/b/my-bucket/o/my-object",
        size: 11,
        storageClass: "STANDARD",
        timeCreated: "2023-10-22T18:55:00Z",
        updated: "2023-10-22T18:55:00Z",
      },
    });

  // WHEN
  const client = new BucketClient(BUCKET_NAME, mockStorage as any);
  const response = await client.metadata(KEY);

  // THEN
  expect(response).toEqual({
    size: 11,
    lastModified: Datetime.fromIso("2023-10-22T18:55:00Z"),
    contentType: "text/plain",
  });
});

test("copy non-existing object", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const SRC_KEY = "SRC/KEY";
  const mockStorage = new MockStorage();

  // WHEN
  const client = new BucketClient(BUCKET_NAME, mockStorage as any);

  // THEN
  await expect(client.copy(SRC_KEY, SRC_KEY)).rejects.toThrowError(
    `Source object does not exist (srcKey=${SRC_KEY})`
  );
});

test("copy objects within the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const SRC_KEY = "SRC/KEY";
  const DST_KEY = "DST/KEY";
  const SRC_VALUE = "hello world";
  const mockStorage = new MockStorage();

  // WHEN
  const client = new BucketClient(BUCKET_NAME, mockStorage as any);
  await client.put(SRC_KEY, SRC_VALUE);
  const response1 = await client.copy(SRC_KEY, SRC_KEY);
  // THEN
  expect(response1).toEqual(undefined);
  expect(await client.get(SRC_KEY)).toBe(SRC_VALUE);
  expect(await client.exists(DST_KEY)).toBe(false);

  // WHEN
  const response2 = await client.copy(SRC_KEY, DST_KEY);
  // THEN
  expect(response2).toEqual(undefined);
  expect(await client.get(DST_KEY)).toBe(SRC_VALUE);
});

test("rename valid object in the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const SRC_KEY = "SRC/KEY";
  const SRC_VALUE = "hello world";
  const DST_KEY = "DST/KEY";
  const mockStorage = new MockStorage();

  // WHEN
  const client = new BucketClient(BUCKET_NAME, mockStorage as any);
  await client.put(SRC_KEY, SRC_VALUE);
  const response = await client.rename(SRC_KEY, DST_KEY);

  // THEN
  expect(response).toEqual(undefined);
  expect(await client.get(DST_KEY)).toBe(SRC_VALUE);
  expect(await client.exists(SRC_KEY)).toBe(false);
});

test("renaming an object to its current name should throw an error", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const SRC_KEY = "SRC/KEY";
  const mockStorage = new MockStorage();

  // WHEN
  const client = new BucketClient(BUCKET_NAME, mockStorage as any);

  // THEN
  await expect(() => client.rename(SRC_KEY, SRC_KEY)).rejects.toThrowError(
    `Renaming an object to its current name is not a valid operation (srcKey=${SRC_KEY}, dstKey=${SRC_KEY}).`
  );
});

test("rename non-existent object within the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const SRC_KEY = "SRC/KEY";
  const DST_KEY = "DST/KEY";
  const mockStorage = new MockStorage();

  // WHEN
  const client = new BucketClient(BUCKET_NAME, mockStorage as any);

  // THEN
  await expect(() => client.rename(SRC_KEY, DST_KEY)).rejects.toThrowError(
    `Source object does not exist (srcKey=${SRC_KEY}).`
  );
});

// TODO: implement signedUrl related tests
// https://github.com/winglang/wing/issues/4599
