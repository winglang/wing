import { DefaultAzureCredential } from "@azure/identity";
import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
  ContainerClient,
} from "@azure/storage-blob";
import mime from "mime-types";
import {
  IBucketClient,
  ObjectMetadata,
  BucketPutOptions,
  BucketDeleteOptions,
  BucketSignedUrlOptions,
  BucketGetOptions,
  BucketTryGetOptions,
} from "../cloud";
import { Datetime, Json } from "../std";

export class BucketClient implements IBucketClient {
  private readonly bucketName: string;
  private readonly storageAccount: string;
  private readonly blobServiceClient: BlobServiceClient;
  private readonly containerClient: ContainerClient;
  private readonly defaultAzureCredential: DefaultAzureCredential =
    new DefaultAzureCredential();

  constructor(
    bucketName: string,
    storageAccount: string,
    blobServiceClient?: BlobServiceClient
  ) {
    this.bucketName = bucketName;
    this.storageAccount = storageAccount;
    this.blobServiceClient =
      blobServiceClient ??
      new BlobServiceClient(
        `https://${storageAccount}.blob.core.windows.net`,
        this.defaultAzureCredential
      );
    this.containerClient = this.blobServiceClient.getContainerClient(
      this.bucketName
    );
  }

  /**
   * Check if an object exists in the bucket
   *
   * @param key Key of the object
   */
  public async exists(key: string): Promise<boolean> {
    const blobClient = this.containerClient.getBlobClient(key);
    return blobClient.exists();
  }

  /**
   * Put object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body string contents of the object
   */
  public async put(
    key: string,
    body: string,
    opts?: BucketPutOptions
  ): Promise<void> {
    const blobClient = this.containerClient.getBlockBlobClient(key);
    const options = {
      blobHTTPHeaders: {
        blobContentType:
          (opts?.contentType ?? mime.lookup(key)) || "application/octet-stream",
      },
    };
    await blobClient.upload(body, body.length, options);
  }

  /**
   * Put Json object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body Json object
   */
  public async putJson(key: string, body: Json): Promise<void> {
    await this.put(key, JSON.stringify(body, null, 2), {
      contentType: "application/json",
    });
  }

  /**
   * Get an object from the bucket
   *
   * @param key Key of the object
   * @returns string content of the object as string
   */
  public async get(key: string, options?: BucketGetOptions): Promise<string> {
    const blobClient = this.containerClient.getBlobClient(key);

    let downloadResponse: BlobDownloadResponseParsed;
    try {
      const start = options?.startByte !== undefined ? options.startByte : 0;
      const length =
        options?.endByte !== undefined ? options.endByte - start : undefined;
      downloadResponse = await blobClient.download(start, length);
    } catch (e) {
      throw new Error(
        `Object does not exist (key=${key}): ${(e as Error).stack}`
      );
    }
    if (downloadResponse.readableStreamBody === undefined) {
      return "";
    }

    try {
      return new TextDecoder("utf8", { fatal: true }).decode(
        await this.streamToBuffer(downloadResponse.readableStreamBody)
      );
    } catch (e) {
      throw new Error(
        `Object contents could not be read as text (key=${key}): ${
          (e as Error).stack
        })}`
      );
    }
  }

  /**
   * Get an object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns string content of the object as string
   */
  public async tryGet(
    key: string,
    options?: BucketTryGetOptions
  ): Promise<string | undefined> {
    if (await this.exists(key)) {
      return this.get(key, options);
    }

    return undefined;
  }

  /**
   * Get a Json object from the bucket
   *
   * @param key Key of the object
   * @returns Json content of the object
   */
  public async getJson(key: string): Promise<Json> {
    return JSON.parse(await this.get(key));
  }

  /**
   * Get a Json object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns Json content of the object
   */
  public async tryGetJson(key: string): Promise<Json | undefined> {
    if (await this.exists(key)) {
      return this.getJson(key);
    }

    return undefined;
  }

