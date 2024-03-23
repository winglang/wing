import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Node, Resource } from "../std";

/**
 * Global identifier for `Redis`.
 */
export const REDIS_FQN = fqnForType("ex.Redis");

/**
 * A cloud redis db.
 *
 * @inflight `@winglang/sdk.ex.IRedisClient`
 * @abstract
 */
export class Redis extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IRedisClient;

  constructor(scope: Construct, id: string) {
    if (new.target === Redis) {
      return Resource._newFromFactory(REDIS_FQN, scope, id);
    }

    super(scope, id);

    Node.of(this).title = "Redis";
    Node.of(this).description = "A Redis server";
  }
}

/**
 * Inflight interface for `Redis`.
 */
export interface IRedisClient {
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

/**
 * List of inflight operations available for `Redis`.
 * @internal
 */
export enum RedisInflightMethods {
  /** `Redis.url` */
  URL = "url",
  /** `Redis.set` */
  SET = "set",
  /** `Redis.get` */
  GET = "get",
  /** `Redis.hset` */
  HSET = "hset",
  /** `Redis.hget` */
  HGET = "hget",
  /** `Redis.sadd` */
  SADD = "sadd",
  /** `Redis.smembers` */
  SMEMBERS = "smembers",
  /** `Redis.del` */
  DEL = "del",
}

/**
 * Base class for `Redis` Client.
 */
export abstract class RedisClientBase implements IRedisClient {
  /**
   * Get raw redis client (currently IoRedis).
   */
  protected abstract rawClient(): Promise<any>;
  public abstract url(): Promise<string>;

  public async set(key: string, value: string): Promise<void> {
    let redis = await this.rawClient();
    await redis.set(key, value);
  }

  public async get(key: string): Promise<string | undefined> {
    let redis = await this.rawClient();
    let result = (await redis.get(key)) ?? undefined; // for wing to return nil
    return result;
  }

  public async hset(
    key: string,
    field: string,
    value: string
  ): Promise<number> {
    const redis = await this.rawClient();
    const result = await redis.hset(key, field, value);
    return result;
  }

  public async hget(key: string, field: string): Promise<string | undefined> {
    const redis = await this.rawClient();
    const result = await redis.hget(key, field);
    return result;
  }

  public async sadd(key: string, value: string): Promise<number> {
    const redis = await this.rawClient();
    const result = await redis.sadd(key, value);
    return result;
  }

  public async smembers(key: string): Promise<string[]> {
    const redis = await this.rawClient();
    const result = await redis.smembers(key);
    return result ?? [];
  }

  public async del(key: string): Promise<number> {
    const redis = await this.rawClient();
    const result = await redis.del(key);
    return result;
  }
}
