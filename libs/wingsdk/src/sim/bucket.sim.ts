import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { BucketSchema } from "./schema";

export async function init(_props: any): Promise<BucketSchema["attrs"]> {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-sim-"));
  return {
    bucketAddr: tmpdir,
  };
}

export async function cleanup(_attrs: BucketSchema["attrs"]): Promise<void> {
  return;
}
