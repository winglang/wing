import { join } from "path";
import { Construct } from "constructs";
import { Policy } from "./policy";
import { ISimulatorResource } from "./resource";
import { BucketSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { LiftDepsMatrixRaw } from "../core";
import { ToSimulatorOutput } from "../simulator/simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.Bucket implements ISimulatorResource {
  private readonly public: boolean;
  private readonly initialObjects: Record<string, string> = {};
  private readonly policy: Policy;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;
    this.policy = new Policy(this, "Policy", { principal: this });
  }

  /** @internal */
  public get _liftMap(): LiftDepsMatrixRaw {
    return {
      [cloud.BucketInflightMethods.DELETE]: [],
      [cloud.BucketInflightMethods.GET]: [],
      [cloud.BucketInflightMethods.GET_JSON]: [],
      [cloud.BucketInflightMethods.LIST]: [],
      [cloud.BucketInflightMethods.PUT]: [],
      [cloud.BucketInflightMethods.PUT_JSON]: [],
      [cloud.BucketInflightMethods.PUBLIC_URL]: [],
      [cloud.BucketInflightMethods.EXISTS]: [],
      [cloud.BucketInflightMethods.TRY_GET]: [],
      [cloud.BucketInflightMethods.TRY_GET_JSON]: [],
      [cloud.BucketInflightMethods.TRY_DELETE]: [],
      [cloud.BucketInflightMethods.METADATA]: [],
      [cloud.BucketInflightMethods.COPY]: [],
      [cloud.BucketInflightMethods.RENAME]: [],
    };
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

  public onCreate(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateOptions | undefined
  ): void {
    super.onCreate(fn, opts);
    const topic = this.getTopic(cloud.BucketEventType.CREATE);
    this.policy.addStatement(topic, cloud.TopicInflightMethods.PUBLISH);
  }

  public onDelete(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnDeleteOptions | undefined
  ): void {
    super.onDelete(fn, opts);
    const topic = this.getTopic(cloud.BucketEventType.DELETE);
    this.policy.addStatement(topic, cloud.TopicInflightMethods.PUBLISH);
  }

  public onUpdate(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnUpdateOptions | undefined
  ): void {
    super.onUpdate(fn, opts);
    const topic = this.getTopic(cloud.BucketEventType.UPDATE);
    this.policy.addStatement(topic, cloud.TopicInflightMethods.PUBLISH);
  }

  public onEvent(
    fn: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnEventOptions
  ): void {
    super.onEvent(fn, opts);
    const createTopic = this.getTopic(cloud.BucketEventType.CREATE);
    this.policy.addStatement(createTopic, cloud.TopicInflightMethods.PUBLISH);
    const deleteTopic = this.getTopic(cloud.BucketEventType.DELETE);
    this.policy.addStatement(deleteTopic, cloud.TopicInflightMethods.PUBLISH);
    const updateTopic = this.getTopic(cloud.BucketEventType.UPDATE);
    this.policy.addStatement(updateTopic, cloud.TopicInflightMethods.PUBLISH);
  }

  protected eventHandlerLocation(): string {
    return join(__dirname, "bucket.onevent.inflight.js");
  }

  public toSimulator(): ToSimulatorOutput {
    const props: BucketSchema = {
      public: this.public,
      initialObjects: this.initialObjects,
      topics: this.convertTopicsToHandles(),
    };
    return {
      type: cloud.BUCKET_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
