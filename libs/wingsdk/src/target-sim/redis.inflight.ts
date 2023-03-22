import Dockerode from "dockerode";
import { ISimulatorResourceInstance } from "./resource";
import { RedisSchema } from "./schema-resources";
import { IRedisClient } from "../redis";
import { ISimulatorContext } from "../testing/simulator";

// Issue using types from ioredis with JSII
//import { Redis as IoRedis } from "ioredis";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const IoRedis = require("ioredis");

export class Redis implements IRedisClient, ISimulatorResourceInstance {
  static uid = 0;
  private base_port = 6379;
  private readonly container_name: string;
  private readonly context: ISimulatorContext;

  private connection_url?: string = undefined;
  private connection_port: number;
  private docker?: Dockerode = undefined;
  private connection?: any;

  public constructor(_props: RedisSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.container_name = `wing-sim-redis-${this.context.resourcePath.replace(
      "/",
      "."
    )}-${Redis.uid}`;
    Redis.uid++;
    this.connection_port = this.base_port + Redis.uid;
  }

  public async init(): Promise<void> {
    this.docker = new Dockerode();
    // Create a redis container
    try {
      const container = await this.docker.createContainer({
        Image: "redis",
        name: this.container_name,
        HostConfig: {
          PortBindings: {
            [`6379/tcp`]: [
              {
                HostPort: `${this.connection_port}`,
              },
            ],
          },
        },
      });

      // Start the redis container
      await container.start();

      // Generate the redis url based on the container ip address
      // const container_spec = await container.inspect();
      this.connection_url = `redis://0.0.0.0:${this.connection_port}`;
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

  public async ioredis(): Promise<any> {
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
}
