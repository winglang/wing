import * as crypto from "crypto";
import * as fs from "fs";
import { dirname, join } from "path";
import * as url from "url";
import mime from "mime-types";
import { BucketAttributes, BucketSchema } from "./schema-resources";
import { exists } from "./util";
import {
  ITopicClient,
  BucketSignedUrlOptions,
  BucketEventType,
  IBucketClient,
  ObjectMetadata,
  BucketPutOptions,
  BucketDeleteOptions,
  BucketGetOptions,
  BucketTryGetOptions,
} from "../cloud";
import { deserialize, serialize } from "../simulator/serialization";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { Datetime, Json } from "../std";

const METADATA_FILENAME = "metadata.json";

export class Bucket implements IBucketClient, ISimulatorResourceInstance {
  private readonly _fileDir: string;
  private readonly context: ISimulatorContext;
  private readonly initialObjects: Record<string, string>;
  private readonly _public: boolean;
  private readonly topicHandlers: Partial<Record<BucketEventType, string>>;
  private _metadata: Map<string, ObjectMetadata>;

  public constructor(props: BucketSchema["props"], context: ISimulatorContext) {
    this._fileDir = join(context.statedir, "files");
    this.context = context;
    this.initialObjects = props.initialObjects ?? {};
    this._public = props.public ?? false;
    this.topicHandlers = props.topics;
    this._metadata = new Map();
  }

