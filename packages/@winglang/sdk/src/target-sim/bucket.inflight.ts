import * as crypto from "crypto";
import * as fs from "fs";
import { Server } from "http";
import { dirname, join } from "path";
import { pathToFileURL } from "url";
import busboy, { FileInfo } from "busboy";
import express from "express";
import mime from "mime-types";
import { BucketAttributes, BucketSchema } from "./schema-resources";
import { exists, isPortAvailable, listenExpress } from "./util";
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
  BUCKET_FQN,
  BucketSignedUrlAction,
  CorsHeaders,
} from "../cloud";
import { deserialize, serialize } from "../simulator/serialization";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { Datetime, Json, LogLevel, TraceType } from "../std";

export const METADATA_FILENAME = "metadata.json";

const STATE_FILENAME = "state.json";

/**
 * Contents of the state file for this resource.
 */
interface StateFileContents {
  /**
   * The last port used by the API server on a previous simulator run.
   */
  readonly lastPort?: number;
}

export class Bucket implements IBucketClient, ISimulatorResourceInstance {
  private _fileDir!: string;
  private _context: ISimulatorContext | undefined;
  private readonly initialObjects: Record<string, string>;
  private readonly _public: boolean;
  private readonly topicHandlers: Partial<Record<BucketEventType, string>>;
  private _metadata: Map<string, ObjectMetadata>;
  private readonly app: express.Application;
  private server: Server | undefined;
  private url: string | undefined;
  private port: number | undefined;

