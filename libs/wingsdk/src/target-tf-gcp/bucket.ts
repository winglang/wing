import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { App } from "./app";

export class Bucket extends cloud.BucketBase {
  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    if (props.public) {
      throw new Error("Only private buckets are supported");
    }

    // TODO: generate random string with terraform?
    new StorageBucket(this, "Default", {
      name: this.node.addr,
      location: App.of(this).region,
      lifecycle: {
        // TODO: disable for test apps?
        preventDestroy: true,
      },
    });
  }

  public _bind(_inflightHost: core.IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }

  public _toInflight(): core.Code {
    throw new Error("Method not implemented.");
  }
}
