import { App } from "./app";
import { Construct } from "constructs";
import { cloud, core } from "@winglang/sdk/lib";
import { PolicyStatement as CdkPolicyStatement } from "aws-cdk-lib/aws-iam";
import { IAwsInflightHost, NetworkConfig, PolicyStatement } from "@winglang/sdk/lib/shared-aws";
import { LiftMap } from "@winglang/sdk/lib/core";
import { join, resolve } from "path";
import { ContainerImage, FargateService, FargateTaskDefinition, ICluster, LogDrivers } from "aws-cdk-lib/aws-ecs";
import { EcsCluster as CdkEcsCluster } from "./ecs-cluster";
import { DockerImageAsset, Platform, } from "aws-cdk-lib/aws-ecr-assets";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { writeFileSync } from "fs";
import { createBundle } from "@winglang/sdk/lib/shared/bundling";

export class Service extends cloud.Service implements IAwsInflightHost {
  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename.replace("service", "service.inflight"),
      "ServiceClient"
    );
  }

  private workdir: string;
  private wrapperEntrypoint: string;
  private dockerFileName: string;
  private clusterInstante: ICluster;
  private subnets?: Set<string>;
  private securityGroups?: Set<string>;
  private service: FargateService;

  /** @internal */
  public _liftMap?: LiftMap | undefined;

  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IServiceHandler,
    props: cloud.ServiceProps = {}
  ) {
    super(scope, id, handler, props);

    this.workdir = App.of(this).workdir;
    this.wrapperEntrypoint = join(this.workdir, `${this.assetName}_wrapper.js`);
    this.dockerFileName = `Dockerfile_${this.assetName}`;

    this.clusterInstante = CdkEcsCluster.getOrCreate(this);

    this.create_dockerfile();

    const logGroup = new LogGroup(this, "LogGroup", {
      logGroupName: `/ecs/${this.assetName}`,
      retention: RetentionDays.FIVE_DAYS
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
      cluster: this.clusterInstante,
      taskDefinition: taskDef,
      desiredCount: 1,
    });
  }

  protected create_service_bundle(): string {
    const wrapper = `
const service = require("${resolve(this.entrypoint)}");
let isShuttingDown = false;

const startService = async () => {
while (!isShuttingDown) {
  // Check if shutting down at each iteration or task
  await service.start();
}
};

const handleShutdown = async () => {
console.log("Received shutdown signal, stopping service...");
isShuttingDown = true; // Signal to stop infinite loop
await service.stop();
process.exit(0);
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

(async () => {
try {
  await startService();
} catch (error) {
  console.error("Error during service operation:", error);
  process.exit(1);
}
})();
  `;
    writeFileSync(this.wrapperEntrypoint, wrapper);
    const bundle = createBundle(this.wrapperEntrypoint);
    return bundle.hash;
  }

  protected create_dockerfile(): void {
    const dockerFile = `FROM --platform=linux/amd64 node:20-slim
WORKDIR /app
COPY ./${this.assetName}_wrapper.js.bundle .
CMD [ "node", "index.cjs" ]`;

    writeFileSync(join(this.workdir, this.dockerFileName), dockerFile);
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    this.create_service_bundle();
    this.create_dockerfile();
  }

  addPolicyStatements(...statements: PolicyStatement[]): void {
    for (const statement of statements) {
      this.service.taskDefinition.taskRole.addToPrincipalPolicy(new CdkPolicyStatement(statement));
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

}