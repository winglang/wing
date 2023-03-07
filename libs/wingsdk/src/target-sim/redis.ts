import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { RedisSchema, REDIS_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as redis from "../redis";
import * as core from "../core";

/**
 * Simulator implementation of `redis.Redis`.
 *
 * @inflight `@winglang/sdk.redis.IRedisClient`
 */
export class Redis extends redis.Redis implements ISimulatorResource {
  private readonly password: string;

  constructor(scope: Construct, id: string, props: redis.RedisProps) {
    super(scope, id, props);

    this.password = props.password;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: RedisSchema = {
      type: REDIS_TYPE,
      path: this.node.path,
      props: {
        password: this.password,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource("redis", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient("redis", this);
  }

  // TODO: kill container on sim shutdown
}

Redis._annotateInflight("get_c", {});
