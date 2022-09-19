import { Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code } from "../core";
import { Resource } from "./resource";
import { Void } from "./shared";

/**
 * Global identifier for `Bucket`.
 */
export const BUCKET_ID = "wingsdk.cloud.Bucket";

/**
 * Properties for `Bucket`.
 */
export interface BucketProps {
  /**
   * Whether objects in the bucket are publicly accessible.
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
 */
export class Bucket extends BucketBase {
  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(BUCKET_ID, scope, id, props) as Bucket;
  }

  public capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Bucket`.
 */
export interface IBucketClient {
  put(key: string, body: string): Promise<Void>;
  get(key: string): Promise<string>;
}

/**
 * List of inflight operations available for `Bucket`.
 */
export enum BucketInflightMethods {
  PUT = "put",
  GET = "get",
}
