import { join } from "path";
import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BucketSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.Bucket implements ISimulatorResource {
  private readonly public: boolean;
  private readonly initialObjects: Record<string, string> = {};
  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.BucketInflightMethods.DELETE,
      cloud.BucketInflightMethods.GET,
      cloud.BucketInflightMethods.GET_JSON,
      cloud.BucketInflightMethods.LIST,
      cloud.BucketInflightMethods.PUT,
      cloud.BucketInflightMethods.PUT_JSON,
      cloud.BucketInflightMethods.PUBLIC_URL,
      cloud.BucketInflightMethods.EXISTS,
      cloud.BucketInflightMethods.TRY_GET,
      cloud.BucketInflightMethods.TRY_GET_JSON,
      cloud.BucketInflightMethods.TRY_DELETE,
      cloud.BucketInflightMethods.METADATA,
    ];
  }
  /**
   * Iterates over the topics and supply their sim handler
   * @returns an object of Bucket event types (keys) and their topic handlers (values)
   */
  protected convertTopicsToHandles() {
    const topicMap: Record<string, string> = {};

    this._topics.forEach((value, key) => {
      topicMap[key] = simulatorHandleToken(value);
    });

    return topicMap;
  }

  public addObject(key: string, body: string): void {
    this.initialObjects[key] = body;
  }

  protected eventHandlerLocation(): string {
    return join(__dirname, "bucket.onevent.inflight.js");
  }

  public toSimulator(): BaseResourceSchema {
    const schema: BucketSchema = {
      type: cloud.BUCKET_FQN,
      path: this.node.path,
      props: {
        public: this.public,
        initialObjects: this.initialObjects,
        topics: this.convertTopicsToHandles(),
      },
      attrs: {} as any,
    };
    return schema;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
