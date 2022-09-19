import * as fs from "fs";
import * as path from "path";
import { IBucketClient, Void } from "../cloud";

export class BucketClient implements IBucketClient {
  constructor(private readonly bucketAddr: string) {}

  public async put(key: string, value: any): Promise<Void> {
    const filename = path.join(this.bucketAddr, key);
    await fs.promises.writeFile(filename, JSON.stringify(value, null, 2));
    return {};
  }

  public async get(key: string): Promise<string> {
    const filename = path.join(this.bucketAddr, key);
    const value = await fs.promises.readFile(filename, "utf8");
    return JSON.parse(value);
  }
}
