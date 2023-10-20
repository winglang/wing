import { Readable } from "stream";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import {
  BlobClient,
  BlobDeleteResponse,
  BlobDownloadResponseParsed,
  BlobExistsOptions,
  BlobItem,
  BlobServiceClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
  ContainerClient,
  ContainerListBlobFlatSegmentResponse,
  ContainerListBlobsOptions,
} from "@azure/storage-blob";
import { test, expect, beforeEach, vi } from "vitest";
import { BucketClient } from "../../src/target-tf-azure/bucket.inflight";

vi.mock("@azure/storage-blob");

type TestPath = "happy" | "sad" | "happyJson" | "sadJson";
let TEST_PATH: TestPath;

const mockBlobServiceClient = new BlobServiceClient(
  "https://some-fake-url.com"
);
mockBlobServiceClient.getContainerClient = vi.fn(() => {
  return new MockContainerClient("");
});

beforeEach(() => {
  vi.clearAllMocks;
  TEST_PATH = "happy";
});

test("put an object into the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  const response = await client.put(KEY, VALUE);

  // THEN
  expect(response).toEqual(undefined);
});

test("put an object into the bucket specifying the content-type", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";
  const CONTENT_TYPE = "image/png";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  const response = await client.put(KEY, VALUE, { contentType: CONTENT_TYPE });

  // THEN
  expect(response).toEqual(undefined);
});

test("putJson an object into the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";
  const VALUE = { cool: "beans" };

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  const response = await client.putJson(KEY, VALUE as any);

  // THEN
  expect(response).toEqual(undefined);
});

test("get an object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "happy";

  const response = await client.get(KEY);

  // THEN
  expect(response).toEqual("some fake content");
});

test("get a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  // THEN
  await expect(() => client.get(KEY)).rejects.toThrowError(
    /Object does not exist/
  );
});

test("getJson an object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "happyJson";

  const response = await client.getJson(KEY);

  // THEN
  expect(response).toEqual({ cool: "beans" });
});

test("getJson a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  // THEN
  await expect(() => client.getJson(KEY)).rejects.toThrowError(
    /Object does not exist/
  );
});

test("delete object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  const response = await client.delete(KEY);

  // THEN
  expect(response).toEqual(undefined);
});

test("List objects from bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  const response = await client.list();

  // THEN
  expect(response).toEqual(["object1", "object2"]);
});

test("check that an object exists in the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "happy";

  const objectExists = await client.exists("object1");

  // THEN
  expect(objectExists).toEqual(true);
});

test("check that an object doesn't exist in the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  const objectExists = await client.exists("object1");

  // THEN
  expect(objectExists).toEqual(false);
});

test("tryGet an existing object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "happy";

  const objectTryGet = await client.tryGet(KEY);

  // THEN
  expect(objectTryGet).toEqual("some fake content");
});

test("tryGet a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  const objectTryGet = await client.tryGet(KEY);

  // THEN
  expect(objectTryGet).toEqual(undefined);
});

test("tryGetJson an existing object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "happyJson";

  const response = await client.tryGetJson(KEY);

  // THEN
  expect(response).toEqual({ cool: "beans" });
});

test("tryGetJson a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  const response = await client.tryGetJson(KEY);

  // THEN
  expect(response).toEqual(undefined);
});

test("tryGetJson an existing non-Json object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sadJson";

  // THEN
  // it seems to throw a different error per OS/ node version
  await expect(() => client.tryGetJson(KEY)).rejects.toThrowError();
});

test("tryDelete an existing object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "happy";

  const objectTryDelete = await client.tryDelete(KEY);

  // THEN
  expect(objectTryDelete).toEqual(true);
});

test("tryDelete a non-existent object from the bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  const objectTryDelete = await client.tryDelete(KEY);

  // THEN
  expect(objectTryDelete).toEqual(false);
});

test("Given a non public bucket when reaching to a key public url it should throw an error", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    false,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  // THEN
  await expect(() => client.publicUrl(KEY)).rejects.toThrowError(
    `Cannot provide public url for a non-public bucket`
  );
});

test("Given a public bucket when reaching to a non existent key, public url it should throw an error", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "non-existent-key";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    true,
    mockBlobServiceClient
  );
  TEST_PATH = "sad";

  // THEN
  await expect(() => client.publicUrl(KEY)).rejects.toThrowError(
    `Cannot provide public url for a non-existent key (key=${KEY})`
  );
});

test("Given a public bucket, when giving one of its keys, we should get its public url", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    true,
    mockBlobServiceClient
  );
  TEST_PATH = "happy";

  const expectedUrl = `https://${STORAGE_NAME}.blob.core.windows.net/${BUCKET_NAME}/${KEY}`;
  const response = await client.publicUrl(KEY);

  // THEN
  expect(response).toEqual(expectedUrl);
});

// Mock Clients
class MockBlobClient extends BlobClient {
  public download(): Promise<BlobDownloadResponseParsed> {
    switch (TEST_PATH) {
      case "happy":
        return Promise.resolve({
          _response: null as any,
          readableStreamBody: createMockStream("some fake content"),
        });
      case "happyJson":
        return Promise.resolve({
          _response: null as any,
          readableStreamBody: createMockStream(
            JSON.stringify({ cool: "beans" })
          ),
        });
      case "sadJson":
        return Promise.resolve({
          _response: null as any,
          readableStreamBody: createMockStream("not a Json object"),
        });
      default:
        return Promise.reject("some fake error");
    }
  }

  public exists(options?: BlobExistsOptions | undefined): Promise<boolean> {
    options;
    switch (TEST_PATH) {
      case "happy":
        return Promise.resolve(true);
      case "happyJson":
        return Promise.resolve(true);
      case "sadJson":
        return Promise.resolve(true);
      default:
        return Promise.resolve(false);
    }
  }
}

class MockBlockBlobClient extends BlockBlobClient {
  public upload(): Promise<BlockBlobUploadResponse> {
    return Promise.resolve({} as any);
  }

  public delete(): Promise<BlobDeleteResponse> {
    return Promise.resolve({} as any);
  }
}

class MockContainerClient extends ContainerClient {
  public getBlobClient(key: string): BlobClient {
    return new MockBlobClient(key);
  }

  public getBlockBlobClient(blobName: string): BlockBlobClient {
    return new MockBlockBlobClient(blobName);
  }

  public listBlobsFlat(
    options?: ContainerListBlobsOptions | undefined
  ): PagedAsyncIterableIterator<
    BlobItem,
    ContainerListBlobFlatSegmentResponse,
    PageSettings
  > {
    options;
    return [{ name: "object1" }, { name: "object2" }] as any;
  }
}

function createMockStream(text: string): Readable {
  const stream = new Readable();
  stream._read = () => {};
  stream.push(text);
  stream.push(null);
  return stream;
}
