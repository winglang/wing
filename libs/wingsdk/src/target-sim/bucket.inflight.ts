import * as crypto from "crypto";
import * as fs from "fs";
import * as os from "os";
import { dirname, join } from "path";
import { ISimulatorResourceInstance } from "./resource";
import { BucketSchema } from "./schema-resources";
import { BucketDeleteOptions, IBucketClient } from "../cloud";
import { Json } from "../std";
import { ISimulatorContext } from "../testing/simulator";

export class Bucket implements IBucketClient, ISimulatorResourceInstance {
  private readonly objectKeys: Set<string>;
  private readonly fileDir: string;
  private readonly context: ISimulatorContext;
  private readonly initialObjects: Record<string, string>;
  private readonly _public: boolean;

  public constructor(props: BucketSchema["props"], context: ISimulatorContext) {
    this.objectKeys = new Set();
    this.fileDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
    this.context = context;
    this.initialObjects = props.initialObjects ?? {};
    this._public = props.public ?? false;
  }

  public async init(): Promise<void> {
    for (const [key, value] of Object.entries(this.initialObjects)) {
      await this.context.withTrace({
        message: `Adding object from preflight (key=${key}).`,
        activity: async () => {
          return this.addFile(key, value);
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
        return this.addFile(key, value);
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
        const hash = this.hashKey(key);
        const filename = join(this.fileDir, hash);
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
        return Array.from(this.objectKeys.values()).filter((key) => {
          if (prefix) {
            return key.startsWith(prefix);
          } else {
            return true;
          }
        });
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

        if (!this.objectKeys.has(key)) {
          throw new Error(
            `Cannot provide public url for an non-existent key (key=${key})`
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

        if (!this.objectKeys.has(key) && mustExist) {
          throw new Error(`Object does not exist (key=${key}).`);
        }

        if (!this.objectKeys.has(key)) {
          return;
        }

        const hash = this.hashKey(key);
        const filename = join(this.fileDir, hash);
        await fs.promises.unlink(filename);
        this.objectKeys.delete(key);
      },
    });
  }

  private async addFile(key: string, value: string): Promise<void> {
    const hash = this.hashKey(key);
    const filename = join(this.fileDir, hash);
    const dirName = dirname(filename);
    await fs.promises.mkdir(dirName, { recursive: true });
    await fs.promises.writeFile(filename, value);
    this.objectKeys.add(key);
  }

  private hashKey(key: string): string {
    return crypto.createHash("sha512").update(key).digest("hex");
  }
}
