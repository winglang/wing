import * as fs from "fs";
import { isAbsolute, resolve } from "path";
import { Construct } from "constructs";
import { ITopicOnMessageHandler, Topic } from "./topic";
import { fqnForType } from "../constants";
import { App } from "../core";
import { AbstractMemberError } from "../core/errors";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Json, Node, Resource, Datetime, Duration, IInflight } from "../std";

/**
 * Global identifier for `Bucket`.
 */
export const BUCKET_FQN = fqnForType("cloud.Bucket");

/**
 * Options for `Bucket`.
 */
export interface BucketProps {
  /**
   * Whether the bucket's objects should be publicly accessible.
   * @default false
   */
  readonly public?: boolean;
}

/**
 * A cloud object store.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 * @abstract
 */
export class Bucket extends Resource {
  /** @internal */
  protected readonly _topics = new Map<BucketEventType, Topic>();
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IBucketClient;

  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    if (new.target === Bucket) {
      return Resource._newFromFactory(BUCKET_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Bucket";
    Node.of(this).description = "A cloud object store";
  }

  /**
   * Add a file to the bucket that is uploaded when the app is deployed.
   *
   * TODO: In the future this will support uploading any `Blob` type or
   * referencing a file from the local filesystem.
   * @abstract
   */
  public addObject(key: string, body: string): void {
    key;
    body;
    throw new AbstractMemberError();
  }

  /**
   * Add a file to the bucket from system folder
   *
   * @param {string} key - The key or name to associate with the file.
   * @param {string} path - The path to the file on the local system.
   * @param {BufferEncoding} encoding - The encoding to use when reading the file. Defaults to "utf-8".
   */

  public addFile(
    key: string,
    path: string,
    encoding: BufferEncoding = "utf-8"
  ): void {
    const app = App.of(this);

    const data = fs.readFileSync(
      isAbsolute(path) ? path : resolve(app.entrypointDir, path),
      { encoding: encoding }
    );

    this.addObject(key, data);
  }

  /**
   * Creates a topic for subscribing to notification events
   * @param actionType
   * @returns the created topic
   */
  protected createTopic(actionType: BucketEventType): Topic {
    const topic = new Topic(this, actionType.toLowerCase());
    this.node.addDependency(topic);
    return topic;
  }

  /**
   * Gets topic form the topics map, or creates if not exists
   * @param actionType
   */
  protected getTopic(actionType: BucketEventType): Topic {
    if (!this._topics.has(actionType)) {
      this._topics.set(actionType, this.createTopic(actionType));
    }
    return this._topics.get(actionType) as Topic;
  }

  /**
   * Creates an inflight handler from inflight code
   * @param eventType
   * @param inflight
   */
  protected createTopicHandler(
    eventType: BucketEventType,
    inflight: IBucketEventHandler
  ): ITopicOnMessageHandler {
    eventType;
    inflight;
    throw new Error("Method not implemented.");
  }

  /**
   * Creates a bucket event notifier
   * @param eventNames the events to subscribe the inflight function to
   * @param inflight the code to run upon event
   * @param opts
   */
  private createBucketEvent(
    eventNames: BucketEventType[],
    inflight: IBucketEventHandler,
    opts?: BucketOnCreateOptions
  ) {
    opts;
    if (eventNames.includes(BucketEventType.CREATE)) {
      const topic = this.getTopic(BucketEventType.CREATE).onMessage(
        this.createTopicHandler(BucketEventType.CREATE, inflight)
      );
      for (const op of [
        BucketInflightMethods.PUT,
        BucketInflightMethods.PUT_JSON,
      ]) {
        Node.of(this).addConnection({
          source: this,
          sourceOp: op,
          target: topic,
          name: BucketEventType.CREATE,
        });
      }
    }
    if (eventNames.includes(BucketEventType.UPDATE)) {
      const topic = this.getTopic(BucketEventType.UPDATE).onMessage(
        this.createTopicHandler(BucketEventType.UPDATE, inflight)
      );
      for (const op of [
        BucketInflightMethods.PUT,
        BucketInflightMethods.PUT_JSON,
      ]) {
        Node.of(this).addConnection({
          source: this,
          sourceOp: op,
          target: topic,
          name: BucketEventType.UPDATE,
        });
      }
    }
    if (eventNames.includes(BucketEventType.DELETE)) {
      const topic = this.getTopic(BucketEventType.DELETE).onMessage(
        this.createTopicHandler(BucketEventType.DELETE, inflight)
      );
      for (const op of [
        BucketInflightMethods.DELETE,
        BucketInflightMethods.TRY_DELETE,
      ]) {
        Node.of(this).addConnection({
          source: this,
          sourceOp: op,
          target: topic,
          name: BucketEventType.DELETE,
        });
      }
    }
  }

  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  public onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateOptions): void {
    if (opts) {
      console.warn("bucket.onCreate does not support options yet");
    }
    this.createBucketEvent([BucketEventType.CREATE], fn, opts);
  }

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  public onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteOptions): void {
    if (opts) {
      console.warn("bucket.onDelete does not support options yet");
    }
    this.createBucketEvent([BucketEventType.DELETE], fn, opts);
  }

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  public onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateOptions): void {
    if (opts) {
      console.warn("bucket.onUpdate does not support options yet");
    }
    this.createBucketEvent([BucketEventType.UPDATE], fn, opts);
  }

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  public onEvent(fn: IBucketEventHandler, opts?: BucketOnEventOptions): void {
    if (opts) {
      console.warn("bucket.onEvent does not support options yet");
    }
    this.createBucketEvent(
      [BucketEventType.CREATE, BucketEventType.UPDATE, BucketEventType.DELETE],
      fn,
      opts
    );
  }
}

