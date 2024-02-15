import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { DataAwsSubnet } from "../.gen/providers/aws/data-aws-subnet";
import { ElasticacheCluster } from "../.gen/providers/aws/elasticache-cluster";
import { ElasticacheSubnetGroup } from "../.gen/providers/aws/elasticache-subnet-group";
import { SecurityGroup } from "../.gen/providers/aws/security-group";
import { Subnet } from "../.gen/providers/aws/subnet";
import * as core from "../core";
import * as ex from "../ex";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost } from "../std";

const ELASTICACHE_NAME_OPTS: NameOptions = {
  maxLen: 50,
  disallowedRegex: /([^a-zA-Z0-9]+)/g,
  case: CaseConventions.LOWERCASE,
};

export class Redis extends ex.Redis {
  private readonly clusterId: string;
  private readonly clusterArn: string;
  private readonly securityGroups: SecurityGroup[];
  private readonly subnets: (Subnet | DataAwsSubnet)[];

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

    const engine = "redis";
    const engineVersion = process.env.REDIS_ENGINE_VERSION ?? "6.2";
    const nodeType = process.env.REDIS_CLUSTER_NODE_TYPE ?? "cache.t4g.small";
    const parameterGroupName =
      process.env.REDIS_PARAMETER_GROUP_NAME ?? "default.redis6.x";
    const REDIS_PORT = 6379;

    const app = App.of(this) as App;
    const vpc = app.vpc;
    this.subnets = app.subnets.private;
    this.securityGroups = [];
    const clusterName = ResourceNames.generateName(this, ELASTICACHE_NAME_OPTS);
    for (const subnet of this.subnets) {

      this.securityGroups.push(new SecurityGroup(this, `${subnet.id.slice(-8)}securityGroup`, {
        vpcId: vpc.id,
        name: `${this.node.addr.slice(-8)}-securityGroup`,
        ingress: [
          {
            cidrBlocks: [subnet.cidrBlock],
            fromPort: REDIS_PORT,
            toPort: REDIS_PORT,
            protocol: "tcp",
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
      }))
  
    }

    const subnetGroup = new ElasticacheSubnetGroup(this, "RedisSubnetGroup", {
      name: `${clusterName}-subnetGroup`,
      subnetIds: [...this.subnets.map((s) => s.id)],
    });

    const cluster = new ElasticacheCluster(this, "RedisCluster", {
      clusterId: clusterName,
      engine,
      engineVersion,
      nodeType,
      parameterGroupName,
      availabilityZone: this.subnets[0].availabilityZone,
      subnetGroupName: subnetGroup.name,
      securityGroupIds: [...this.securityGroups.map((s) => s.id)],
      numCacheNodes: 1, // This number will always be 1 for Redis
    });

    this.clusterId = cluster.clusterId;
    this.clusterArn = cluster.arn;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      ex.RedisInflightMethods.URL,
      ex.RedisInflightMethods.SET,
      ex.RedisInflightMethods.GET,
      ex.RedisInflightMethods.HSET,
      ex.RedisInflightMethods.HGET,
      ex.RedisInflightMethods.SADD,
      ex.RedisInflightMethods.SMEMBERS,
      ex.RedisInflightMethods.DEL,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("redis can only be bound by tfaws.Function for now");
    }

    const env = this.envName();
    // Ops do not matter here since the client connects directly to the cluster.
    // The only thing that we need to use AWS API for is to get the cluster endpoint
    // from the cluster ID.
    host.addPolicyStatements({
      actions: ["elasticache:Describe*"],
      resources: [this.clusterArn],
    });

    host.addEnvironment(env, this.clusterId);
    host.addNetworkConfig({
      securityGroupIds: [...this.securityGroups.map((s) => s.id)],
      subnetIds: [...this.subnets.map((s) => s.id)],
    });

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(__dirname, __filename, "RedisClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `REDIS_CLUSTER_ID_${this.node.addr.slice(-8)}`;
  }
}
