import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, Policies, Resource } from "../core";

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
    if (!scope) {
      return;
    }

    props;
  }
}

/**
 * Represents a cloud object store.
 *
 * @inflight `@winglang/wingsdk.cloud.IBucketClient`
 */
export class Bucket extends BucketBase {
  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(BUCKET_TYPE, scope, id, props) as Bucket;
  }

  /**
   * @internal
   */
  public _bind(_host: Resource, _policies: Policies): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Bucket`.
 */
export interface IBucketClient {
  /**
   * Put an object in the bucket.
   */
  put(key: string, body: string): Promise<void>;

  /**
   * Retrieve an object from the bucket.
   * @Throws if no object with the given key exists.
   * @Returns the object's body.
   */
  get(key: string): Promise<string>;

  /**
   * Retrieve existing objects keys from the bucket.
   * @param prefix Limits the response to keys that begin with the specified prefix
   * @returns a list of keys or an empty array if the bucket is empty.
   */
  list(prefix?: string): Promise<string[]>;
}

/**
 * List of inflight operations available for `Bucket`.
 */
export enum BucketInflightMethods {
  /** `Bucket.put` */
  PUT = "put",
  /** `Bucket.get` */
  GET = "get",
  /** `Bucket.list` */
  LIST = "list",
}
