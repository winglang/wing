import { Construct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, Resource } from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { BucketSchema } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/wingsdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase implements ISimulatorResource {
  private readonly public: boolean;
  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: BucketSchema = {
      type: cloud.BUCKET_TYPE,
      path: this.node.path,
      props: {
        public: this.public,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(captureScope: Resource, _metadata: CaptureMetadata): Code {
    return bindSimulatorResource("bucket", this, captureScope);
  }
}
