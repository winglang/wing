import { Readable } from "stream";
import {
  HeadObjectCommand,
  DeleteObjectCommand,
  GetBucketLocationCommand,
  GetObjectCommand,
  GetPublicAccessBlockCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  NoSuchKey,
} from "@aws-sdk/client-s3";
import { SdkStream } from "@aws-sdk/types";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach, vi, Mock } from "vitest";
import { BucketClient } from "../../src/shared-aws/bucket.inflight";
import * as s3RequestPresigner from "@aws-sdk/s3-request-presigner/dist-cjs/getSignedUrl";

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

test("put an object into the bucket", async () => {
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

test("putJson an object into the bucket", async () => {
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

test("get an object from the bucket", async () => {
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

test("get a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects(new Error("Object does not exist"));

  // WHEN
  const client = new BucketClient(BUCKET_NAME);

  // THEN
  await expect(() => client.get(KEY)).rejects.toThrowError(
    /Object does not exist/
  );
});

test("getJson an object from the bucket", async () => {
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

test("delete object from the bucket", async () => {
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

test("delete object from the bucket with mustExist option", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({});
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.delete(KEY, { mustExist: true });

  // THEN
  expect(response).toEqual(undefined);
});

test("delete non-existent object from the bucket with mustExist option", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({});
  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });
  // WHEN
  const client = new BucketClient(BUCKET_NAME);

  // THEN
  await expect(() =>
    client.delete(KEY, { mustExist: true })
  ).rejects.toThrowError("Object does not exist (key=KEY).");
});

test("Given a non public bucket when reaching to a key public url it should throw an error", async () => {
  // GIVEN
  let error;
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock.on(GetPublicAccessBlockCommand, { Bucket: BUCKET_NAME }).resolves({
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      RestrictPublicBuckets: true,
      IgnorePublicAcls: true,
    },
  });
  s3Mock.on(HeadObjectCommand).rejects({ name: "NotFound" });

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

  s3Mock.on(GetPublicAccessBlockCommand, { Bucket: BUCKET_NAME }).resolves({
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: false,
      BlockPublicPolicy: false,
      RestrictPublicBuckets: false,
      IgnorePublicAcls: false,
    },
  });
  s3Mock
    .on(GetBucketLocationCommand, { Bucket: BUCKET_NAME })
    .resolves({ LocationConstraint: "us-east-2" });
  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });

  //WHEN
  const client = new BucketClient(BUCKET_NAME);
  try {
    await client.publicUrl(KEY);
  } catch (err) {
    error = err;
  }
  // THEN
  expect(error?.message).toBe(
    "Cannot provide public url for a non-existent key (key=KEY)"
  );
});

test("Given a public bucket, when giving one of its keys, we should get its public url", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const REGION = "us-east-2";

  s3Mock.on(GetPublicAccessBlockCommand, { Bucket: BUCKET_NAME }).resolves({
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: false,
      BlockPublicPolicy: false,
      RestrictPublicBuckets: false,
      IgnorePublicAcls: false,
    },
  });
  s3Mock
    .on(GetBucketLocationCommand, { Bucket: BUCKET_NAME })
    .resolves({ LocationConstraint: REGION });
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const response = await client.publicUrl(KEY);

  // THEN
  expect(response).toEqual(
    `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${KEY}`
  );
});

test("check that an object exists in the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectExists = await client.exists(KEY);

  // THEN
  expect(objectExists).toBe(true);
});

test("check that an object doesn't exist in the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectExists = await client.exists(KEY);

  // THEN
  expect(objectExists).toBe(false);
});

test("tryGet an existing object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({ Body: createMockStream(VALUE) });
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectTryGet = await client.tryGet(KEY);

  // THEN
  expect(objectTryGet).toEqual(VALUE);
});

test("tryGet a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects(new NoSuchKey({ message: "NoSuchKey error", $metadata: {} }));
  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectTryGet = await client.tryGet(KEY);

  // THEN
  expect(objectTryGet).toEqual(undefined);
});

test("tryGet object from the bucket throws an unknown error", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects(new Error("unknown error"));
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({});

  // WHEN
  const client = new BucketClient(BUCKET_NAME);

  // THEN
  await expect(() => client.tryGet(KEY)).rejects.toThrowError(/unknown error/);
});

test("tryGetJson an existing object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = { msg: "Hello, World!" };
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({ Body: createMockStream(JSON.stringify(VALUE)) });
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectTryGetJson = await client.tryGetJson(KEY);

  // THEN
  expect(objectTryGetJson).toEqual(VALUE);
});

test("tryGetJson a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = { msg: "Hello, World!" };
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects(new NoSuchKey({ message: "NoSuchKey error", $metadata: {} }));
  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectTryGetJson = await client.tryGetJson(KEY);

  // THEN
  expect(objectTryGetJson).toEqual(undefined);
});

test("tryGetJson object from the bucket throws an unknown error", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = { msg: "Hello, World!" };
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects(new Error("unknown error"));
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({});

  // WHEN
  const client = new BucketClient(BUCKET_NAME);

  // THEN
  await expect(() => client.tryGet(KEY)).rejects.toThrowError(/unknown error/);
});

test("tryGetJson an existing non-Json object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  s3Mock
    .on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({ Body: createMockStream(VALUE) });
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);

  // THEN
  // it seems to throw a different error per OS/ node version
  await expect(() => client.tryGetJson(KEY)).rejects.toThrowError();
});

test("tryDelete an existing object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  s3Mock
    .on(DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({});
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentLength: 3191,
    ContentType: "image/jpeg",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectTryDelete = await client.tryDelete(KEY);

  // THEN
  expect(objectTryDelete).toEqual(true);
});

test("tryDelete a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";
  s3Mock
    .on(DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .resolves({});
  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const objectTryDelete = await client.tryDelete(KEY);

  // THEN
  expect(objectTryDelete).toEqual(false);
});

test("Given a bucket when reaching to a non existent key, signed url it should throw an error", async () => {
  // GIVEN
  let error;
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "KEY";

  s3Mock
    .on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
    .rejects({ name: "NotFound" });

  //WHEN
  const client = new BucketClient(BUCKET_NAME);
  try {
    await client.signedUrl(KEY);
  } catch (err) {
    error = err;
  }
  // THEN
  expect(error?.message).toBe(
    `Cannot provide signed url for a non-existent key (key=${KEY})`
  );
});

test("Given a bucket, when giving one of its keys, we should get its signed url", async () => {
  // GIVEN

  const BUCKET_NAME = "BUCKET_NAME";
  const KEY = "sampletext.Pdf";
  const VALUE = "VALUE";

  s3Mock.on(GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    Body: createMockStream(VALUE),
  });
  s3Mock.on(HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
    AcceptRanges: "bytes",
    ContentType: "application/pdf",
    ETag: "6805f2cfc46c0f04559748bb039d69ae",
    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
    Metadata: {},
    VersionId: "null",
  });

  const signedUrlFn = vi
    .spyOn(s3RequestPresigner, "getSignedUrl")
    .mockResolvedValue(VALUE);

  // WHEN
  const client = new BucketClient(BUCKET_NAME);
  const signedUrl = await client.signedUrl(KEY);
  // THEN
  expect(signedUrlFn).toBeCalledTimes(1);
  expect(signedUrl).toBe(VALUE);
});
