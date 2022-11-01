import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, NodeJsCode } from "../core";
import { Function } from "./function";
import { IResourceSim } from "./handle-manager";
import { IResource } from "./resource";
import { BucketSchema } from "./schema-resources";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@monadahq/wingsdk.sim.IBucketClient`
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
  public get _handle(): string {
    return `\${${this.node.path}#attrs.handle}`;
  }

  /**
   * @internal
   */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("buckets can only be captured by a sim.Function for now");
    }

    this.callers.push(captureScope.node.path);

    const env = `BUCKET_ADDR__${this.node.id}`;
    captureScope.addEnvironment(env, this._handle);

    captureScope.node.addDependency(this);

    return NodeJsCode.fromInline(
      `HandleManager.findInstance(process.env["${env}"])`
    );
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Bucket`.
 */
export interface IBucketClient extends cloud.IBucketClient, IResourceSim {}
