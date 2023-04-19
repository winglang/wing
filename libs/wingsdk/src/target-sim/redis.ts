import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { RedisSchema, REDIS_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as core from "../core";
import * as redis from "../redis";
import { IInflightHost } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

/**
 * Simulator implementation of `redis.Redis`.
 *
 * @inflight `@winglang/sdk.redis.IRedisClient`
 */
export class Redis extends redis.Redis implements ISimulatorResource {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: RedisSchema = {
      type: REDIS_TYPE,
      path: this.node.path,
      props: {},
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

Redis._annotateInflight("raw_client", {});
Redis._annotateInflight("url", {});
Redis._annotateInflight("get", {});
Redis._annotateInflight("set", {});
Redis._annotateInflight("hset", {});
Redis._annotateInflight("hget", {});
Redis._annotateInflight("sadd", {});
Redis._annotateInflight("smembers", {});
Redis._annotateInflight("del", {});
