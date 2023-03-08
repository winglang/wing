import { ISimulatorResourceInstance } from "./resource";
import { RedisSchema } from "./schema-resources";
import { IRedisClient } from "../redis";
import { ISimulatorContext } from "../testing/simulator";

// Issue using types from ioredis with JSII
//import { Redis as IoRedis } from "ioredis";
const IoRedis = require("ioredis");

import Dockerode from "dockerode";

export class Redis implements IRedisClient, ISimulatorResourceInstance {
  private readonly container_name: string;
  private readonly context: ISimulatorContext;
  static uid = 0;

  private connection_url?: string = undefined;
  private docker?: Dockerode = undefined;
  private connection?: any;

  public constructor(_props: RedisSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.container_name = `wing-sim-redis-${this.context.resourcePath.replace("/", ".")}-${Redis.uid}`;
    Redis.uid++;
  }

  public async init(): Promise<void> {
    this.docker = new Dockerode();

    var stack = new Error().stack
    console.log("creating container");
    console.log(stack);
    // Create a redis container
    let container = await this.docker.createContainer({
      Image: "redis",
      name: this.container_name,
    });

    // Start the redis container
    await container.start();

    // Generate the redis url based on the container ip address
    let container_spec = await container.inspect();
    this.connection_url = `redis://${container_spec.NetworkSettings.IPAddress}:6379`;
  }

  public async cleanup(): Promise<void> {
    // disconnect from the redis server
    await this.connection?.disconnect();
    // stop the redis container
    let container = this.docker?.getContainer(this.container_name);
    await container?.stop();
    await container?.remove();

  }

  public async ioredis(): Promise<any> {
    if (this.connection != undefined) {
      return this.connection;
    } else if (this.connection_url != undefined) {
      return this.connection = new IoRedis(this.connection_url);
    } else {
      throw new Error("Redis server not initialized");
    }
  }

  public async url(): Promise<string> {
    if (this.connection_url != undefined) {
      return this.connection_url;
    } else {
      throw new Error("Redis server not initialized");
    }
  }
}
