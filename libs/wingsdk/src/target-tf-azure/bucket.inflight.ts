import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { BucketDeleteOptions, IBucketClient } from "../cloud";

export class BucketClient implements IBucketClient {
  private readonly bucketName: string;
  private readonly blobServiceClient: BlobServiceClient;
  private readonly defaultAzureCredential: DefaultAzureCredential =
    new DefaultAzureCredential();

  constructor(
    bucketName: string,
    storageAccount: string,
    blobServiceClient?: BlobServiceClient
  ) {
    this.bucketName = bucketName;
    this.blobServiceClient =
      blobServiceClient ??
      new BlobServiceClient(
        `https://${storageAccount}.blob.core.windows.net`,
        this.defaultAzureCredential
      );
  }

  /**
   * Put object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body string contents of the object
   */
  public async put(key: string, body: string): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.bucketName
    );
    await containerClient.getBlockBlobClient(key).upload(body, body.length);
  }

  /**
   * Get object content from bucket
   *
   * @param key Key of the object
   * @returns string content of the object as string
   */
  public async get(key: string): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.bucketName
    );
    const blobClient = containerClient.getBlobClient(key);

    const downloadResponse = await blobClient.download();
    if (downloadResponse.readableStreamBody === undefined) {
      return "";
    }

    const downloaded = (
      await this.streamToBuffer(downloadResponse.readableStreamBody)
    ).toString();

    return downloaded;
  }

  /**
   * List all keys in the bucket
   *
   * @param prefix Limits the response to keys that begin with the specified prefix
   * TODO - add pagination support
   */
  public async list(prefix?: string): Promise<string[]> {
    const list: string[] = [];

    const containerClient = this.blobServiceClient.getContainerClient(
      this.bucketName
    );

    for await (const blob of containerClient.listBlobsFlat({ prefix })) {
      list.push(blob.name);
    }

    return list;
  }

  /**
   * Delete an existing object using a key from the bucket
   *
   * @param key Key of the object
   * @param opts Option object supporting additional strategies to delete item from a bucket
   */
  public async delete(
    key: string,
    opts: BucketDeleteOptions = {}
  ): Promise<void> {
    const mustExist = opts.mustExist ?? false;

    const containerClient = this.blobServiceClient.getContainerClient(
      this.bucketName
    );
    const blockBlobClient = containerClient.getBlockBlobClient(key);

    try {
      await blockBlobClient.delete();
    } catch (err) {
      const error = err as any;
      if (!mustExist && error.details.errorCode === "BlobNotFound") {
        return;
      }

      throw Error(`unable to delete "${key}": ${error.details.message}`);
    }
  }

  /**
   * Required helper function for node js only.
   *
   * See https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob
   */
  private streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on("data", (data) => {
        chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
      });
      stream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      stream.on("error", reject);
    });
  }
}
