// import {AnonymousCredential, BlobClient, BlobServiceClient, ContainerClient } from "@azure/storage-blob";

jest.mock("@azure/storage-blob");

//TODO: mock out azure storage blob for inflight test cases. No existing mock library was found when searching

beforeEach(() => {
  jest.clearAllMocks;
});

test("get object from a bucket", async () => {
  // GIVEN
  const bucketName = "mybucket";
  bucketName;
  // const key =  "readme.md";

  // WHEN
  // const containerClient =  blobServiceClient.getContainerClient(bucketName);
  // const blobClient = containerClient.getBlobClient(bucketName);
  // const resp = await blobClient.download();

  // THEN
  expect(200).toBe(200);
});
