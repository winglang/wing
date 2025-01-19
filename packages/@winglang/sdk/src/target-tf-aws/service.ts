import { writeFileSync } from "fs";
import { join } from "path";
import { Lazy } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { EcsCluster as TfAWSEcsCluster } from "./ecs-cluster";
import { CloudwatchLogGroup } from "../.gen/providers/aws/cloudwatch-log-group";
import { EcsCluster } from "../.gen/providers/aws/ecs-cluster";
import { EcsService } from "../.gen/providers/aws/ecs-service";
import { EcsTaskDefinition } from "../.gen/providers/aws/ecs-task-definition";
import { IamRole } from "../.gen/providers/aws/iam-role";
import { SecurityGroup } from "../.gen/providers/aws/security-group";
import { Image } from "../.gen/providers/docker/image";
import { RegistryImage } from "../.gen/providers/docker/registry-image";
import * as cloud from "../cloud";
import { createBundle } from "../shared/bundling";
import {
  createServiceDockerfile,
  createServiceWrapper,
  Service as AwsService,
  NetworkConfig,
  PolicyStatement,
} from "../shared-aws";

/**
 * Represents an ECS service in AWS.
 *
 * Converts the service handler into a DockerFile that is then built and published to an ECR repository,
 * on deployment. The service is then run as a Fargate task in an ECS cluster.
 */
export class Service extends AwsService {
  private workdir: string;
  private wrapperEntrypoint: string;
  private policyStatments?: any[];
  private dockerFileName: string;
  private service: EcsService;
  private subnets?: Set<string>;
  private bundledHash?: string;
  private securityGroups?: Set<string>;
  private clusterInstance: EcsCluster;

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

    const app = App.of(this) as App;
    this.clusterInstance = TfAWSEcsCluster.getOrCreate(this);

    const image = new Image(this, "DockerImage", {
      name: `${app.ecr.repositoryUrl}:${this.assetName}`,
      buildAttribute: {
        context: ".wing",
        dockerfile: this.dockerFileName,
        platform: "linux/amd64",
      },
      triggers: {
        context_hash: Lazy.stringValue({
          produce: () => this.bundledHash,
        }),
      },
    });

    new RegistryImage(this, "RegistryImage", {
      name: image.name,
      triggers: {
        context_hash: Lazy.stringValue({
          produce: () => this.bundledHash,
        }),
      },
    });

    const logGroup = new CloudwatchLogGroup(this, "LogGroup", {
      name: `/ecs/${this.assetName}`,
      retentionInDays: 7,
    });

    const executionRole = new IamRole(this, "ExecutionRole", {
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Service: "ecs-tasks.amazonaws.com",
            },
            Action: "sts:AssumeRole",
          },
        ],
      }),
      inlinePolicy: [
        {
          name: `${this.assetName}-inline-policy`,
          policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: [
                  "logs:CreateLogStream",
                  "logs:PutLogEvents",
                  "logs:CreateLogGroup",
                ],
                Resource: `${logGroup.arn}:*`,
              },
              {
                Effect: "Allow",
                Action: ["ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer"],
                Resource: app.ecr.arn,
              },
              {
                Effect: "Allow",
                Action: ["ecr:GetAuthorizationToken"],
                Resource: "*",
              },
            ],
          }),
        },
      ],
    });

    const taskRole = new IamRole(this, "TaskRole", {
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Service: "ecs-tasks.amazonaws.com",
            },
            Action: "sts:AssumeRole",
          },
        ],
      }),
      inlinePolicy: [
        {
          name: `${this.assetName}-inline-policy`,
          policy: Lazy.stringValue({
            produce: () => {
              this.policyStatments = this.policyStatments ?? [];

              if (this.policyStatments.length !== 0) {
                return JSON.stringify({
                  Version: "2012-10-17",
                  Statement: this.policyStatments,
                });
              }

              return JSON.stringify({
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: "none:null",
                    Resource: "*",
                  },
                ],
              });
            },
          }),
        },
      ],
    });

    const taskDef = new EcsTaskDefinition(this, "Task", {
      family: this.assetName,
      executionRoleArn: executionRole.arn,
      taskRoleArn: taskRole.arn,
      containerDefinitions: Lazy.anyValue({
        produce: () =>
          JSON.stringify([
            {
              name: this.assetName,
              image: image.name,
              environment: Object.entries(this._env).map(([key, value]) => {
                return {
                  name: key,
                  value: value,
                };
              }),
              logConfiguration: {
                logDriver: "awslogs",
                options: {
                  "awslogs-group": `/ecs/${this.assetName}`,
                  "awslogs-region": app.region,
                  "awslogs-stream-prefix": logGroup.name,
                },
              },
            },
          ]),
      }) as any,
      networkMode: "awsvpc",
      requiresCompatibilities: ["FARGATE"],
      memory: "512",
      cpu: "256",
    });

    const subnetIds = app.privateSubnetIds;

    const sg = new SecurityGroup(this, "SecurityGroup", {
      vpcId: app.vpc.id,
      egress: [
        {
          fromPort: 0,
          toPort: 0,
          protocol: "-1",
          cidrBlocks: ["0.0.0.0/0"],
        },
      ],
      ingress: [
        {
          fromPort: 0,
          toPort: 0,
          protocol: "-1",
          cidrBlocks: ["0.0.0.0/0"],
        },
      ],
    });

    this.service = new EcsService(this, "Service", {
      name: this.assetName,
      cluster: this.clusterInstance.arn,
      desiredCount: 1,
      launchType: "FARGATE",
      taskDefinition: taskDef.arn,
      forceNewDeployment: true,
      enableExecuteCommand: true,
      networkConfiguration: {
        subnets: subnetIds,
        securityGroups: Lazy.listValue({
          produce: () => {
            const securityGroups = this.securityGroups
              ? Array.from(this.securityGroups.values())
              : [];
            return [sg.id, ...securityGroups];
          },
        }),
      },
      triggers: {
        context_hash: Lazy.stringValue({
          produce: () => this.bundledHash,
        }),
      },
    });
  }

  public get serviceName(): string {
    return this.service.name;
  }

  public get clusterName(): string {
    return this.clusterInstance.name;
  }

  public addPolicyStatements(...policies: PolicyStatement[]): void {
    if (!this.policyStatments) {
      this.policyStatments = [];
    }

    for (const policy of policies) {
      this.policyStatments.push({
        Action: policy.actions,
        Effect: policy.effect ?? "Allow",
        Resource: policy.resources,
      });
    }
  }

  public addNetwork(vpcConfig: NetworkConfig): void {
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
    const bundle = createBundle(this.wrapperEntrypoint);
    this.bundledHash = bundle.hash;

    const dockerFile = createServiceDockerfile(this.assetName);
    writeFileSync(join(this.workdir, this.dockerFileName), dockerFile);
  }

  /**
   * Add an environment variable to the function
   */
  public addEnvironment(name: string, value: string): void {
    if (this._env[name] !== undefined && this._env[name] !== value) {
      throw new Error(
        `Environment variable "${name}" already set with a different value.`
      );
    }
    this._env[name] = value;
  }
}
