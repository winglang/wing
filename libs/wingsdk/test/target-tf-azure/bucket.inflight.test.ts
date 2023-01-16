import { Readable } from "stream";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import {
  BlobClient,
  BlobDeleteResponse,
  BlobDownloadResponseParsed,
  BlobItem,
  BlobServiceClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
  ContainerClient,
  ContainerListBlobFlatSegmentResponse,
  ContainerListBlobsOptions,
} from "@azure/storage-blob";
import { BucketClient } from "../../src/target-tf-azure/bucket.inflight";

jest.mock("@azure/storage-blob");

const mockBlobServiceClient = new BlobServiceClient(
  "https://some-fake-url.com"
);
mockBlobServiceClient.getContainerClient = jest.fn(() => {
  return new MockContainerClient("");
});

beforeEach(() => {
  jest.clearAllMocks;
});

test("get object from a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    mockBlobServiceClient
  );
  const response = await client.get(KEY);

  // THEN
  expect(response).toEqual("some fake content");
});

test("put an object into a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";
  const VALUE = "VALUE";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
    mockBlobServiceClient
  );
  const response = await client.put(KEY, VALUE);

  // THEN
  expect(response).toEqual(undefined);
});

test("delete object from a bucket", async () => {
  // GIVEN
  const BUCKET_NAME = "BUCKET_NAME";
  const STORAGE_NAME = "STORAGE_NAME";
  const KEY = "KEY";

  // WHEN
  const client = new BucketClient(
    BUCKET_NAME,
    STORAGE_NAME,
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
    mockBlobServiceClient
  );
  const response = await client.list();

  // THEN
  expect(response).toEqual(["object1", "object2"]);
});

// Mock Clients
class MockBlobClient extends BlobClient {
  download(): Promise<BlobDownloadResponseParsed> {
    return Promise.resolve({
      _response: null as any,
      readableStreamBody: createMockStream("some fake content"),
    });
  }
}

class MockBlockBlobClient extends BlockBlobClient {
  upload(): Promise<BlockBlobUploadResponse> {
    return Promise.resolve({} as any);
  }

  delete(): Promise<BlobDeleteResponse> {
    return Promise.resolve({} as any);
  }
}

class MockContainerClient extends ContainerClient {
  getBlobClient(key: string): BlobClient {
    return new MockBlobClient(key);
  }

  getBlockBlobClient(blobName: string): BlockBlobClient {
    return new MockBlockBlobClient(blobName);
  }

  listBlobsFlat(
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