/**
 * Metadata of a bucket object.
 */
export interface ObjectMetadata {
  /** The size of the object in bytes. */
  readonly size: number;

  /** The time the object was last modified. */
  readonly lastModified: Datetime;

  /** The content type of the object, if it is known. */
  readonly contentType?: string;
}

/**
 * Options for `Bucket.get()`.
 */
export interface BucketGetOptions {
  /**
   * The starting byte to read from.
   * @default - undefined
   */
  readonly startByte?: number;

  /**
   * The ending byte to read up to (including).
   * @default - undefined
   */
  readonly endByte?: number;
}

/**
 * Options for `Bucket.tryGet()`.
 */
export interface BucketTryGetOptions extends BucketGetOptions {}

/**
 * Options for `Bucket.put()`.
 */
export interface BucketPutOptions {
  /**
   * The HTTP Content-Type of the object.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
   * @default - Determined by file extension or fallback to "application/octet-stream"
   */
  readonly contentType: string;
}

/**
 * Options for `Bucket.delete()`.
 */
export interface BucketDeleteOptions {
  /**
   * Check failures on the method and retrieve errors if any
   * @Throws if this is `true`, an error is thrown if the file is not found (or any error case).
   * @default false
   */
  readonly mustExist?: boolean;
}

/**
 * Specifies the action permitted by a presigned URL for a bucket.
 */
export enum BucketSignedUrlAction {
  /**
   * Represents a HTTP GET request for a presigned URL, allowing read access for an object in the bucket.
   */
  DOWNLOAD = "DOWNLOAD",
  /**
   * Represents a HTTP PUT request for a presigned URL, allowing write access for an object in the bucket.
   */
  UPLOAD = "UPLOAD",
}

/**
 * Options for `Bucket.signedUrl()`.
 */
export interface BucketSignedUrlOptions {
  /**
   * The duration for the signed URL to expire.
   * @default 15m
   */
  readonly duration?: Duration;

  /**
   * The action allowed by the signed URL.
   * @default BucketSignedUrlAction.DOWNLOAD
   */
  readonly action?: BucketSignedUrlAction;
}

/**
 * Inflight interface for `Bucket`.
 */
export interface IBucketClient {
  /**
   * Check if an object exists in the bucket.
   * @param key Key of the object.
   * @inflight
   */
  exists(key: string): Promise<boolean>;

  /**
   * Put an object in the bucket.
   * @param key Key of the object.
   * @param body Content of the object we want to store into the bucket.
   * @param options Additional options
   * @inflight
   */
  put(key: string, body: string, options?: BucketPutOptions): Promise<void>;

  /**
   * Put a Json object in the bucket.
   * @param key Key of the object.
   * @param body Json object that we want to store into the bucket.
   * @inflight
   */
  putJson(key: string, body: Json): Promise<void>;

  /**
   * Retrieve an object from the bucket.
   * If the bytes returned are not a valid UTF-8 string, an error is thrown.
   * @param key Key of the object.
   * @param options Additional get options
   * @Throws if no object with the given key exists.
   * @Returns the object's body.
   * @inflight
   */
  get(key: string, options?: BucketGetOptions): Promise<string>;

  /**
   * Get an object from the bucket if it exists
   * If the bytes returned are not a valid UTF-8 string, an error is thrown.
   * @param key Key of the object.
   * @param options Additional get options
   * @returns the contents of the object as a string if it exists, nil otherwise
   * @inflight
   */
  tryGet(
    key: string,
    options?: BucketTryGetOptions
  ): Promise<string | undefined>;

  /**
   * Retrieve a Json object from the bucket.
   * @param key Key of the object.
   * @Throws if no object with the given key exists.
   * @Returns the object's parsed Json.
   * @inflight
   */
  getJson(key: string): Promise<Json>;

  /**
   * Gets an object from the bucket if it exists, parsing it as Json.
   * @param key Key of the object.
   * @returns the contents of the object as Json if it exists, nil otherwise
   * @inflight
   */
  tryGetJson(key: string): Promise<Json | undefined>;

