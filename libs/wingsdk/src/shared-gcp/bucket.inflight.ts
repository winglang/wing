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
    projectId: string = process.env.GCP_PROJECT_ID || "wingsdk-test"
  ) {
    this.bucketName = bucketName;
    this.storage = storage ? storage : new Storage({ projectId: projectId });
    this.bucket = this.storage.bucket(this.bucketName);
  }

  public async metadata(_key: string): Promise<ObjectMetadata> {
    throw new Error("Method not implemented.");
  }

  // check if bucket is public or not from bucket metadata and set it to _public
  public async isPublic(): Promise<boolean> {
    try {
      const [metadata] = await this.bucket.getMetadata();
      return metadata.iamConfiguration?.publicAccessPrevention === "inherited";
    } catch (error) {
      throw new Error(
        `Failed to check if bucket is public. (bucket=${this.bucketName})`
      );
    }
  }

  /**
   * Check if an object exists in the bucket
   *
   * @param key Key of the object
   */
  public async exists(key: string): Promise<boolean> {
    try {
      const res = await this.bucket.file(key).exists();
      return res[0];
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
  public async put(key: string, body: string): Promise<void> {
    try {
      await this.bucket.file(key).save(body);
    } catch (error) {
      throw new Error(`Failed to put object. (key=${key})`);
    }
  }

  /**
   * Put Json object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body Json object
   */
  public async putJson(key: string, body: Json): Promise<void> {
    try {
      await this.put(key, JSON.stringify(body, null, 2));
    } catch (error) {
      throw new Error(`Failed to put JSON object. (key=${key})`);
    }
  }

  /**
   * Get an object from the bucket
   *
   * @param key Key of the object
   * @returns string content of the object as string
   */
  public async get(key: string): Promise<string> {
    try {
      const body = await this.bucket.file(key).download();
      return body.toString();
    } catch (error) {
      throw new Error(`Failed to get object. (key=${key})`);
    }
  }

  /**
   * Get an object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns string content of the object as string
   */
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

  /**
   * Get a Json object from the bucket
   *
   * @param key Key of the object
   * @returns Json content of the object
   */
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

  /**
   * Get a Json object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns Json content of the object
   */
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

  /**
   * Delete an object from the bucket if it exists
   *
   * @param key Key of the object
   * @param opts Option object supporting additional strategies to delete item from a bucket
   */
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

  /**
   * List all keys in the bucket
   *
   * @param prefix Limits the response to keys that begin with the specified prefix
   */
  public async list(prefix?: string): Promise<string[]> {
    try {
      const [files] = await this.bucket.getFiles({ prefix });
      return files.map((file) => file.name);
    } catch (error) {
      throw new Error(`Failed to list objects. (prefix=${prefix})`);
    }
  }

  /**
   * Returns a url to the given file.
   * @Throws if the file is not public or if object does not exist.
   */
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

  // TODO: implement
  // https://github.com/winglang/wing/issues/4599
  /**
   * Returns a signed url to the given file. This URL can be used by anyone to
   * access the file until the link expires (defaults to 24 hours).
   * @param key The key to reach
   * @param duration Time until expires
   */
  public async signedUrl(
    _key: string,
    _options?: BucketSignedUrlOptions
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
