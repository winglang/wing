import { Construct } from "constructs";
import { Container } from "./container";
import { ISimulatorResource } from "./resource";
import { RedisSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { LiftMap } from "../core";
import * as ex from "../ex";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `redis.Redis`.
 *
 * @inflight `@winglang/sdk.redis.IRedisClient`
 */
export class Redis extends ex.Redis implements ISimulatorResource {
  private readonly WING_REDIS_IMAGE =
    process.env.WING_REDIS_IMAGE ??
    // Redis version 7.0.9
    "redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0";

  private readonly hostPort: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const c = new Container(this, "Container", {
      name: "redis",
      image: this.WING_REDIS_IMAGE,
      containerPort: 6379,
    });

    if (!c.hostPort) {
      throw new Error("Failed to get host port for the redis container");
    }

    this.hostPort = c.hostPort;
  }

  public toSimulator(): ToSimulatorOutput {
    const props: RedisSchema = {
      port: this.hostPort,
    };
    return {
      type: ex.REDIS_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [ex.RedisInflightMethods.URL]: [],
      [ex.RedisInflightMethods.SET]: [],
      [ex.RedisInflightMethods.GET]: [],
      [ex.RedisInflightMethods.HSET]: [],
      [ex.RedisInflightMethods.HGET]: [],
      [ex.RedisInflightMethods.SADD]: [],
      [ex.RedisInflightMethods.SMEMBERS]: [],
      [ex.RedisInflightMethods.DEL]: [],
    };
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
