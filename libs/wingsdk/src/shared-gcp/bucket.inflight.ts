import { Storage, Bucket } from "@google-cloud/storage";
import mime from "mime-types";
import {
  BucketDeleteOptions,
  BucketSignedUrlOptions,
  BucketSignedUrlAction,
  BucketPutOptions,
  IBucketClient,
  ObjectMetadata,
  BucketGetOptions,
  BucketTryGetOptions,
} from "../cloud";
import { Datetime, Json } from "../std";

export class BucketClient implements IBucketClient {
  private bucketName: string;
  private storage: Storage;
  private bucket: Bucket;

  constructor(
    bucketName: string,
    storage: Storage,
    projectId: string = process.env.GCP_PROJECT_ID ?? "wingsdk-test"
  ) {
    this.bucketName = bucketName;
    this.storage = storage ? storage : new Storage({ projectId });
    this.bucket = this.storage.bucket(this.bucketName);
  }

  public async metadata(key: string): Promise<ObjectMetadata> {
    try {
      const [metadata] = await this.bucket.file(key).getMetadata();
      return {
        contentType: metadata.contentType,
        lastModified: Datetime.fromIso(metadata.updated),
        size: Number(metadata.size),
      };
    } catch (error) {
      throw new Error(`Object does not exist (key=${key}).`);
    }
  }

  public async copy(srcKey: string, dstKey: string): Promise<void> {
    try {
      const srcFile = this.bucket.file(srcKey);
      await srcFile.copy(this.bucket.file(dstKey));
    } catch (error) {
      throw new Error(`Source object does not exist (srcKey=${srcKey}).`);
    }
  }

  /**
   * Move object within the bucket
   *
   * @param srcKey The key of the source object you wish to rename.
   * @param dstKey The key of the destination object after rename.
   * @throws if `srcKey` object doesn't exist or if it matches `dstKey`.
   */
  public async rename(srcKey: string, dstKey: string): Promise<void> {
    if (srcKey === dstKey) {
      throw new Error(
        `Renaming an object to its current name is not a valid operation (srcKey=${srcKey}, dstKey=${dstKey}).`
      );
    }

    await this.copy(srcKey, dstKey);
    await this.delete(srcKey);
  }

  // check if bucket is public or not from bucket metadata
  private async isPublic(): Promise<boolean> {
    try {
      const [metadata] = await this.bucket.getMetadata();
      return metadata.iamConfiguration?.publicAccessPrevention === "inherited";
    } catch (error) {
      throw new Error(
        `Failed to check if bucket is public. (bucket=${this.bucketName})`
      );
    }
  }

  public async exists(key: string): Promise<boolean> {
    try {
      const [exists] = await this.bucket.file(key).exists();
      return exists;
    } catch (err) {
      throw new Error(`Failed to check if object exists. (key=${key})`);
    }
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
    const options = {
      contentType:
        (opts?.contentType ?? mime.lookup(key)) || "application/octet-stream",
    };
    await this.bucket.file(key).save(body, options);
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

  public async get(key: string, options?: BucketGetOptions): Promise<string> {
    const body = await this.bucket
      .file(key)
      .download({ start: options?.startByte, end: options?.endByte })
      .catch((e) => {
        throw new Error(
          `Failed to get object (key=${key}): ${(e as Error).stack})}`
        );
      });

    try {
      return new TextDecoder("utf8", { fatal: true }).decode(body[0]);
    } catch (e) {
      throw new Error(
        `Object content could not be read as text (key=${key}): ${
          (e as Error).stack
        })}`
      );
    }
  }

  public async tryGet(
    key: string,
    options?: BucketTryGetOptions
  ): Promise<string | undefined> {
    try {
      if (await this.exists(key)) {
        return await this.get(key, options);
      }
      return undefined;
    } catch (error) {
      throw new Error(
        `Failed to tryGet object. (key=${key}) ${(error as Error).stack}`
      );
    }
  }

  public async getJson(key: string): Promise<Json> {
    try {
      if (!(await this.exists(key))) {
        throw new Error(
          `Cannot get JSON object that does not exist. (key=${key})`
        );
      }
      return JSON.parse(await this.get(key));
    } catch (error) {
      throw new Error(`Failed to get JSON object. (key=${key})`);
    }
  }

  public async tryGetJson(key: string): Promise<Json | undefined> {
    try {
      if (await this.exists(key)) {
        return await this.getJson(key);
      }
      return undefined;
    } catch (error) {
      throw new Error(`Failed to tryGet JSON object. (key=${key})`);
    }
  }

  public async delete(
    key: string,
    opts: BucketDeleteOptions = {}
  ): Promise<void> {
    const mustExist = opts?.mustExist ?? false;

    if (mustExist && !(await this.exists(key))) {
      throw new Error(`Object does not exist (key=${key}).`);
    }

    try {
      await this.bucket.file(key).delete();
    } catch (error: any) {
      if (!mustExist && error.code === 404) {
        return;
      }
      throw new Error(`Failed to delete object (key=${key}).`);
    }
  }

  public async tryDelete(key: string): Promise<boolean> {
    if (await this.exists(key)) {
      await this.delete(key);
      return true;
    }

    return false;
  }

  public async list(prefix?: string): Promise<string[]> {
    try {
      const [files] = await this.bucket.getFiles({ prefix });
      return files.map((file) => file.name);
    } catch (error) {
      throw new Error(`Failed to list objects. (prefix=${prefix})`);
    }
  }

  public async publicUrl(key: string): Promise<string> {
    if (!(await this.isPublic())) {
      throw new Error("Cannot provide public url for a non-public bucket");
    }

    if (!(await this.exists(key))) {
      throw new Error(
        `Cannot provide public url for a non-existent key (key=${key})`
      );
    }

    return `https://storage.googleapis.com/${this.bucketName}/${key}`;
  }

  /**
   * Returns a presigned URL for the specified key in the bucket.
   * @param key The key of the object in the bucket.
   * @param opts The options including the action and the duration for the signed URL.
   * @returns The presigned URL string.
   * @inflight
   */
  public async signedUrl(
    key: string,
    opts: BucketSignedUrlOptions
  ): Promise<string> {
    const gcsFile = this.bucket.file(key);
    let gcsAction: "read" | "write" | "delete" | "resumable";

    // Set default action to DOWNLOAD if not provided
    const action = opts?.action ?? BucketSignedUrlAction.DOWNLOAD;

    // Set the GCS action
    switch (action) {
      case BucketSignedUrlAction.DOWNLOAD:
        if (!(await this.exists(key))) {
          throw new Error(
            `Cannot provide signed url for a non-existent key (key=${key})`
          );
        }
        gcsAction = "read";
        break;
      case BucketSignedUrlAction.UPLOAD:
        gcsAction = "write";
        break;
      default:
        throw new Error(`Invalid action: ${opts?.action}`);
    }

    // Generate the presigned URL
    const [signedUrl] = await gcsFile.getSignedUrl({
      version: "v4",
      action: gcsAction,
      expires: Date.now() + (opts?.duration?.seconds ?? 900) * 1000,
    });

    return signedUrl;
  }

  public async multipartUpload(_key: string): Promise<string> {
    throw new Error("Multipart upload is not supported yet for GCP");
  }

  public async completeMultipartUpload(_uploadId: string): Promise<void> {
    throw new Error("Multipart upload is not supported yet for GCP");
  }
}
