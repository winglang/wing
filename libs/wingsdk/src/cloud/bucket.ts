import { Construct } from "constructs";
import { core } from "..";
import { fqnForType } from "../constants";
import { App, IResource, Resource } from "../core";
import { Json } from "../std";
import { Topic } from "./topic";

/**
 * Global identifier for `Bucket`.
 */
export const BUCKET_FQN = fqnForType("cloud.Bucket");

/**
 * Properties for `Bucket`.
 */
export interface BucketProps {
  /**
   * Whether the bucket's objects should be publicly accessible.
   * @default false
   */
  readonly public?: boolean;
}

/**
 * Represents a cloud object store.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export abstract class Bucket extends Resource {
  private readonly topics = new Map<BucketEventType, Topic>();

  /**
   * Create a new bucket.
   * @internal
   */
  public static _newBucket(
    scope: Construct,
    id: string,
    props: BucketProps = {}
  ): Bucket {
    return App.of(scope).newAbstract(BUCKET_FQN, scope, id, props);
  }

  public readonly stateful = true;

  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(scope, id);

    this.display.title = "Bucket";
    this.display.description = "A cloud object store";

    props;
  }

  /**
   * Add a file to the bucket that is uploaded when the app is deployed.
   *
   * TODO: In the future this will support uploading any `Blob` type or
   * referencing a file from the local filesystem.
   */
  public abstract addObject(key: string, body: string): void;

  protected convertTopicsToHandles() {
    const topicMap: Record<string, string> = {};

    this.topics.forEach((value, key) => {
      topicMap[key] = `\${${value.node.path}#attrs.handle}`;
    });

    return topicMap;
  }

  protected createTopic(actionType: BucketEventType): Topic {
    const hash = this.node.addr.slice(-8);

    const topic = Topic._newTopic(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-on_${actionType.toLowerCase()}-${hash}`
    );

    this.node.addDependency(topic);

    core.Resource.addConnection({
      from: this,
      to: topic,
      relationship: actionType,
    });

    return topic;
  }

  private getTopic(actionType: BucketEventType): Topic {
    if (!this.topics.has(actionType)) {
      this.topics.set(actionType, this.createTopic(actionType));
    }
    return this.topics.get(actionType) as Topic;
  }

  private createBucketEvent(
    eventNames: BucketEventType[],
    inflight: IBucketEventHandler,
    opts?: BucketOnUploadProps
  ) {
    opts;
    if (eventNames.includes(BucketEventType.PUT)) {
      this.getTopic(BucketEventType.PUT).onMessage(inflight);
    }
    if (eventNames.includes(BucketEventType.UPDATE)) {
      this.getTopic(BucketEventType.UPDATE).onMessage(inflight);
    }
    if (eventNames.includes(BucketEventType.DELETE)) {
      this.getTopic(BucketEventType.DELETE).onMessage(inflight);
    }
  }
  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  public onUpload(fn: IBucketEventHandler, opts?: BucketOnUploadProps): void {
    if (opts) {
      console.warn("bucket.onUpload does not support props yet");
    }
    this.createBucketEvent([BucketEventType.PUT], fn, opts);
  }

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  public onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteProps): void {
    if (opts) {
      console.warn("bucket.onDelete does not support props yet");
    }
    this.createBucketEvent([BucketEventType.DELETE], fn, opts);
  }

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  public onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateProps): void {
    if (opts) {
      console.warn("bucket.onUpdate does not support props yet");
    }
    this.createBucketEvent([BucketEventType.UPDATE], fn, opts);
  }

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  public onEvent(fn: IBucketEventHandler, opts?: BucketOnEventProps): void {
    if (opts) {
      console.warn("bucket.onEvent does not support props yet");
    }
    this.createBucketEvent(
      [BucketEventType.PUT, BucketEventType.UPDATE, BucketEventType.DELETE],
      fn,
      opts
    );
  }
}
/** Interface for delete method inside `Bucket` */
export interface BucketDeleteOptions {
  /**
   * Check failures on the method and retrieve errors if any
   * @Throws if this is `true`, an error is thrown if the file is not found (or any error case).
   * @default false
   */
  readonly mustExist?: boolean;
}

/**
 * Inflight interface for `Bucket`.
 */
export interface IBucketClient {
  /**
   * Put an object in the bucket.
   * @param key Key of the object.
   * @param body Content of the object we want to store into the bucket.
   * @inflight
   */
  put(key: string, body: string): Promise<void>;

  /**
   * Put a Json object in the bucket.
   * @param key Key of the object.
   * @param body Json object that we want to store into the bucket.
   * @inflight
   */
  putJson(key: string, body: Json): Promise<void>;

  /**
   * Retrieve an object from the bucket.
   * @param key Key of the object.
   * @Throws if no object with the given key exists.
   * @Returns the object's body.
   * @inflight
   */
  get(key: string): Promise<string>;

  /**
   * Retrieve a Json object from the bucket.
   * @param key Key of the object.
   * @Throws if no object with the given key exists.
   * @Returns the object's parsed Json.
   * @inflight
   */
  getJson(key: string): Promise<Json>;

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
   * Delete an existing object using a key from the bucket
   * @param key Key of the object.
   * @param opts Options available for delete an item from a bucket.
   * @inflight
   */
  delete(key: string, opts?: BucketDeleteOptions): Promise<void>;
}

export interface BucketOnUploadProps {
  /* elided */
}
export interface BucketOnDeleteProps {
  /* elided */
}
export interface BucketOnUpdateProps {
  /* elided */
}
export interface BucketOnEventProps {
  /* elided */
}

/**
 * Represents a resource with an inflight "handle" method that can be passed to
 * the bucket events.
 *
 * @inflight  `@winglang/sdk.cloud.IBucketEventHandlerClient`
 */
export interface IBucketEventHandler extends IResource {}

export interface IBucketEventHandlerClient {
  /**
   * Function that will be called when an event notification is fired.
   * @inflight
   */
  handle(key: string): Promise<void>;
}
export interface BucketEvent {
  readonly key: string;
  readonly type: BucketEventType;
}

export enum BucketEventType {
  PUT = "PUT",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
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
  /** `Bucket.putJson */
  PUT_JSON = "put_json",
  /** `Bucket.getJson */
  GET_JSON = "get_json",
  /** `Bucket.publicUrl */
  PUBLIC_URL = "public_url",
}