  /**
   * Delete an existing object using a key from the bucket
   * @param key Key of the object.
   * @param opts Options available for delete an item from a bucket.
   * @inflight
   */
  delete(key: string, opts?: BucketDeleteOptions): Promise<void>;

  /**
   * Delete an object from the bucket if it exists.
   * @param key Key of the object.
   * @returns the result of the delete operation
   * @inflight
   */
  tryDelete(key: string): Promise<boolean>;

  /**
   * Retrieve existing objects keys from the bucket.
   * @param prefix Limits the response to keys that begin with the specified prefix.
   * @returns a list of keys or an empty array if the bucket is empty.
   * @inflight
   */
  list(prefix?: string): Promise<string[]>;

  /**
   * Returns a url to the given file.
   * @Throws if the file is not public or if object does not exist.
   * @inflight
   */
  publicUrl(key: string): Promise<string>;

  /**
   * Returns a signed url to the given file.
   * @Throws if object does not exist.
   * @param key The key to access the cloud object
   * @param options The signedUrlOptions where you can provide the configurations of the signed url
   * @returns A string representing the signed url of the object which can be used to download in any downstream system
   * @inflight
   */
  signedUrl(key: string, options?: BucketSignedUrlOptions): Promise<string>;

  /**
   * Get the metadata of an object in the bucket.
   * @param key Key of the object.
   * @Throws if there is no object with the given key.
   * @inflight
   */
  metadata(key: string): Promise<ObjectMetadata>;

  /**
   * Copy an object to a new location in the bucket. If the destination object
   * already exists, it will be overwritten.
   * @param srcKey The key of the source object you wish to copy.
   * @param dstKey The key of the destination object after copying.
   * @throws if `srcKey` object doesn't exist.
   * @inflight
   */
  copy(srcKey: string, dstKey: string): Promise<void>;

  /**
   * Move an object to a new location in the bucket. If the destination object
   * already exists, it will be overwritten. Returns once the renaming is finished.
   * @param srcKey The key of the source object you wish to rename.
   * @param dstKey The key of the destination object after renaming.
   * @throws if `srcKey` object doesn't exist or if it matches `dstKey`.
   * @inflight
   */
  rename(srcKey: string, dstKey: string): Promise<void>;
}

/**
 * `onCreate` event options
 */
export interface BucketOnCreateOptions {}

/**
 * `onDelete` event options
 */
export interface BucketOnDeleteOptions {}

/**
 * `onUpdate` event options
 */
export interface BucketOnUpdateOptions {}

/**
 * `onEvent` options
 */
export interface BucketOnEventOptions {}

/**
 * A resource with an inflight "handle" method that can be passed to
 * the bucket events.
 *
 * @inflight `@winglang/sdk.cloud.IBucketEventHandlerClient`
 */
export interface IBucketEventHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IBucketEventHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * the bucket events.
 *
 */
export interface IBucketEventHandlerClient {
  /**
   * Function that will be called when an event notification is fired.
   * @inflight
   */
  handle(key: string, type: BucketEventType): Promise<void>;
}

/**
 * On_event notification payload- will be in use after solving issue: https://github.com/winglang/wing/issues/1927
 */
export interface BucketEvent {
  /**
   * The bucket key that triggered the event
   */
  readonly key: string;
  /**
   * Type of event
   */
  readonly type: BucketEventType;
}

/**
 * Bucket events to subscribe to
 */
export enum BucketEventType {
  /**
   * Create
   */
  CREATE = "onCreate",
  /**
   * Delete
   */
  DELETE = "onDelete",
  /**
   * Update
   */
  UPDATE = "onUpdate",
}

/**
 * List of inflight operations available for `Bucket`.
 * @internal
 */
export enum BucketInflightMethods {
  /** `Bucket.put` */
  PUT = "put",
  /** `Bucket.get` */
  GET = "get",
  /** `Bucket.list` */
  LIST = "list",
  /** `Bucket.delete` */
  DELETE = "delete",
  /** `Bucket.putJson` */
  PUT_JSON = "putJson",
  /** `Bucket.getJson` */
  GET_JSON = "getJson",
  /** `Bucket.publicUrl` */
  PUBLIC_URL = "publicUrl",
  /** `Bucket.exists` */
  EXISTS = "exists",
  /** `Bucket.tryGet` */
  TRY_GET = "tryGet",
  /** `Bucket.tryGetJson` */
  TRY_GET_JSON = "tryGetJson",
  /** `Bucket.tryDelete` */
  TRY_DELETE = "tryDelete",
  /** `Bucket.signedUrl` */
  SIGNED_URL = "signedUrl",
  /** `Bucket.metadata` */
  METADATA = "metadata",
  /** `Bucket.copy` */
  COPY = "copy",
  /** `Bucket.rename` */
  RENAME = "rename",
}
