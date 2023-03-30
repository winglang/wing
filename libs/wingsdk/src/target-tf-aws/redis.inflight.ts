import {
  DescribeCacheClustersCommand,
  ElastiCacheClient,
} from "@aws-sdk/client-elasticache";
import { RedisClientBase } from "../redis";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const IoRedis = require("ioredis");

export class RedisClient extends RedisClientBase {
  private connection?: any;
  private connectionUrl?: string;
  constructor(
    private readonly clusterId: string,
    private readonly elasticacheClient = new ElastiCacheClient({})
  ) {
    super();
  }

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

    return new IoRedis(this.connectionUrl);
  }

  public async url(): Promise<string> {
    if (this.connectionUrl == undefined) {
      this.connectionUrl = await this.getEndpoint();
    }
    return this.connectionUrl;
  }
}
