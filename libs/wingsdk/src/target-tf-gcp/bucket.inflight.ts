import { Storage, Bucket } from "@google-cloud/storage";
import { BucketDeleteOptions, IBucketClient } from "../cloud";
import { Json } from "../std";

export class BucketClient implements IBucketClient {
  private _public: boolean;
  private bucketName: string;
  private storage: Storage;
  private bucket: Bucket;

  constructor(bucketName: string, isPublic: boolean = false, storage: Storage, projectId: string = process.env.GCP_PROJECT_ID || "wingsdk-test") {
    this._public = isPublic;
    this.bucketName = bucketName;
    this.storage = storage ? storage : new Storage({ projectId: projectId });
    this.bucket = this.storage.bucket(this.bucketName);
  }

  public async exists(key: string): Promise<boolean> {
    try {
      const res = await this.bucket.file(key).exists();
      return res[0];
    } catch (err) {
      throw new Error(`Failed to check if object exists. (key=${key})`);
    }
  }

  public async put(key: string, body: string): Promise<void> {
    try {
      if (await this.exists(key)) {
        throw new Error(`Object already exists. (key=${key})`);
        return;
      }
      await this.bucket.file(key).save(body);
    } catch (error) {
      throw new Error(`Failed to put object. (key=${key})`);
    }
  }

  public async putJson(key: string, body: Json): Promise<void> {
    await this.put(key, JSON.stringify(body, null, 2));
    // throw new Error(`putJson is not supported yet. (key=${key})`);
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
    if (await this.exists(key)) {
      return this.get(key);
    }
    return undefined;
    // throw new Error(`tryGet is not supported yet. (key=${key})`);
  }

  public async getJson(key: string): Promise<Json> {
    return JSON.parse(await this.get(key));
    // throw new Error(`getJson is not supported yet. (key=${key})`);
  }

  public async tryGetJson(key: string): Promise<Json | undefined> {
    if (await this.exists(key)) {
      return this.getJson(key);
    }
    return undefined;
    // throw new Error(`tryGetJson is not supported yet. (key=${key})`);
  }

  public async delete(key: string, opts: BucketDeleteOptions = {}): Promise<void> {
    const mustExist = opts.mustExist ?? false;
    try {
      await this.storage.bucket(this.bucketName).file(key).delete();
    } catch (err) {
      if (!mustExist && err) {
        return;
      }
      throw err;
    }
    // throw new Error(`delete is not supported yet. (key=${key})`);
  }

  public async tryDelete(key: string): Promise<boolean> {
    if (await this.exists(key)) {
      await this.delete(key);
      return true;
    }
    return false;
    // throw new Error(`tryDelete is not supported yet. (key=${key})`);
  }

  public async list(prefix?: string): Promise<string[]> {
    const [files] = await this.storage.bucket(this.bucketName).getFiles({
      prefix,
    });
    return files.map((file) => file.name);
    // throw new Error(`list is not supported yet. (prefix=${prefix})`);
  }

  public async publicUrl(key: string): Promise<string> {
    this._public; // a little help for implementing public_url later on
    throw new Error(`publicUrl is not supported yet. (key=${key})`);
  }
}