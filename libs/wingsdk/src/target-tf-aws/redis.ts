import { ElasticacheCluster } from "@cdktf/provider-aws/lib/elasticache-cluster";
import { ElasticacheSubnetGroup } from "@cdktf/provider-aws/lib/elasticache-subnet-group";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { Subnet } from "@cdktf/provider-aws/lib/subnet";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { Code } from "../core";
import * as core from "../core";
import * as redis from "../redis";
import { NameOptions, ResourceNames } from "../utils/resource-names";

// The cluster name must contain alphanumeric characters or hyphens, should start with a letter, and cannot end with a hyphen or contain two consecutive hyphens.
const ELASTICACHE_NAME_OPTS: NameOptions = {
  maxLen: 50,
  disallowedRegex: /([^a-z0-9]+)/g,
};

export class Redis extends redis.Redis {
  private readonly engine: string;
  private readonly clusterId: string;
  private readonly clusterArn: string;
  private readonly engineVersion: string;
  private readonly clusterNodeType: string;
  private readonly parameterGroupName: string;
  private readonly securityGroup: SecurityGroup;
  private readonly subnet: Subnet;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    if (
      process.env.REDIS_ENGINE_VERSION &&
      !process.env.REDIS_PARAMETER_GROUP_NAME
    ) {
      throw new Error(
        "REDIS_PARAMETER_GROUP_NAME must be set if REDIS_ENGINE_VERSION is set"
      );
    }

    this.engine = "redis";
    this.engineVersion = process.env.REDIS_ENGINE_VERSION ?? "6.2";
    this.clusterNodeType =
      process.env.REDIS_CLUSTER_NODE_TYPE ?? "cache.t4g.small";
    this.parameterGroupName =
      process.env.REDIS_PARAMETER_GROUP_NAME ?? "default.redis6.x";

    const app = App.of(this) as App;
    const vpc = app.vpc;
    this.subnet = app.subnets.private;
    const clusterName = ResourceNames.generateName(this, ELASTICACHE_NAME_OPTS);

    this.securityGroup = new SecurityGroup(this, "securityGroup", {
      vpcId: vpc.id,
      name: `${this.node.addr.slice(-8)}-securityGroup`,
      ingress: [
        {
          cidrBlocks: [this.subnet.cidrBlock],
          fromPort: 0,
          toPort: 0,
          protocol: "-1",
          selfAttribute: true,
        },
      ],
      egress: [
        {
          cidrBlocks: ["0.0.0.0/0"],
          fromPort: 0,
          toPort: 0,
          protocol: "-1",
        },
      ],
    });

    const subnetGroup = new ElasticacheSubnetGroup(this, "RedisSubnetGroup", {
      name: `${clusterName}-subnetGroup`,
      subnetIds: [this.subnet.id],
    });

    const cluster = new ElasticacheCluster(this, "RedisCluster", {
      clusterId: clusterName,
      engine: this.engine,
      engineVersion: this.engineVersion,
      nodeType: this.clusterNodeType,
      parameterGroupName: this.parameterGroupName,
      availabilityZone: this.subnet.availabilityZone,
      subnetGroupName: subnetGroup.name,
      securityGroupIds: [this.securityGroup.id],
      numCacheNodes: 1, // This number will always be 1 for Redis
    });

    this.clusterId = cluster.clusterId;
    this.clusterArn = cluster.arn;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("redis can only be bound by tfaws.Function for now");
    }

    const env = this.envName();
    host.addPolicyStatements({
      effect: "Allow",
      action: ["*"],
      resource: this.clusterArn,
    });

    host.addEnvironment(env, this.clusterId);
    host.addNetworkConfig({
      securityGroupIds: [this.securityGroup.id],
      subnetIds: [this.subnet.id],
    });

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): Code {
    return core.InflightClient.for(__dirname, __filename, "RedisClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `REDIS_URL_${this.node.addr.slice(-8)}`;
  }
}

Redis._annotateInflight("raw_client", {});
Redis._annotateInflight("url", {});
Redis._annotateInflight("get", {});
Redis._annotateInflight("set", {});
Redis._annotateInflight("hset", {});
Redis._annotateInflight("hget", {});
Redis._annotateInflight("sadd", {});
Redis._annotateInflight("smembers", {});
Redis._annotateInflight("del", {});
