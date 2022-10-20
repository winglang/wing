import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { BUCKET_TYPE } from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";
import { Function } from "./function";
import { IResource } from "./resource";
import { BucketSchema } from "./schema-resources";

/**
 * Simulator implementation of `cloud.Bucket`.
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
      type: BUCKET_TYPE,
      props: {
        public: this.public,
      },
      attrs: {} as any,
      callers: this.callers,
      callees: this.callees,
    };
  }

  private get addr(): string {
    return `\${${this.node.path}#attrs.bucketAddr}`;
  }

  /**
   * @internal
   */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("buckets can only be captured by a sim.Bucket for now");
    }

    this.callers.push(captureScope.node.path);

    const env = `BUCKET_ADDR__${this.node.id}`;
    captureScope.addEnvironment(env, this.addr);

    return InflightClient.for(__filename, "BucketClient", [
      `process.env["${env}"]`,
    ]);
  }
}
