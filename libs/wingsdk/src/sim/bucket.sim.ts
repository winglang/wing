import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export async function init(_props: any): Promise<{ bucketAddr: string }> {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-sim-"));
  return {
    bucketAddr: tmpdir,
  };
}
