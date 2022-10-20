import * as fs from "fs";
import * as path from "path";
import { IBucketClient } from "../cloud";

export class BucketClient implements IBucketClient {
  constructor(private readonly bucketAddr: string) {}

  public async put(key: string, value: string): Promise<void> {
    const filename = path.join(this.bucketAddr, key);
    await fs.promises.writeFile(filename, value);
  }

  public async get(key: string): Promise<string> {
    const filename = path.join(this.bucketAddr, key);
    const value = await fs.promises.readFile(filename, "utf8");
    return value;
  }

  public async list(): Promise<string[]> {
    const keys = await fs.promises.readdir(this.bucketAddr);
    const values = keys.map(async (key) => {
      const filename = path.join(this.bucketAddr, key);
      return fs.promises.readFile(filename, "utf8");
    });
    return Promise.all(values);
  }
}
