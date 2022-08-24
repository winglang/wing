import type { BucketSchema } from "@monadahq/wing-local";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { CLIENTS_PACKAGE_PATH } from "../constants";
import { Capture, Code, NodeJsCode } from "../core";
import { Function } from "./function";
import { IResource } from "./resource";

export class Bucket
  extends cloud.BucketBase
  implements cloud.IBucket, IResource
{
  private readonly public: boolean;
  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;
  }

  /** @internal */
  public _toResourceSchema(): BucketSchema {
    return {
      id: this.node.id,
      type: "cloud.Bucket",
      path: this.node.path,
      props: {
        public: this.public,
      },
      callers: [],
      callees: [],
    };
  }

  public capture(consumer: any, _capture: Capture): Code {
    if (!(consumer instanceof Function)) {
      throw new Error("buckets can only be captured by a function for now");
    }
    return NodeJsCode.fromInline(
      `new (require("${CLIENTS_PACKAGE_PATH}")).local.BucketClient("${this.node.id}");`
    );
  }
}
