import { Storage, Bucket } from "@google-cloud/storage";
import mime from "mime-types";
import {
  BucketDeleteOptions,
  BucketSignedUrlOptions,
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
    try {
      const body = await this.bucket
        .file(key)
        .download({ start: options?.startByte, end: options?.endByte });
      return new TextDecoder("utf8", { fatal: true }).decode(body[0]);
    } catch (error) {
      throw new Error(
        `Failed to get object. (key=${key}) ${(error as Error).stack}`
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

  // TODO: implement signedUrl
  // https://github.com/winglang/wing/issues/4599

  public async signedUrl(
    _key: string,
    _options?: BucketSignedUrlOptions
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
