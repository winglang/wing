import { Readable } from "stream";
import {
  DeleteObjectCommand,
  GetBucketLocationCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { SdkStream } from "@aws-sdk/types";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach } from "vitest";
import { BucketClient } from "../../src/shared-aws/bucket.inflight";

const s3Mock = mockClient(S3Client);

beforeEach(() => {
  s3Mock.reset();
});

// https://github.com/m-radzikowski/aws-sdk-client-mock/issues/131
function createMockStream(text: string): SdkStream<Readable> {
  const stream = new Readable();
  stream._read = () => {};
  stream.push(text);
  stream.push(null); // indicate end of file
  const sdkStream = sdkStreamMixin(stream);
  return sdkStream;
}

test("get object from a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock.on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    Body: createMockStream(VALUE),
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.get(KEY);

  // THEN
  expect(response).toEqual(VALUE);
});

test("get Json object from a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = { msg: "Hello, World!" };
  s3Mock.on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    Body: createMockStream(JSON.stringify(VALUE)),
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.getJson(KEY);

  // THEN
  expect(response).toEqual(VALUE);
});

test("put an object into a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock
    .on(PutObjectCommand, { Bucket: BUCKET_NAME, Key: KEY, Body: VALUE })
    .resolves({});

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.put(KEY, VALUE);

  // THEN
  expect(response).toEqual(undefined);
});

test("put a Json object into a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = { cool: "beans" };
  s3Mock
    .on(PutObjectCommand, {
      Bucket: BUCKET_NAME,
      Key: KEY,
      Body: JSON.stringify(VALUE),
    })
    .resolves({});

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.putJson(KEY, VALUE as any);

  // THEN
  expect(response).toEqual(undefined);
});

test("list bucket objects", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY1 = "KEY1";
  const KEY2 = "KEY2";
  const client = new BucketClient(BUCKET_NAME);
  s3Mock
    .on(ListObjectsV2Command, { Bucket: BUCKET_NAME })
    .resolves({ Contents: [{ Key: KEY1 }, { Key: KEY2 }] });
  const response = await client.list();
  // THEN
  expect(response).toEqual([KEY1, KEY2]);
});

test("delete object from a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({});

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.delete(KEY);

  // THEN
  expect(response).toEqual(undefined);
});

test("delete object from a bucket with mustExist option", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({});

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.delete(KEY, { mustExist: true });

  // THEN
  expect(response).toEqual(undefined);
});

test("Given a non public bucket when reaching to a key public url it should throw an error", async () => {
  // GIVEN
  let error;
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(GetBucketLocationCommand, { Bucket: BUCKET_NAME })
    .resolves({ LocationConstraint: "us-east-2" });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);

  try {
    await client.publicUrl(KEY);
  } catch (err) {
    error = err;
  }
  // THEN
  expect(error?.message).toBe(
    "Cannot provide public url for a non-public bucket"
  );
});

test("Given a public bucket when reaching to a non existent key, public url it should throw an error", async () => {
  // GIVEN
  let error;
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(GetBucketLocationCommand, { Bucket: BUCKET_NAME })
    .resolves({ LocationConstraint: "us-east-2" });
  s3Mock
    .on(ListObjectsV2Command, { Bucket: BUCKET_NAME, Prefix: KEY, MaxKeys: 1 })
    .resolves({ Contents: [] });

  //WHEN
  const client = new BucketClient(BUCKET_NAME, true);
  try {
    await client.publicUrl(KEY);
  } catch (err) {
    error = err;
  }
  // THEN
  expect(error?.message).toBe(
    "Cannot provide public url for an non-existent key (key=KEY)"
  );
});

test("Given a public bucket, when giving one of its keys, we should get it's public url", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const REGION = "us-east-2";

  s3Mock
    .on(GetBucketLocationCommand, { Bucket: BUCKET_NAME })
    .resolves({ LocationConstraint: REGION });
  s3Mock
    .on(ListObjectsV2Command, { Bucket: BUCKET_NAME, Prefix: KEY, MaxKeys: 1 })
    .resolves({ Contents: [{}] });

  // WHEN
  const client = new BucketClient(BUCKET_NAME, true);
  const response = await client.publicUrl(KEY);

  // THEN
  expect(response).toEqual(
    `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${KEY}`
  );
});
