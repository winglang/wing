import { Construct } from "constructs";
import { Topic } from "./topic";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, IResource, Resource } from "../std";
import { convertBetweenHandlers } from "../utils/convert";

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

  /** @internal */
  protected readonly _topics = new Map<BucketEventType, Topic>();
  public readonly stateful = true;

  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(scope, id);

    this.display.title = "Bucket";
    this.display.description = "A cloud object store";

    this._addInflightOps(
      BucketInflightMethods.DELETE,
      BucketInflightMethods.GET,
      BucketInflightMethods.GET_JSON,
      BucketInflightMethods.LIST,
      BucketInflightMethods.PUT,
      BucketInflightMethods.PUT_JSON,
      BucketInflightMethods.PUBLIC_URL
    );

    props;
  }

  /**
   * Add a file to the bucket that is uploaded when the app is deployed.
   *
   * TODO: In the future this will support uploading any `Blob` type or
   * referencing a file from the local filesystem.
   */
  public abstract addObject(key: string, body: string): void;

  /**
   * creates a topic for subscribing to notification events
   * @param actionType
   * @returns the created topi
   */
  protected createTopic(actionType: BucketEventType): Topic {
    const topic = Topic._newTopic(
      this,
      `${this.node.id}-on_${actionType.toLowerCase()}`
    );

    this.node.addDependency(topic);

    Resource.addConnection({
      from: this,
      to: topic,
      relationship: actionType,
    });

    return topic;
  }

  /**
   * gets topic form the topics map, or creates if not exists
   * @param actionType
   * @returns
   */
  private getTopic(actionType: BucketEventType): Topic {
    if (!this._topics.has(actionType)) {
      this._topics.set(actionType, this.createTopic(actionType));
    }
    return this._topics.get(actionType) as Topic;
  }

  /**
   * resolves the path to the bucket.onevent.inflight file
   */
  protected eventHandlerLocation(): string {
    throw new Error(
      "please specify under the target file (to get the right relative path)"
    );
  }

  /**
   * creates an inflight handler from inflight code
   * @param eventType
   * @param inflight
   * @returns
   */
  private createInflightHandler(
    eventType: BucketEventType,
    inflight: IBucketEventHandler
  ): IResource {
    const hash = inflight.node.addr.slice(-8);
    return convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.getTopic(eventType).node.id}-eventHandler-${hash}`,
      inflight,
      // since uses __dirname should be specified under the target directory
      this.eventHandlerLocation(),
      "BucketEventHandlerClient"
    );
  }

  /**
   * creates a bucket event notifier
   * @param eventNames the events to subscribe the inflight function to
   * @param inflight the code to run upon event
   * @param opts
   */
  private createBucketEvent(
    eventNames: BucketEventType[],
    inflight: IBucketEventHandler,
    opts?: BucketOnCreateProps
  ) {
    opts;
    if (eventNames.includes(BucketEventType.CREATE)) {
      this.getTopic(BucketEventType.CREATE).onMessage(
        this.createInflightHandler(BucketEventType.CREATE, inflight)
      );
    }
    if (eventNames.includes(BucketEventType.UPDATE)) {
      this.getTopic(BucketEventType.UPDATE).onMessage(
        this.createInflightHandler(BucketEventType.UPDATE, inflight)
      );
    }
    if (eventNames.includes(BucketEventType.DELETE)) {
      this.getTopic(BucketEventType.DELETE).onMessage(
        this.createInflightHandler(BucketEventType.DELETE, inflight)
      );
    }
  }

  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  public onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateProps): void {
    if (opts) {
      console.warn("bucket.onCreate does not support props yet");
    }
    this.createBucketEvent([BucketEventType.CREATE], fn, opts);
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
      [BucketEventType.CREATE, BucketEventType.UPDATE, BucketEventType.DELETE],
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

/**
 * on create event options
 */
export interface BucketOnCreateProps {
  /* elided */
}

/**
 * on delete event options
 */
export interface BucketOnDeleteProps {
  /* elided */
}

/**
 * on update event options
 */
export interface BucketOnUpdateProps {
  /* elided */
}

/**
 * on any event options
 */
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

/**
 * Represents a resource with an inflight "handle" method that can be passed to
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
 * on_event notification payload- will be in use after solving issue: https://github.com/winglang/wing/issues/1927
 */
export interface BucketEvent {
  /**
   * the bucket key that triggered the event
   */
  readonly key: string;
  /**
   * type of event
   */
  readonly type: BucketEventType;
}

/**
 * bucket events to subscribe to
 */
export enum BucketEventType {
  /**
   * create
   */
  CREATE = "CREATE",
  /**
   * delete
   */
  DELETE = "DELETE",
  /**
   * update
   */
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
