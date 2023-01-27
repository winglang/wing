import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket";
import { StorageBucketIamMember } from "@cdktf/provider-google/lib/storage-bucket-iam-member";
import { Construct } from "constructs";
import { App } from "./app";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * GCP implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase {
  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    const bucket = new StorageBucket(this, "Default", {
      name: this.node.addr, // TODO
      location: App.of(this).region,
      publicAccessPrevention: props.public ? "enforced" : undefined,
    });

    if (props.public) {
      // https://cloud.google.com/storage/docs/access-control/making-data-public#terraform
      new StorageBucketIamMember(this, "PublicAccessIamMember", {
        bucket: bucket.name,
        role: "roles/storage.objectViewer",
        member: "allUsers",
      });
    }
  }

  /** @internal */
  public _bind(_inflightHost: core.IInflightHost, _ops: string[]): void {
    // TODO: support functions once tfgcp functions are implemented
    throw new Error("Method not implemented.");
  }

  /** @internal */
  public _toInflight(): core.Code {
    throw new Error("Method not implemented.");
  }
}
