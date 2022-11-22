import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
import { IResource } from "./resource";
import { BucketSchema } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/wingsdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase implements IResource {
  private readonly public: boolean;
  private readonly inbound = new Array<string>();
  private readonly outbound = new Array<string>();
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
      inbound: this.inbound,
      outbound: this.outbound,
    };
  }

  /** @internal */
  public _addInbound(...resources: string[]) {
    this.inbound.push(...resources);
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return bindSimulatorResource("bucket", this, captureScope);
  }
}
