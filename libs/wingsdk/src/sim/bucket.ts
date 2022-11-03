import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
import { IResource } from "./resource";
import { BucketSchema } from "./schema-resources";
import { captureSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/wingsdk.sim.IBucketClient`
 */
export class Bucket extends cloud.BucketBase implements IResource {
  private readonly public: boolean;
  private readonly callers = new Array<string>();
  private readonly callees = new Array<string>();
  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;
  }

  /** @internal */
  public _toResourceSchema(): BucketSchema {
    return {
      type: cloud.BUCKET_TYPE,
      props: {
        public: this.public,
      },
      attrs: {} as any,
      callers: this.callers,
      callees: this.callees,
    };
  }

  /** @internal */
  public _addCallers(...callers: string[]) {
    this.callers.push(...callers);
  }

  /** @internal */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return captureSimulatorResource("bucket", this, captureScope);
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Bucket`.
 */
export interface IBucketClient extends cloud.IBucketClient {}
