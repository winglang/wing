import * as fs from "fs";
import * as path from "path";
import { IBucketClient } from "./bucket";

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
}
