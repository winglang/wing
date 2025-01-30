import { App } from "./app";
import { Construct } from "constructs";
import { cloud, core } from "@winglang/sdk";
import { PolicyStatement as CdkPolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  AwsInflightHost,
  IAwsInflightHost,
  NetworkConfig,
  PolicyStatement,
} from "@winglang/sdk/shared-aws";
import { LiftMap } from "@winglang/sdk/core";
import { join } from "path";
import {
  ContainerImage,
  FargateService,
  FargateTaskDefinition,
  ICluster,
  LogDrivers,
} from "aws-cdk-lib/aws-ecs";
import { EcsCluster as CdkEcsCluster } from "./ecs-cluster";
import { DockerImageAsset, Platform } from "aws-cdk-lib/aws-ecr-assets";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { writeFileSync } from "fs";
import { createBundle } from "@winglang/sdk/shared/bundling";
import {
  createServiceDockerfile,
  createServiceWrapper,
} from "@winglang/sdk/shared-aws";
import { IInflightHost } from "@winglang/sdk/std";

/**
 * Represents an ECS service in AWS.
 *
 * Converts the service handler into a DockerFile that is then built and published
 * to default AWS-CDK ECR repository, on deployment.
 * The service is then run as a Fargate task in an ECS cluster.
 */
export class Service extends cloud.Service implements IAwsInflightHost {
  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename.replace("service", "service.inflight"),
      "ServiceClient",
    );
  }

  private workdir: string;
  private wrapperEntrypoint: string;
  private dockerFileName: string;
  private clusterInstance: ICluster;
  private subnets?: Set<string>;
  private securityGroups?: Set<string>;
  private service: FargateService;

  /** @internal */
  public _liftMap?: LiftMap | undefined;

  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IServiceHandler,
    props: cloud.ServiceProps = {},
  ) {
    super(scope, id, handler, props);

    this.workdir = App.of(this).workdir;
    this.wrapperEntrypoint = join(this.workdir, `${this.assetName}_wrapper.js`);
    this.dockerFileName = `Dockerfile_${this.assetName}`;

    this.clusterInstance = CdkEcsCluster.getOrCreate(this);

    this.createDockerfile();

    const logGroup = new LogGroup(this, "LogGroup", {
      logGroupName: `/ecs/${this.assetName}`,
      retention: RetentionDays.FIVE_DAYS,
    });

    const image = new DockerImageAsset(this, "DockerImage", {
      directory: this.workdir,
      platform: Platform.LINUX_AMD64,
      file: this.dockerFileName,
    });

    const taskDef = new FargateTaskDefinition(this, "TaskDefinition", {
      family: this.assetName,
      memoryLimitMiB: 512,
      cpu: 256,
    });
    const container = taskDef.addContainer("Container", {
      image: ContainerImage.fromDockerImageAsset(image),
      environment: this._env,
      logging: LogDrivers.awsLogs({
        logGroup: logGroup,
        streamPrefix: logGroup.logGroupName,
      }),
    });
    container.addPortMappings({ containerPort: 80 });

    this.service = new FargateService(this, "Service", {
      cluster: this.clusterInstance,
      taskDefinition: taskDef,
      desiredCount: 1,
    });
  }

  addPolicyStatements(...statements: PolicyStatement[]): void {
    for (const statement of statements) {
      this.service.taskDefinition.taskRole.addToPrincipalPolicy(
        new CdkPolicyStatement(statement),
      );
    }
  }
  addNetwork(vpcConfig: NetworkConfig): void {
    if (!this.subnets || !this.securityGroups) {
      this.subnets = new Set();
      this.securityGroups = new Set();
    }

    vpcConfig.subnetIds.forEach((subnet) => this.subnets!.add(subnet));
    vpcConfig.securityGroupIds.forEach((sg) => this.securityGroups!.add(sg));
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    const wrapper = createServiceWrapper(this.entrypoint);
    writeFileSync(this.wrapperEntrypoint, wrapper);
    createBundle(this.wrapperEntrypoint);

    this.createDockerfile();
  }

  private createDockerfile() {
    const dockerFile = createServiceDockerfile(this.assetName);
    writeFileSync(join(this.workdir, this.dockerFileName), dockerFile);
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is not an AWS inflight host");
    }

    if (
      ops.includes(cloud.ServiceInflightMethods.START) ||
      ops.includes(cloud.ServiceInflightMethods.STOP)
    ) {
      host.addPolicyStatements({
        actions: ["ecs:UpdateService"],
        resources: [this.service.taskDefinition.taskDefinitionArn],
      });
    }

    if (ops.includes(cloud.ServiceInflightMethods.STARTED)) {
      host.addPolicyStatements({
        actions: ["ecs:DescribeServices"],
        resources: [this.service.taskDefinition.taskDefinitionArn],
      });
    }

    host.addEnvironment(this.envName(), this.service.serviceName);
    host.addEnvironment("ECS_CLUSTER_NAME", this.clusterInstance.clusterName);
  }

  /**
   * Add an environment variable to the function
   */
  public addEnvironment(name: string, value: string): void {
    if (this._env[name] !== undefined && this._env[name] !== value) {
      throw new Error(
        `Environment variable "${name}" already set with a different value.`,
      );
    }
    this._env[name] = value;
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $clusterName: `process.env["ECS_CLUSTER_NAME"]`,
      $serviceName: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `SERVICE_NAME_${this.node.addr.slice(-8)}`;
  }
}
