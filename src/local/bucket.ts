import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { LOCAL_CLIENTS_PATH } from "../constants";
import { CaptureMetadata, Code, NodeJsCode } from "../core";
import { Function } from "./function";
import { IResource } from "./resource";
import { BucketSchema } from "./schema";

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

  public capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("buckets can only be captured by a function for now");
    }
    return NodeJsCode.fromInline(
      `new (require("${LOCAL_CLIENTS_PATH}")).BucketClient("${this.node.id}");`
    );
  }
}
