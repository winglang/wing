import * as fs from "fs";
import * as os from "os";
import { dirname, join } from "path";
import { ISimulatorResourceInstance } from "./resource";
import { BucketSchema } from "./schema-resources";
import { exists } from "./util";
import { BucketDeleteOptions, IBucketClient } from "../cloud";
import { Json } from "../std";
import { ISimulatorContext } from "../testing/simulator";

export class Bucket implements IBucketClient, ISimulatorResourceInstance {
  private readonly fileDir: string;
  private readonly context: ISimulatorContext;
  private readonly initialObjects: Record<string, string>;
  private readonly _public: boolean;
  public constructor(props: BucketSchema["props"], context: ISimulatorContext) {
    this.fileDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
    this.context = context;
    this.initialObjects = props.initialObjects ?? {};
    this._public = props.public ?? false;
  }

  public get public(): boolean {
    return this._public;
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
        const dirName = dirname(filename);
        await fs.promises.mkdir(dirName, { recursive: true });
        await fs.promises.writeFile(filename, value);
      },
    });
  }

  public async putJson(key: string, body: Json): Promise<void> {
    return this.context.withTrace({
      message: `Put Json (key=${key}).`,
      activity: async () => {
        const filename = join(this.fileDir, key);
        await fs.promises.writeFile(filename, JSON.stringify(body, null, 2));
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

  public async getJson(key: string): Promise<Json> {
    return this.context.withTrace({
      message: `Get Json (key=${key}).`,
      activity: async () => {
        const filename = join(this.fileDir, key);
        return JSON.parse(await fs.promises.readFile(filename, "utf8"));
      },
    });
  }

  public async list(prefix?: string): Promise<string[]> {
    return this.context.withTrace({
      message: `List (prefix=${prefix ?? "null"}).`,
      activity: async () => {
        return fs.promises.readdir(`${this.fileDir}/${prefix ?? ""}`);
      },
    });
  }

  public async publicUrl(key: string): Promise<string> {
    if (!this._public) {
      throw new Error("Cannot provide public url for a non-public bucket");
    }
    return this.context.withTrace({
      message: `Public URL (key=${key}).`,
      activity: async () => {
        const filePath = join(this.fileDir, key);

        if (!(await exists(filePath))) {
          throw new Error(
            `Cannot provide public url for an non-existant key (key=${key})`
          );
        }

        return filePath;
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