  public async init(): Promise<BucketAttributes> {
    const fileDirExists = await exists(this._fileDir);
    if (!fileDirExists) {
      await fs.promises.mkdir(this._fileDir, { recursive: true });
    }

    const metadataFileExists = await exists(
      join(this.context.statedir, METADATA_FILENAME)
    );
    if (metadataFileExists) {
      const metadataContents = await fs.promises.readFile(
        join(this.context.statedir, METADATA_FILENAME),
        "utf-8"
      );
      const metadata = deserialize(metadataContents);
      this._metadata = new Map(metadata);
    } else {
      await fs.promises.writeFile(
        join(this.context.statedir, METADATA_FILENAME),
        serialize({})
      );
    }

    for (const [key, value] of Object.entries(this.initialObjects)) {
      await this.context.withTrace({
        message: `Adding object from preflight (key=${key}).`,
        activity: async () => {
          return this.addFile(key, value);
        },
      });
    }

    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {
    // no need to save individual files, since they are already persisted in the state dir
    // during the bucket's lifecycle
    await fs.promises.writeFile(
      join(this.context.statedir, METADATA_FILENAME),
      serialize(Array.from(this._metadata.entries())) // metadata contains Datetime values, so we need to serialize it
    );
  }

  private async notifyListeners(
    actionType: BucketEventType,
    key: string
  ): Promise<void> {
    if (!this.topicHandlers[actionType]) {
      return;
    }

    const topicClient = this.context.findInstance(
      this.topicHandlers[actionType]!
    ) as ITopicClient & ISimulatorResourceInstance;

    return topicClient.publish(key);
  }

  public async exists(key: string): Promise<boolean> {
    return this.context.withTrace({
      message: `Exists (key=${key}).`,
      activity: async () => {
        return this._metadata.has(key);
      },
    });
  }

  public async put(
    key: string,
    value: string,
    opts?: BucketPutOptions
  ): Promise<void> {
    return this.context.withTrace({
      message: `Put (key=${key}).`,
      activity: async () => {
        await this.addFile(key, value, opts?.contentType);
      },
    });
  }

  public async putJson(key: string, body: Json): Promise<void> {
    return this.context.withTrace({
      message: `Put Json (key=${key}).`,
      activity: async () => {
        await this.addFile(
          key,
          JSON.stringify(body, null, 2),
          "application/json"
        );
      },
    });
  }

  public async get(key: string, options?: BucketGetOptions): Promise<string> {
    return this.context.withTrace({
      message: `Get (key=${key}).`,
      activity: async () => {
        const hash = this.hashKey(key);
        const filename = join(this._fileDir, hash);
        try {
          const file = await fs.promises.open(filename, "r");
          const stat = await file.stat();

          let start = 0;
          if (options?.startByte !== undefined) {
            start = options.startByte;
          }

          let length = stat.size;
          if (options?.endByte !== undefined) {
            length = options.endByte + 1;
          }

          const buffer = Buffer.alloc(length - start);
          await file.read(buffer, 0, length - start, start);
          await file.close();
          return new TextDecoder("utf8", { fatal: true }).decode(buffer);
        } catch (e) {
          throw new Error(
            `Object does not exist (key=${key}): ${(e as Error).stack}`
          );
        }
      },
    });
  }

  public async tryGet(
    key: string,
    options?: BucketTryGetOptions
  ): Promise<string | undefined> {
    if (await this.exists(key)) {
      return this.get(key, options);
    }

    return undefined;
  }

  public async getJson(key: string): Promise<Json> {
    return this.context.withTrace({
      message: `Get Json (key=${key}).`,
      activity: async () => {
        const hash = this.hashKey(key);
        const filename = join(this._fileDir, hash);
        return JSON.parse(await fs.promises.readFile(filename, "utf8"));
      },
    });
  }

  public async tryGetJson(key: string): Promise<Json | undefined> {
    if (await this.exists(key)) {
      return this.getJson(key);
    }

    return undefined;
  }

  public async delete(key: string, opts?: BucketDeleteOptions): Promise<void> {
    return this.context.withTrace({
      message: `Delete (key=${key}).`,
      activity: async () => {
        const mustExist = opts?.mustExist ?? false;

        if (!this._metadata.has(key) && mustExist) {
          throw new Error(`Object does not exist (key=${key}).`);
        }

        if (!this._metadata.has(key)) {
          return;
        }

        const hash = this.hashKey(key);
        const filename = join(this._fileDir, hash);
        await fs.promises.unlink(filename);
        this._metadata.delete(key);
        await this.notifyListeners(BucketEventType.DELETE, key);
      },
    });
  }

  public async tryDelete(key: string): Promise<boolean> {
    if (await this.exists(key)) {
      await this.delete(key);
      return true;
    }

    return false;
  }

  public async list(prefix?: string): Promise<string[]> {
    return this.context.withTrace({
      message: `List (prefix=${prefix ?? "null"}).`,
      activity: async () => {
        return Array.from(this._metadata.keys()).filter((key) => {
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
        const filePath = join(this._fileDir, key);

        if (!this._metadata.has(key)) {
          throw new Error(
            `Cannot provide public url for an non-existent key (key=${key})`
          );
        }

        return url.pathToFileURL(filePath).href;
      },
    });
  }

  public async signedUrl(key: string, options?: BucketSignedUrlOptions) {
    options;
    return this.context.withTrace({
      message: `Signed URL (key=${key})`,
      activity: async () => {
        throw new Error(
          `signedUrl is not implemented yet for sim (key=${key})`
        );
      },
    });
  }

  /**
   * Get the metadata of an object in the bucket.
   * @param key Key of the object.
   * @throws if the object does not exist.
   */
  public async metadata(key: string): Promise<ObjectMetadata> {
    return this.context.withTrace({
      message: `Metadata (key=${key}).`,
      activity: async () => {
        if (!this._metadata.has(key)) {
          throw new Error(`Object does not exist (key=${key}).`);
        }
        return this._metadata.get(key)!;
      },
    });
  }

  public async copy(srcKey: string, dstKey: string): Promise<void> {
    return this.context.withTrace({
      message: `Copy (srcKey=${srcKey} to dstKey=${dstKey}).`,
      activity: async () => {
        if (!this._metadata.has(srcKey)) {
          throw new Error(`Source object does not exist (srcKey=${srcKey}).`);
        }

        const dstValue = await this.get(srcKey);
        const dstMetadata = await this.metadata(srcKey);

        await this.put(dstKey, dstValue, {
          contentType: dstMetadata.contentType ?? "application/octet-stream",
        });
      },
    });
  }

  public async rename(srcKey: string, dstKey: string): Promise<void> {
    if (srcKey === dstKey) {
      throw new Error(
        `Renaming an object to its current name is not a valid operation (srcKey=${srcKey}, dstKey=${dstKey}).`
      );
    }

    await this.copy(srcKey, dstKey);
    await this.delete(srcKey);
  }

  private async addFile(
    key: string,
    value: string,
    contentType?: string
  ): Promise<void> {
    const actionType: BucketEventType = this._metadata.has(key)
      ? BucketEventType.UPDATE
      : BucketEventType.CREATE;

    const hash = this.hashKey(key);
    const filename = join(this._fileDir, hash);
    const dirName = dirname(filename);

    await fs.promises.mkdir(dirName, { recursive: true });
    await fs.promises.writeFile(filename, value);

    const filestat = await fs.promises.stat(filename);
    const determinedContentType =
      (contentType ?? mime.lookup(key)) || "application/octet-stream";

    this._metadata.set(key, {
      size: filestat.size,
      lastModified: Datetime.fromDate(filestat.mtime),
      contentType: determinedContentType,
    });

    await this.notifyListeners(actionType, key);
  }

  private hashKey(key: string): string {
    return crypto.createHash("sha512").update(key).digest("hex").slice(-32);
  }
}
