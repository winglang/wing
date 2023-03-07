import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App, Resource } from "../core";

/**
 * Global identifier for `Bucket`.
 */
export const REDIS_FQN = fqnForType("redis.Redis");

export interface RedisProps {
  /**
   * The redis server's password.
   */
  readonly password: string;
}

/**
 * Represents a cloud redis db.
 *
 * @inflight `@winglang/sdk.redis.IRedisClient`
 */
export abstract class Redis extends Resource {
  /**
   * Create a new redis.
   * @internal
   */
  public static _newRedis(
    scope: Construct,
    id: string,
    props: RedisProps
  ): Redis {
    return App.of(scope).newAbstract(REDIS_FQN, scope, id, props);
  }

  public readonly stateful = false; // TODO: redis persistence

  constructor(scope: Construct, id: string, props: RedisProps) {
    super(scope, id);

    this.display.title = "Redis";
    this.display.description = "A Redis server";

    props;
  }
}

/**
 * Inflight interface for `Redis`.
 */
export interface IRedisClient {
  /**
   * Get underlying redis client.
   * @inflight
   */
  get_c(): Promise<any>;
}