  /**
   * Delete an object from the bucket
   *
   * @param key Key of the object
   * @param opts Option object supporting additional strategies to delete item from a bucket
   */
  public async delete(
    key: string,
    opts: BucketDeleteOptions = {}
  ): Promise<void> {
    const mustExist = opts.mustExist ?? false;

    const blockBlobClient = this.containerClient.getBlockBlobClient(key);

    try {
      await blockBlobClient.delete();
    } catch (err) {
      const error = err as any;
      if (error.details.errorCode === "BlobNotFound") {
        if (mustExist) {
          throw new Error(`Object does not exist (key=${key}).`);
        } else {
          return;
        }
      }
      throw Error(`Failed to delete object (key=${key}).`);
    }
  }

  /**
   * Delete an object from the bucket if it exists
   *
   * @param key Key of the object
   * @param opts Option object supporting additional strategies to delete item from a bucket
   */
  public async tryDelete(key: string): Promise<boolean> {
    if (await this.exists(key)) {
      await this.delete(key);
      return true;
    }

    return false;
  }

  /**
   * List all keys in the bucket
   *
   * @param prefix Limits the response to keys that begin with the specified prefix
   */
  public async list(prefix?: string): Promise<string[]> {
    const list: string[] = [];

    for await (const blob of this.containerClient.listBlobsFlat({ prefix })) {
      list.push(blob.name);
    }

    return list;
  }

  public async signedUrl(
    key: string,
    options?: BucketSignedUrlOptions
  ): Promise<string> {
    options;
    throw new Error(
      `signedUrl is not implemented yet for tf-azure (key=${key})`
    );
  }

  /**
   * Returns a url to the given file.
   * @Throws if the file is not public or if object does not exist.
   */
  // TODO: NOT SUPPORTED!! - see https://github.com/winglang/wing/issues/5117
  public async publicUrl(key: string): Promise<string> {
    // this returns an optional `blobPublicAccess` prop - if exists the bucket is public
    const accessPolicy = await this.containerClient.getAccessPolicy();
    if (!accessPolicy?.blobPublicAccess) {
      throw new Error("Cannot provide public url for a non-public bucket");
    }
    if (!(await this.exists(key))) {
      throw new Error(
        `Cannot provide public url for a non-existent key (key=${key})`
      );
    }

    return encodeURI(
      `https://${this.storageAccount}.blob.core.windows.net/${this.bucketName}/${key}`
    );
  }

  /**
   * Get the metadata of an object in the bucket.
   * @param key Key of the object.
   * @throws if the object does not exist.
   */
  public async metadata(key: string): Promise<ObjectMetadata> {
    const blobClient = this.containerClient.getBlobClient(key);

    try {
      const properties = await blobClient.getProperties();
      return {
        contentType: properties.contentType,
        lastModified: Datetime.fromDate(properties.lastModified!),
        size: properties.contentLength!,
      };
    } catch (error) {
      throw new Error(`Object does not exist (key=${key}).`);
    }
  }

  /**
   * Copy object within the bucket
   *
   * @param srcKey The key of the source object you wish to copy.
   * @param dstKey The key of the destination object after copying.
   * @throws if `srcKey` object doesn't exist.
   */
  public async copy(srcKey: string, dstKey: string): Promise<void> {
    const srcBlobUrl = this.containerClient.getBlobClient(srcKey).url;
    const dstBlobClient = this.containerClient.getBlockBlobClient(dstKey);

    try {
      await dstBlobClient.syncCopyFromURL(srcBlobUrl);
    } catch (error) {
      throw new Error(`Source object does not exist (srcKey=${srcKey}).`);
    }
  }

  /**
   * Move object within the container
   *
   * @param srcKey The key of the source object you wish to rename.
   * @param dstKey The key of the destination object after rename.
   * @throws if `srcKey` object doesn't exist or if it matches `dstKey`.
   */
  public async rename(srcKey: string, dstKey: string): Promise<void> {
    return Promise.reject(
      `rename is not implemented: (srcKey=${srcKey}, dstKey=${dstKey})`
    );
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
