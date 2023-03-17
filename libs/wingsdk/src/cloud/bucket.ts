import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App, Resource } from "../core";
import { Json } from "../std";

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
