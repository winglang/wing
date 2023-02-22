import { Construct } from "constructs";
import { Polycons } from "polycons";
import { InflightError, InflightErrorCode } from "./error";
import { Code, Resource } from "../core";

/**
 * Global identifier for `Bucket`.
 */
export const BUCKET_TYPE = "wingsdk.cloud.Bucket";

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
 * Functionality shared between all `Bucket` implementations.
 */
export abstract class BucketBase extends Resource {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: BucketProps) {
    super(scope, id);

    this.display.title = "Bucket";
    this.display.description = "A cloud object store";

    if (!scope) {
      return;
    }

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

/**
 * Represents a cloud object store.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends BucketBase {
  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(BUCKET_TYPE, scope, id, props) as Bucket;
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }

  public addObject(key: string, body: string): void {
    key;
    body;
    throw new Error("Method not implemented.");
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
   * Retrieve an object from the bucket.
   * @param key Key of the object.
   * @throws if no object with the given key exists.
   * @returns the object's body.
   * @inflight
   */
  get(key: string): Promise<string>;

  /**
   * Retrieve an object from the bucket, if it exists.
   * @param key Key of the object.
   * @throws if there is any error other than the object not existing.
   * @returns the object's body, if it exists
   * @inflight
   */
  tryGet(key: string): Promise<string | undefined>;

  /**
   * Retrieve existing objects keys from the bucket.
   * @param prefix Limits the response to keys that begin with the specified prefix.
   * @returns a list of keys or an empty array if the bucket is empty.
   * @inflight
   */
  list(prefix?: string): Promise<string[]>;

  /**
   * Delete an existing object using a key from the bucket
   * @param key Key of the object.
   * @param opts Options available for delete an item from a bucket.
   * @inflight
   */
  delete(key: string, opts?: BucketDeleteOptions): Promise<void>;
}

/**
 * Base class for inflight `Bucket` implementations.
 * @internal
 */
export abstract class BucketClientBase implements IBucketClient {
  public abstract put(key: string, body: string): Promise<void>;
  public abstract get(key: string): Promise<string>;
  public async tryGet(key: string): Promise<string | undefined> {
    try {
      return await this.get(key);
    } catch (e) {
      if (
        e instanceof InflightError &&
        e.code === InflightErrorCode.NOT_FOUND
      ) {
        return undefined;
      }
      // We haven't seen this error before, so we rethrow it.
      throw e;
    }
  }
  public abstract list(prefix?: string): Promise<string[]>;
  public abstract delete(
    key: string,
    opts?: BucketDeleteOptions
  ): Promise<void>;
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
}
