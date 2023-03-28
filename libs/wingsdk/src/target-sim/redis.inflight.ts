import Dockerode from "dockerode";
import { v4 as uuidv4 } from "uuid";
import { ISimulatorResourceInstance } from "./resource";
import { RedisAttributes, RedisSchema } from "./schema-resources";
import { IRedisClient } from "../redis";
import { ISimulatorContext } from "../testing/simulator";

// Issue using types from ioredis with JSII
//import { Redis as IoRedis } from "ioredis";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const IoRedis = require("ioredis");

export class Redis implements IRedisClient, ISimulatorResourceInstance {
  private readonly base_port: number;
  private container_name: string;
  private readonly context: ISimulatorContext;

  private connection_url?: string = undefined;
  private docker?: Dockerode = undefined;
  private connection?: any;

  public constructor(_props: RedisSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.container_name = `wing-sim-redis-${this.context.resourcePath.replace(
      "/",
      "."
    )}-${uuidv4()}`;
    this.base_port = (process.env.REDIS_BASE_PORT ?? 6379) as number;
  }

  public async init(): Promise<RedisAttributes> {
    this.docker = new Dockerode();
    // Create a redis container
    this.base_port;
    try {
      const container = await this.docker!.createContainer({
        Image: "redis",
        name: this.container_name,
        HostConfig: {
          PortBindings: {
            "6379/tcp": [
              {
                HostPort: "0", // let docker pick a port
              },
            ],
          },
        },
      });

      // Start the redis container
      await container.start();
      // Inspect the container to get the host port
      const hostPort = (await container.inspect()).NetworkSettings.Ports[
        "6379/tcp"
      ][0].HostPort;

      // redis url based on host port
      this.connection_url = `redis://0.0.0.0:${hostPort!}`;
      return {};
    } catch (e) {
      throw Error(`Error setting up Redis resource simulation (${e})
      - Make sure you have docker installed and running
      - Make sure you have the redis image installed ('docker pull redis')`);
    }
  }

  public async cleanup(): Promise<void> {
    // disconnect from the redis server
    await this.connection?.disconnect();
    // stop the redis container
    let container = this.docker?.getContainer(this.container_name);
    await container?.stop();
    await container?.remove();
  }

  public async rawClient(): Promise<any> {
    if (this.connection) {
      return this.connection;
    }

    if (this.connection_url) {
      this.connection = new IoRedis(this.connection_url);
      return this.connection;
    }

    throw new Error("Redis server not initialized");
  }

  public async url(): Promise<string> {
    if (this.connection_url != undefined) {
      return this.connection_url;
    } else {
      throw new Error("Redis server not initialized");
    }
  }

  public async set(key: string, value: string): Promise<void> {
    let redis = await this.rawClient();
    await redis.set(key, value);
  }

  public async get(key: string): Promise<string> {
    let redis = await this.rawClient();
    let result = await redis.get(key);
    return result ?? "";
  }

  public async hset(key: string, field: string, value: string): Promise<void> {
    let redis = await this.rawClient();
    await redis.hset(key, field, value);
  }

  public async hget(key: string, field: string): Promise<string> {
    let redis = await this.rawClient();
    let result = await redis.hget(key, field);
    return result ?? "";
  }

  public async sadd(key: string, value: string): Promise<void> {
    let redis = await this.rawClient();
    await redis.sadd(key, value);
  }

  public async smembers(key: string): Promise<string[]> {
    let redis = await this.rawClient();
    let result = await redis.smembers(key);
    return result ?? [];
  }

  public async del(key: string): Promise<void> {
    let redis = await this.rawClient();
    await redis.del(key);
  }
}
