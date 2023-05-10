import IoRedis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import { RedisAttributes, RedisSchema } from "./schema-resources";
import { RedisClientBase } from "../redis";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";
import { runCommand } from "../utils/misc";

export class Redis
  extends RedisClientBase
  implements ISimulatorResourceInstance
{
  private container_name: string;
  private readonly WING_REDIS_IMAGE =
    process.env.WING_REDIS_IMAGE ??
    // Redis version 7.0.9
    "redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0";
  private readonly context: ISimulatorContext;

  private connection_url?: string = undefined;
  private connection?: any;

  public constructor(_props: RedisSchema["props"], context: ISimulatorContext) {
    super();
    this.context = context;
    this.container_name = `wing-sim-redis-${this.context.resourcePath.replace(
      /\//g,
      "."
    )}-${uuidv4()}`;
  }

  public async init(): Promise<RedisAttributes> {
    try {
      // Pull docker image
      await runCommand("docker", ["pull", `${this.WING_REDIS_IMAGE}`]);

      // Run the container and allow docker to assign a host port dynamically
      await runCommand("docker", [
        "run",
        "--detach",
        "--name",
        `${this.container_name}`,
        "-p",
        "6379",
        `${this.WING_REDIS_IMAGE}`,
      ]);

      // Inspect the container to get the host port
      const out = await runCommand("docker", [
        "inspect",
        `${this.container_name}`,
      ]);
      const hostPort =
        JSON.parse(out)[0].NetworkSettings.Ports["6379/tcp"][0].HostPort;

      // redis url based on host port
      this.connection_url = `redis://0.0.0.0:${hostPort}`;
      return {};
    } catch (e) {
      throw Error(`Error setting up Redis resource simulation (${e})
      - Make sure you have docker installed and running`);
    }
  }

  public async cleanup(): Promise<void> {
    // disconnect from the redis server
    await this.connection?.disconnect();
    // stop the redis container
    await runCommand("docker", ["rm", "-f", `${this.container_name}`]);
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
}
