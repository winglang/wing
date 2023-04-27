import { join } from "path";
import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BucketSchema, BUCKET_TYPE } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

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
      type: BUCKET_TYPE,
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

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
