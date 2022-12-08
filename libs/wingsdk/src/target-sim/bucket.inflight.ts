import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { DeleteFromBucketOptions, IBucketClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";
import { ISimulatorResourceInstance } from "./resource";
import { BucketSchema } from "./schema-resources";

export class Bucket implements IBucketClient, ISimulatorResourceInstance {
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
    return;
  }

  public async cleanup(): Promise<void> {
    // TODO: clean up file dir?
    return;
  }

  public async put(key: string, value: string): Promise<void> {
    return this.context.withTrace({
      message: `Put (key=${key}).`,
      activity: async () => {
        const filename = join(this.fileDir, key);
        await fs.promises.writeFile(filename, value);
      },
    });
  }

  public async get(key: string): Promise<string> {
    return this.context.withTrace({
      message: `Get (key=${key}).`,
      activity: async () => {
        const filename = join(this.fileDir, key);
        return fs.promises.readFile(filename, "utf8");
      },
    });
  }

  public async list(prefix?: string): Promise<string[]> {
    return this.context.withTrace({
      message: `List (prefix=${prefix ?? "null"}).`,
      activity: async () => {
        const fileNames = await fs.promises.readdir(this.fileDir);
        return prefix
          ? fileNames.filter((fileName) => fileName.startsWith(prefix))
          : fileNames;
      },
    });
  }

  public async delete(
    key: string,
    opts?: DeleteFromBucketOptions
  ): Promise<boolean | void> {
    return this.context.withTrace({
      message: `Delete (key=${key}).`,
      activity: async () => {
        if (opts?.mustExists) {
          try {
            // check fi they exists
            const filePath = join(this.fileDir, key);
            const fileExists = fs.existsSync(filePath);

            if (!fileExists) throw Error("File must exists");

            return await fs.promises.unlink(filePath);
          } catch (er) {
            throw er;
          }
        }

        // we just try to delete the file if must_exists is disabled
        return fs.promises.unlink(join(this.fileDir, key));
      },
    });
  }
}
