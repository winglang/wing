import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { BucketSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase implements ISimulatorResource {
  private readonly public: boolean;
  private readonly initialObjects: Record<string, string> = {};
  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;
  }

  public addObject(key: string, body: string): void {
    this.initialObjects[key] = body;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: BucketSchema = {
      type: cloud.BUCKET_TYPE,
      path: this.node.path,
      props: {
        public: this.public,
        initialObjects: this.initialObjects,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource("bucket", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient("bucket", this);
  }
}

Bucket._annotateInflight("put", {});
Bucket._annotateInflight("get", {});
Bucket._annotateInflight("delete", {});
Bucket._annotateInflight("list", {});
