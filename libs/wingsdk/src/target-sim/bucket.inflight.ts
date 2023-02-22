import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { ISimulatorResourceInstance } from "./resource";
import { BucketSchema } from "./schema-resources";
import { exists } from "./util";
import { BucketClientBase, BucketDeleteOptions } from "../cloud";
import { InflightError, InflightErrorCode } from "../cloud/error";
import { ISimulatorContext } from "../testing/simulator";

export class Bucket
  extends BucketClientBase
  implements ISimulatorResourceInstance
{
  private readonly fileDir: string;
  private readonly context: ISimulatorContext;
  private readonly initialObjects: Record<string, string>;
  public constructor(props: BucketSchema["props"], context: ISimulatorContext) {
    super();
    this.fileDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
    this.context = context;
    this.initialObjects = props.initialObjects ?? {};
  }

  public async init(): Promise<void> {
    for (const [key, value] of Object.entries(this.initialObjects)) {
      await this.context.withTrace({
        message: `Adding object from preflight (key=${key}).`,
        activity: async () => {
          const filename = join(this.fileDir, key);
          await fs.promises.writeFile(filename, value);
        },
      });
    }
  }

  public async cleanup(): Promise<void> {
    await fs.promises.rm(this.fileDir, { recursive: true, force: true });
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
        const filePath = join(this.fileDir, key);
        const fileExists = await exists(filePath);
        if (!fileExists) {
          throw new InflightError(
            InflightErrorCode.NOT_FOUND,
            `Key not found: ${key}`
          );
        }
        return fs.promises.readFile(filePath, "utf8");
      },
    });
  }

  public async tryGet(key: string): Promise<string> {
    return this.context.withTrace({
      message: `TryGet (key=${key}).`,
      activity: async () => {
        const filePath = join(this.fileDir, key);
        const fileExists = await exists(filePath);
        if (!fileExists) {
          return undefined;
        }
        return fs.promises.readFile(filePath, "utf8");
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

  public async delete(key: string, opts?: BucketDeleteOptions): Promise<void> {
    return this.context.withTrace({
      message: `Delete (key=${key}).`,
      activity: async () => {
        const mustExist = opts?.mustExist ?? false;
        const filePath = join(this.fileDir, key);

        if (!mustExist) {
          // check if the file exists
          const fileExists = await exists(filePath);

          if (!fileExists) {
            // nothing to delete, return without throwing
            return;
          }
        }

        // unlink file from the filesystem
        return fs.promises.unlink(filePath);
      },
    });
  }
}
