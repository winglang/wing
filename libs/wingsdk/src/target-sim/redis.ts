import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { RedisSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as ex from "../ex";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `redis.Redis`.
 *
 * @inflight `@winglang/sdk.redis.IRedisClient`
 */
export class Redis extends ex.Redis implements ISimulatorResource {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: RedisSchema = {
      type: ex.REDIS_FQN,
      path: this.node.path,
      props: {},
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
