import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App, Resource } from "../core";

/**
 * Global identifier for `Bucket`.
 */
export const REDIS_FQN = fqnForType("redis.Redis");

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
  public static _newRedis(scope: Construct, id: string): Redis {
    return App.of(scope).newAbstract(REDIS_FQN, scope, id);
  }

  public readonly stateful = false; // TODO: redis persistence

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.display.title = "Redis";
    this.display.description = "A Redis server";
  }
}

/**
 * Inflight interface for `Redis`.
 */
export interface IRedisClient {
  /**
   * Get raw redis client (currently IoRedis).
   * @inflight
   */
  rawClient(): Promise<any>;

  /**
   * Get url of redis server.
   * @inflight
   */
  url(): Promise<string>;

  /**
   * Set key value pair.
   *
   * @param key the key to set
   * @param value the value to store at given key
   * @inflight
   */
  set(key: string, value: string): Promise<void>;

  /**
   * Get value at given key.
   * @param key the key to get
   * @inflight
   */
  get(key: string): Promise<string | undefined>;

  /**
   * Sets the specified field to respective value in the hash stored at key
   *
   * @param key key to set
   * @param field field in key to set
   * @param value value to set at field in key
   * @inflight
   */
  hset(key: string, field: string, value: string): Promise<number>;

  /**
   * Returns the value associated with field in the hash stored at key
   *
   * @param key the key
   * @param field the field at given key
   * @inflight
   */
  hget(key: string, field: string): Promise<string | undefined>;

  /**
   * Add the specified members to the set stored at key
   * @param key the key
   * @param value the value to add to the set at given key
   * @inflight
   */
  sadd(key: string, value: string): Promise<number>;

  /**
   * Returns all the members of the set value stored at key
   *
   * @param key the key
   * @inflight
   */
  smembers(key: string): Promise<string[]>;

  /**
   * Removes the specified key
   *
   * @param key the key
   * @inflight
   */
  del(key: string): Promise<number>;
}
