import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { SimulatorContext } from "../testing/simulator";
import { BucketSchema } from "./schema-resources";

export async function start(
  _props: any,
  _context: SimulatorContext
): Promise<BucketSchema["attrs"]> {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-sim-"));
  return {
    bucketAddr: tmpdir,
  };
}

export async function stop(_attrs: BucketSchema["attrs"]): Promise<void> {
  return;
}
