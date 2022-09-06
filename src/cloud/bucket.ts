import { Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code } from "../core";
import { IResource, Resource } from "./resource";

export interface IBucket extends IResource {}

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
export abstract class BucketBase extends Resource implements IBucket {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: BucketProps) {
    super(scope, id);
    if (!scope) {
      return;
    }

    props;
  }

  public abstract capture(
    captureScope: IConstruct,
    metadata: CaptureMetadata
  ): Code;
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

export enum BucketInflightMethods {
  PUT = "put",
  GET = "get",
}
