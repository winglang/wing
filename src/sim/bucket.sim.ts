import fs from "node:fs/promises";
import { IBucketClient } from "../cloud";
import { BucketSchema } from "./schema";
import { filenamify } from "./util.sim";

export interface BucketResource extends IBucketClient {
  type: BucketSchema["type"];
}

export interface CreateBucketResourceOptions {
  /**
   * The local directory for the bucket files.
   */
  bucketDirectory: string;
}

export function createBucketResource({
  bucketDirectory,
}: CreateBucketResourceOptions): BucketResource {
  return {
    type: "cloud.Bucket",
    async put(key, value) {
      const path = filenamify(key);
      await fs.writeFile(`${bucketDirectory}/${path}`, value);
      return {};
    },
    async get(key) {
      const path = filenamify(key);
      return fs.readFile(`${bucketDirectory}/${path}`, "utf8");
    },
  };
}
