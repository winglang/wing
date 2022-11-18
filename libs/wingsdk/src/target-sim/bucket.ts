import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { BucketSchema } from "./schema-resources";
import { captureSimulatorResource } from "./util";

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

  public toSimulatorSchema(): BaseResourceSchema {
    const schema: BucketSchema = {
      path: this.node.path,
      type: cloud.BUCKET_TYPE,
      props: {
        public: this.public,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return captureSimulatorResource("bucket", this, captureScope);
  }
}
