import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { SimulatorContext } from "../testing/simulator";
import { IBucketClient } from "./bucket";
import { ISimulatorResource, makeResourceHandle } from "./handle-manager";
import { BucketSchema } from "./schema-resources";

export class Bucket implements IBucketClient, ISimulatorResource {
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

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    // TODO: clean up file dir?
    return;
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
    return prefix
      ? fileNames.filter((fileName) => fileName.startsWith(prefix))
      : fileNames;
  }
}
