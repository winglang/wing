import { Polycons } from "@monadahq/polycons";
import { Construct } from "constructs";
import { Capture, Code } from "../core";
import { IResource, Resource } from "./resource";

export interface IBucket extends IResource {}

/**
 * Global identifier for `Bucket`.
 */
export const BUCKET_ID = "wingsdk.cloud.Bucket";

/**
 * Properties for `Bucket`.
 */
export interface BucketProps {}

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

  public abstract capture(consumer: any, capture: Capture): Code;
}

/**
 * Represents a cloud object store.
 */
export class Bucket extends BucketBase {
  constructor(scope: Construct, id: string, props: BucketProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(BUCKET_ID, scope, id, props) as Bucket;
  }

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }
}
