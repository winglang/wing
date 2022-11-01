import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { IBucketClient } from "../cloud";
import { SimulatorContext } from "../testing/simulator";
import { HandleManager, makeResourceHandle } from "./handle-manager";
import { BucketSchema } from "./schema-resources";

export async function start(
  path: string,
  props: BucketSchema["props"],
  context: SimulatorContext
): Promise<BucketSchema["attrs"]> {
  const bucket = new Bucket(path, props, context);
  const handle = HandleManager.addInstance(bucket);
  return { handle };
}

export async function stop(attrs: BucketSchema["attrs"]): Promise<void> {
  HandleManager.removeInstance(attrs!.handle);
}

export class Bucket implements IBucketClient {
  public readonly handle: string;
  private readonly fileDir: string;
  public constructor(
    path: string,
    _props: BucketSchema["props"],
    context: SimulatorContext
  ) {
    this.handle = makeResourceHandle(context.simulationId, "bucket", path);
    this.fileDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
  }
  public async put(key: string, value: string): Promise<void> {
    const filename = join(this.fileDir, key);
    await fs.promises.writeFile(filename, value);
  }

  public async get(key: string): Promise<string> {
    const filename = join(this.fileDir, key);
    return fs.promises.readFile(filename, "utf8");
  }

  public async list(prefix?: string): Promise<string[]> {
    const fileNames = await fs.promises.readdir(this.fileDir);
    return fileNames.filter((fileName) => fileName.startsWith(prefix ?? ""));
  }
}
