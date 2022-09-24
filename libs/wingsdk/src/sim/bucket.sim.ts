import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { BucketSchema } from "./schema";

export async function init(
  _props: BucketSchema["props"]
): Promise<NonNullable<BucketSchema["attributes"] & BucketSchema["props"]>> {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-sim-"));
  return {
    bucketAddr: tmpdir,
  };
}
