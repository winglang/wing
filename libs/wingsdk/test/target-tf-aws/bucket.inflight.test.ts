import { Readable } from "stream";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { SdkStream } from "@aws-sdk/types";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import { mockClient } from "aws-sdk-client-mock";
import { BucketClient } from "../../src/target-tf-aws/bucket.inflight";

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

test("list bucket objects", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const KEY1 = "KEY1";
  const KEY2 = "KEY2";
  const client = new BucketClient(BUCKET_NAME);
  s3Mock
    .on(ListObjectsCommand, { Bucket: BUCKET_NAME })
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
