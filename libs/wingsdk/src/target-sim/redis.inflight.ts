import IoRedis from "ioredis";
import { RedisAttributes, RedisSchema } from "./schema-resources";
import { RedisClientBase } from "../ex";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";

export class Redis
  extends RedisClientBase
  implements ISimulatorResourceInstance
{
  private connectionUrl?: string = undefined;
  private connection?: IoRedis;
  private isCleanedUp = false;

  public constructor(
    private readonly props: RedisSchema["props"],
    _context: ISimulatorContext
  ) {
    super();
  }

  public async init(): Promise<RedisAttributes> {
    try {
      if (this.isCleanedUp) {
        return {};
      }

      // redis url based on host port
      this.connectionUrl = `redis://0.0.0.0:${this.props.port}`;

      return {};
    } catch (e) {
      throw Error(`Error setting up Redis resource simulation (${e})
      - Make sure you have docker installed and running`);
    }
  }

  public async cleanup(): Promise<void> {
    this.isCleanedUp = true;
    // disconnect from the redis server
    await this.connection?.quit();
    this.connection?.disconnect();
  }

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  public async rawClient(): Promise<any> {
    if (this.connection) {
      return this.connection;
    }

    if (this.connectionUrl) {
      this.connection = new IoRedis(this.connectionUrl);
      return this.connection;
    }

    throw new Error("Redis server not initialized");
  }

  public async url(): Promise<string> {
    if (this.connectionUrl != undefined) {
      return this.connectionUrl;
    } else {
      throw new Error("Redis server not initialized");
    }
  }
}
