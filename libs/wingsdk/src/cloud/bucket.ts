import { Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code } from "../core";
import { Resource } from "./resource";

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
 * @inflight `@monadahq/wingsdk.cloud.IBucketClient`
 */
export class Bucket extends BucketBase {
  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(BUCKET_TYPE, scope, id, props) as Bucket;
  }

  /**
   * @internal
   */
  public _capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
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
   * Retrieve an object from the bucket. Throws if no object with the given key
   * exists.
   */
  get(key: string): Promise<string>;
}

/**
 * List of inflight operations available for `Bucket`.
 */
export enum BucketInflightMethods {
  /** `Bucket.put` */
  PUT = "put",
  /** `Bucket.get` */
  GET = "get",
}