  public constructor(props: BucketSchema) {
    this.initialObjects = props.initialObjects ?? {};
    this._public = props.public ?? false;
    this.topicHandlers = props.topics;
    this._metadata = new Map();

    this.app = express();

    // Enable cors for all requests.
    this.app.use((req, res, next) => {
      const corsHeaders: CorsHeaders = {
        defaultResponse: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT",
          "Access-Control-Allow-Headers": "*",
        },
        optionsResponse: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400",
        },
      };
      const method =
        req.method && req.method.toUpperCase && req.method.toUpperCase();

      if (method === "OPTIONS") {
        for (const [key, value] of Object.entries(
          corsHeaders.optionsResponse
        )) {
          res.setHeader(key, value);
        }
        res.status(204).send();
      } else {
        for (const [key, value] of Object.entries(
          corsHeaders.defaultResponse
        )) {
          res.setHeader(key, value);
        }
        next();
      }
    });

    // Handle signed URL uploads.
    this.app.put("*", (req, res) => {
      const action = req.query.action;
      if (action !== BucketSignedUrlAction.UPLOAD) {
        return res.status(403).send("Operation not allowed");
      }

      const validUntil = req.query.validUntil?.toString();
      if (!validUntil || Date.now() > parseInt(validUntil)) {
        return res.status(403).send("Signed URL has expired");
      }

      const key = req.path.slice(1); // remove leading slash
      const hash = this.hashKey(key);
      const filename = join(this._fileDir, hash);

      const actionType: BucketEventType = this._metadata.has(key)
        ? BucketEventType.UPDATE
        : BucketEventType.CREATE;

      let fileInfo: FileInfo | undefined;

      if (req.header("content-type")?.startsWith("multipart/form-data")) {
        const bb = busboy({
          headers: req.headers,
        });
        bb.on("file", (_name, file, _info) => {
          fileInfo = _info;
          file.pipe(fs.createWriteStream(filename));
        });
        bb.on("close", () => {
          console.log("file uploaded", filename, hash);
          void this.updateMetadataAndNotify(
            key,
            actionType,
            fileInfo?.mimeType
          ).then(() => {
            res.writeHead(200, { Connection: "close" });
            res.end();
          });
        });
        req.pipe(bb);
        return;
      } else {
        const fileStream = fs.createWriteStream(filename);
        req.pipe(fileStream);

        fileStream.on("error", () => {
          res.status(500).send("Failed to save the file.");
        });

        fileStream.on("finish", () => {
          res.status(200).send();
        });

        return;
      }
    });

    // Handle signed URL downloads.
    this.app.get("*", (req, res) => {
      const action = req.query.action;
      if (action !== BucketSignedUrlAction.DOWNLOAD) {
        return res.status(403).send("Operation not allowed");
      }

      const validUntil = req.query.validUntil?.toString();
      if (!validUntil || Date.now() > parseInt(validUntil)) {
        return res.status(403).send("Signed URL has expired");
      }

      const key = req.path.slice(1); // remove leading slash
      const hash = this.hashKey(key);
      const filename = join(this._fileDir, hash);
      return res.download(filename);
    });
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<BucketAttributes> {
    this._context = context;
    this._fileDir = join(context.statedir, "files");

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
      try {
        const metadata = deserialize(metadataContents);
        this._metadata = new Map(metadata);
      } catch (e) {
        this.addTrace(
          `Failed to deserialize metadata: ${(e as Error).stack}`,
          LogLevel.ERROR
        );
      }
    }

    for (const [key, value] of Object.entries(this.initialObjects)) {
      await this.context.withTrace({
        message: `Adding object from preflight (key=${key}).`,
        activity: async () => {
          return this.addFile(key, value);
        },
      });
    }

    // Check for a previous state file to see if there was a port that was previously being used
    // if so, try to use it out of convenience
    let lastPort: number | undefined;
    const state: StateFileContents = await this.loadState();
    if (state.lastPort) {
      const portAvailable = await isPortAvailable(state.lastPort);
      if (portAvailable) {
        lastPort = state.lastPort;
      }
    }

    const { server, address } = await listenExpress(this.app, lastPort);
    this.server = server;
    this.port = address.port;
    this.url = `http://${address.address}:${address.port}`;

    this.addTrace(`Server listening on ${this.url}`, LogLevel.VERBOSE);

    return {
      url: this.url,
    };
  }

  public async cleanup(): Promise<void> {
    this.addTrace(`Closing server on ${this.url}`, LogLevel.VERBOSE);

    return new Promise((resolve, reject) => {
      this.server?.close((err) => {
        if (err) {
          return reject(err);
        }

        this.server?.closeAllConnections();
        return resolve();
      });
    });
  }

  public async plan() {
    return UpdatePlan.AUTO;
  }

  private async loadState(): Promise<StateFileContents> {
    const stateFileExists = await exists(
      join(this.context.statedir, STATE_FILENAME)
    );
    if (stateFileExists) {
      const stateFileContents = await fs.promises.readFile(
        join(this.context.statedir, STATE_FILENAME),
        "utf-8"
      );
      return JSON.parse(stateFileContents);
    } else {
      return {};
    }
  }

  private async saveState(state: StateFileContents): Promise<void> {
    fs.writeFileSync(
      join(this.context.statedir, STATE_FILENAME),
      JSON.stringify(state)
    );
  }

  public async save(): Promise<void> {
    // no need to save individual files, since they are already persisted in the state dir
    // during the bucket's lifecycle
    fs.writeFileSync(
      join(this.context.statedir, METADATA_FILENAME),
      serialize(Array.from(this._metadata.entries())) // metadata contains Datetime values, so we need to serialize it
    );

    await this.saveState({ lastPort: this.port });
  }

  private async notifyListeners(
    actionType: BucketEventType,
    key: string
  ): Promise<void> {
    if (!this.topicHandlers[actionType]) {
      return;
    }

    const topicClient = this.context.getClient(
      this.topicHandlers[actionType]!
    ) as ITopicClient;

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
        let buffer;
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

          buffer = Buffer.alloc(length - start);
          await file.read(buffer, 0, length - start, start);
          await file.close();
        } catch (e) {
          buffer = undefined;
        }

        if (!buffer) {
          throw new Error(`Object does not exist (key=${key}).`);
        }

        try {
          return new TextDecoder("utf8", { fatal: true }).decode(buffer);
        } catch (e) {
          throw new Error(
            `Object content could not be read as text (key=${key}): ${
              (e as Error).stack
            })}`
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

        return pathToFileURL(filePath).href;
      },
    });
  }

  public async signedUrl(key: string, options?: BucketSignedUrlOptions) {
    return this.context.withTrace({
      message: `Signed URL (key=${key}).`,
      activity: async () => {
        const action = options?.action ?? BucketSignedUrlAction.DOWNLOAD;
        // BUG: The `options?.duration` is supposed to be an instance of `Duration` but it is not. It's just
        // a POJO with seconds, but TypeScript thinks otherwise.
        const duration = options?.duration?.seconds ?? 900;

        if (
          action === BucketSignedUrlAction.DOWNLOAD &&
          !(await this.exists(key))
        ) {
          throw new Error(
            `Cannot provide signed url for a non-existent key (key=${key})`
          );
        }

        const url = new URL(key, this.url);
        url.searchParams.set("action", action);
        url.searchParams.set(
          "validUntil",
          String(Date.now() + duration * 1000)
        );
        return url.toString();
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

    await this.updateMetadataAndNotify(key, actionType, contentType);
  }

  private async updateMetadataAndNotify(
    key: string,
    actionType: BucketEventType,
    contentType?: string
  ): Promise<void> {
    const hash = this.hashKey(key);
    const filename = join(this._fileDir, hash);
    const filestat = await fs.promises.stat(filename);
    const determinedContentType =
      contentType ?? (mime.lookup(key) || "application/octet-stream");
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

  private addTrace(message: string, level: LogLevel): void {
    this.context.addTrace({
      data: { message },
      level,
      type: TraceType.RESOURCE,
      sourcePath: this.context.resourcePath,
      sourceType: BUCKET_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
