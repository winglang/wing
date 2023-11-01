import { Storage, Bucket } from "@google-cloud/storage";
import {
  BucketDeleteOptions,
  IBucketClient,
  ObjectMetadata,
  BucketSignedUrlOptions,
} from "../cloud";
import { Json } from "../std";

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

  public async metadata(_key: string): Promise<ObjectMetadata> {
    throw new Error("Method not implemented.");
  }

  public async copy(srcKey: string, dstKey: string): Promise<void> {
    return Promise.reject(
      `copy is not implemented: (srcKey=${srcKey}, dstKey=${dstKey})`
    );
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

  public async put(key: string, body: string): Promise<void> {
    try {
      await this.bucket.file(key).save(body);
    } catch (error) {
      throw new Error(`Failed to put object. (key=${key})`);
    }
  }

  public async putJson(key: string, body: Json): Promise<void> {
    try {
      await this.put(key, JSON.stringify(body, null, 2));
    } catch (error) {
      throw new Error(`Failed to put JSON object. (key=${key})`);
    }
  }

  public async get(key: string): Promise<string> {
    try {
      const body = await this.bucket.file(key).download();
      return body.toString();
    } catch (error) {
      throw new Error(`Failed to get object. (key=${key})`);
    }
  }

  public async tryGet(key: string): Promise<string | undefined> {
    try {
      if (await this.exists(key)) {
        return await this.get(key);
      }
      return undefined;
    } catch (error) {
      throw new Error(`Failed to tryGet object. (key=${key})`);
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
    const mustExist = opts.mustExist === undefined ? true : opts.mustExist;
    try {
      if (mustExist && !(await this.exists(key))) {
        throw new Error(
          `Cannot delete object that does not exist. (key=${key})`
        );
      }
      await this.bucket.file(key).delete();
    } catch (error) {
      throw new Error(`Failed to delete object. (key=${key})`);
    }
  }

  public async tryDelete(key: string): Promise<boolean> {
    try {
      if (await this.exists(key)) {
        await this.delete(key);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to tryDelete object. (key=${key})`);
    }
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
    try {
      if (!(await this.exists(key))) {
        throw new Error(
          `Cannot provide public URL for a non-existent object. (key=${key})`
        );
      }
      if ((await this.isPublic()) === false) {
        throw new Error(
          `Cannot provide public URL for a non-public bucket. (bucket=${this.bucketName})`
        );
      }
      return `https://storage.googleapis.com/${this.bucketName}/${key}`;
    } catch (error) {
      throw new Error(`Failed to get public URL. (key=${key})`);
    }
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
