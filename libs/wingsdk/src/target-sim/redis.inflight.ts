import { ISimulatorResourceInstance } from "./resource";
import { RedisSchema } from "./schema-resources";
import { IRedisClient } from "../redis";
import { ISimulatorContext } from "../testing/simulator";
//import { createClient } from "redis";
//import { Redis as IoRedis } from "ioredis";
const IoRedis = require("ioredis");
//const Docker = require('dockerode');
import Dockerode from "dockerode";

export class Redis implements IRedisClient, ISimulatorResourceInstance {
  //private readonly context: ISimulatorContext;
  private readonly container_name: string;
  private readonly password: string;
  private readonly context: ISimulatorContext;

  private connection_url?: string = undefined;
  private docker?: Dockerode = undefined;

  private connection: any;
  public constructor(props: RedisSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.password = props.password;
    this.container_name = `wing-sim-redis-${this.context.resourcePath.replace("/", ".")}`;
  }

  public async init(): Promise<void> {
    // start the redis container
    this.docker = new Dockerode();
    let container = await this.docker.createContainer({
      Image: "redis",
      name: this.container_name,
    });

    await container.start();

    //let container = await docker.getContainer(this.container_name);
    let container_spec = await container.inspect();

    this.connection_url = `redis://${this.password}@${container_spec.NetworkSettings.IPAddress}:6379`;
    this.connection_url = `redis://${container_spec.NetworkSettings.IPAddress}:6379`;

    // connect to the redis server
    //this.connection = createClient({ url: this.connection_url });
    //await this.connection.connect();
    this.connection = new IoRedis(this.connection_url);
  }

  public async cleanup(): Promise<void> {
    console.log("cleanup redis connection");
    // disconnect from the redis server
    await this.connection.disconnect();
    // stop the redis container
    let container = this.docker?.getContainer(this.container_name);
    await container?.stop();
    await container?.remove();

  }

  public async get_c(): Promise<any> {
    return this.connection;
  }
}
