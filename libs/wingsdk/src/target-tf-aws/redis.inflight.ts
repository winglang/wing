import {
  DescribeCacheClustersCommand,
  ElastiCacheClient,
} from "@aws-sdk/client-elasticache";
import { RedisClientBase } from "../redis";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const IoRedis = require("ioredis");

export class RedisClient extends RedisClientBase {
  private connectionUrl?: string;
  constructor(
    private readonly clusterId: string,
    private connection?: any,
    private readonly elasticacheClient = new ElastiCacheClient({})
  ) {
    super();
  }

  /**
   * The Redis cluster endpoint is not available to inject from the cdktf resource,
   * therefore we need to query the AWS API to get it. This is a helper function that will
   * use the cluster id to get the endpoint.
   *
   * @returns The Redis cluster endpoint
   */
  private async getEndpoint(): Promise<string> {
    const command = new DescribeCacheClustersCommand({
      CacheClusterId: this.clusterId,
      ShowCacheNodeInfo: true,
    });
    const resp = await this.elasticacheClient.send(command);

    if (!resp.CacheClusters) {
      throw new Error("No Redis cache clusters found");
    }

    const cluster = resp.CacheClusters[0];
    if (!cluster.CacheNodes) {
      throw new Error("No Redis cache nodes found");
    }

    const cacheNode = cluster.CacheNodes[0];
    if (!cacheNode.Endpoint) {
      throw new Error("No Redis cache node endpoint found");
    }

    return cacheNode.Endpoint.Address!;
  }

  public async rawClient(): Promise<any> {
    if (!this.clusterId) {
      throw new Error("No cluster id provided");
    }

    if (this.connection) {
      return this.connection;
    }

    if (!this.connectionUrl) {
      this.connectionUrl = await this.getEndpoint();
    }

    this.connection = new IoRedis(this.connectionUrl);
    return this.connection;
  }

  public async url(): Promise<string> {
    if (this.connectionUrl == undefined) {
      this.connectionUrl = await this.getEndpoint();
    }
    return this.connectionUrl;
  }
}
