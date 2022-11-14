import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { ISimulatorContext } from "../testing/simulator";
import { IBucketClient } from "./bucket";
import { ISimulatorResource } from "./resource";
import { BucketSchema } from "./schema-resources";

export class Bucket implements IBucketClient, ISimulatorResource {
  private readonly fileDir: string;
  private readonly context: ISimulatorContext;
  public constructor(
    _props: BucketSchema["props"],
    context: ISimulatorContext
  ) {
    this.fileDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
    this.context = context;
  }

  public async init(): Promise<void> {
    this.context.addTrace({
      message: "Bucket created.",
    });
  }

  public async cleanup(): Promise<void> {
    // TODO: clean up file dir?
    this.context.addTrace({
      message: "Bucket deleted.",
    });
  }

  public async put(key: string, value: string): Promise<void> {
    try {
      const filename = join(this.fileDir, key);
      await fs.promises.writeFile(filename, value);
      this.context.addTrace({
        message: `Put (key=${key}) operation succeeded.`,
      });
    } catch (e) {
      this.context.addTrace({
        message: `Put (key=${key}) operation failed.`,
      });
      throw e;
    }
  }

  public async get(key: string): Promise<string> {
    try {
      const filename = join(this.fileDir, key);
      const value = await fs.promises.readFile(filename, "utf8");
      this.context.addTrace({
        message: `Get (key=${key}) operation succeeded.`,
      });
      return value;
    } catch (e) {
      this.context.addTrace({
        message: `Get (key=${key}) operation failed.`,
      });
      throw e;
    }
  }

  public async list(prefix?: string): Promise<string[]> {
    try {
      const fileNames = await fs.promises.readdir(this.fileDir);
      const filtered = prefix
        ? fileNames.filter((fileName) => fileName.startsWith(prefix))
        : fileNames;
      this.context.addTrace({
        message: `List (prefix=${prefix ?? "null"}) operation succeeded.`,
      });
      return filtered;
    } catch (e) {
      this.context.addTrace({
        message: `List (prefix=${prefix ?? "null"}) operation failed.`,
      });
      throw e;
    }
  }
}
