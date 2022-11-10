import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { ISimulatorContext } from "../testing/simulator";
import { IBucketClient } from "./bucket";
import { ISimulatorResource } from "./resource";
import { BucketSchema } from "./schema-resources";

export class Bucket implements IBucketClient, ISimulatorResource {
  private readonly fileDir: string;
  public constructor(
    _props: BucketSchema["props"],
    _context: ISimulatorContext
  ) {
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
