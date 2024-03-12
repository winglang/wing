import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { CloudwatchLogGroup } from "../.gen/providers/aws/cloudwatch-log-group";
import { IamRole } from "../.gen/providers/aws/iam-role";
import { IamRolePolicy } from "../.gen/providers/aws/iam-role-policy";
import { IamRolePolicyAttachment } from "../.gen/providers/aws/iam-role-policy-attachment";
import { LambdaFunction } from "../.gen/providers/aws/lambda-function";
import { LambdaPermission } from "../.gen/providers/aws/lambda-permission";
import { S3Object } from "../.gen/providers/aws/s3-object";
import { SecurityGroup } from "../.gen/providers/aws/security-group";
import * as cloud from "../cloud";
import * as core from "../core";
import { NotImplementedError } from "../core/errors";
import { createBundle } from "../shared/bundling";
import { DEFAULT_MEMORY_SIZE } from "../shared/function";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { Effect, IAwsFunction, PolicyStatement } from "../shared-aws";
import { IInflightHost, Resource } from "../std";
import { Duration } from "../std/duration";

/**
 * Function names are limited to 64 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 64,
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * Function network configuration
 * used to hold data on subnets and security groups
 * that should be used when a function is deployed within a VPC.
 */
export interface FunctionNetworkConfig {
  /** List of subnets to attach on function */
  readonly subnetIds: string[];
  /** List of security groups to place function in */
  readonly securityGroupIds: string[];
}

/**
 * Options for granting invoke permissions to the current function
 */
export interface FunctionPermissionsOptions {
  /**
   * Used for keeping function's versioning.
   */
  readonly qualifier?: string;
}

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function implements IAwsFunction {
  private readonly function: LambdaFunction;
  private readonly role: IamRole;
  private policyStatements?: any[];
  private subnets?: Set<string>;
  private vpcPermissionsAdded = false;
  private securityGroups?: Set<string>;

  /**
   * Qualified Function ARN
   * @returns Qualified ARN of the function
   */
  public readonly qualifiedArn: string;
  /** Function INVOKE_ARN */
  public readonly invokeArn: string;
  /** Permissions  */
  public permissions!: LambdaPermission;

  /** Name of the AWS Lambda function in the account/region */
  public readonly name: string;

  private assetPath: string | undefined; // posix path
  private bundleHash: string | undefined;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    if (props.concurrency != null) {
      throw new NotImplementedError(
        "Function concurrency isn't implemented yet on the current target."
      );
    }

    // Create unique S3 bucket for hosting Lambda code
    const app = App.of(this) as App;
    const bucket = app.codeBucket;

    // Choose an object name so that:
    // - whenever code changes, the object name changes
    // - even if two functions have the same code, they get different names
    //   (separation of concerns)
    let bundleHashToken = Lazy.stringValue({
      produce: () => {
        if (!this.bundleHash) {
          throw new Error("bundleHash was not set");
        }
        return this.bundleHash;
      },
    });
    const objectKey = `asset.${this.node.addr}.${bundleHashToken}.zip`;

    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new S3Object(this, "S3Object", {
      bucket: bucket.bucket,
      key: objectKey,
      source: Lazy.stringValue({
        produce: () => {
          if (!this.assetPath) {
            throw new Error("assetPath was not set");
          }
          return this.assetPath;
        },
      }),
    });

    // Create Lambda role
    this.role = new IamRole(this, "IamRole", {
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Principal: {
              Service: "lambda.amazonaws.com",
            },
            Effect: "Allow",
          },
        ],
      }),
    });

    // Add policy to Lambda role for any custom policy statements, such as
    // those needed by bound resources
    new IamRolePolicy(this, "IamRolePolicy", {
      role: this.role.name,
      policy: Lazy.stringValue({
        produce: () => {
          this.policyStatements = this.policyStatements ?? [];

          if (this.policyStatements.length !== 0) {
            return JSON.stringify({
              Version: "2012-10-17",
              Statement: this.policyStatements,
            });
          }

          // policy must contain at least one statement, so include a no-op statement
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
    });

    // Add execution role for lambda to write to CloudWatch logs
    new IamRolePolicyAttachment(this, "IamRolePolicyAttachment", {
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      role: this.role.name,
    });

    this.name = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);

    // validate memory size
    if (props.memory && (props.memory < 128 || props.memory > 10240)) {
      throw new Error(
        "Memory for AWS Lambda function should be in between 128 and 10240"
      );
    }

    if (!props.logRetentionDays || props.logRetentionDays >= 0) {
      new CloudwatchLogGroup(this, "CloudwatchLogGroup", {
        name: `/aws/lambda/${this.name}`,
        retentionInDays: props.logRetentionDays ?? 30,
      });
    } else {
      // Negative value means Infinite retention
    }

    // Create Lambda function
    this.function = new LambdaFunction(this, "Default", {
      functionName: this.name,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "index.handler",
      runtime: "nodejs20.x",
      role: this.role.arn,
      publish: true,
      vpcConfig: {
        subnetIds: Lazy.listValue({
          produce: () =>
            this.subnets ? Array.from(this.subnets.values()) : [],
        }),
        securityGroupIds: Lazy.listValue({
          produce: () =>
            this.securityGroups ? Array.from(this.securityGroups.values()) : [],
        }),
      },
      environment: {
        variables: Lazy.anyValue({
          produce: () => ({
            ...this.env,
            // enable source maps
            NODE_OPTIONS: [
              ...(this.env.NODE_OPTIONS === undefined
                ? []
                : this.env.NODE_OPTIONS.split(" ")),
              "--enable-source-maps",
            ].join(" "),
          }),
        }) as any,
      },
      timeout: props.timeout
        ? props.timeout.seconds
        : Duration.fromMinutes(1).seconds,
      memorySize: props.memory ?? DEFAULT_MEMORY_SIZE,
      architectures: ["arm64"],
    });

    if (
      app.parameterRegistrar.getParameterValue("tf-aws/vpc_lambda") === true
    ) {
      const sg = new SecurityGroup(this, `${id}SecurityGroup`, {
        vpcId: app.vpc.id,
        egress: [
          {
            cidrBlocks: ["0.0.0.0/0"],
            fromPort: 0,
            toPort: 0,
            protocol: "-1",
          },
        ],
      });
      this.addNetworkConfig({
        subnetIds: [...app.subnets.private.map((s) => s.id)],
        securityGroupIds: [sg.id],
      });
    }

    this.qualifiedArn = this.function.qualifiedArn;
    this.invokeArn = this.function.invokeArn;

    // terraform rejects templates with zero environment variables
    this.addEnvironment("WING_FUNCTION_NAME", this.name);
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    // write the entrypoint next to the partial inflight code emitted by the compiler, so that
    // `require` resolves naturally.

    const bundle = createBundle(this.entrypoint);

    // would prefer to create TerraformAsset in the constructor, but using a CDKTF token for
    // the "path" argument isn't supported
    const asset = new TerraformAsset(this, "Asset", {
      path: bundle.directory,
      type: AssetType.ARCHIVE,
    });

    this.bundleHash = bundle.hash;
    this.assetPath = asset.path;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.FunctionInflightMethods.INVOKE,
      cloud.FunctionInflightMethods.INVOKE_ASYNC,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("functions can only be bound by tfaws.Function for now");
    }

    if (
      ops.includes(cloud.FunctionInflightMethods.INVOKE) ||
      ops.includes(cloud.FunctionInflightMethods.INVOKE_ASYNC)
    ) {
      host.addPolicyStatements({
        actions: ["lambda:InvokeFunction"],
        resources: [`${this.function.arn}`],
      });
    }

    // The function name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.function.arn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "FunctionClient",
      [`process.env["${this.envName()}"], "${this.node.path}"`]
    );
  }

  /**
   * Add VPC configurations to lambda function
   */
  public addNetworkConfig(vpcConfig: FunctionNetworkConfig) {
    if (!this.subnets || !this.securityGroups) {
      this.subnets = new Set();
      this.securityGroups = new Set();
    }
    vpcConfig.subnetIds.forEach((subnet) => this.subnets!.add(subnet));
    vpcConfig.securityGroupIds.forEach((sg) => this.securityGroups!.add(sg));

    if (!this.vpcPermissionsAdded) {
      this.addPolicyStatements({
        effect: Effect.ALLOW,
        actions: [
          "ec2:CreateNetworkInterface",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DeleteNetworkInterface",
          "ec2:DescribeSubnets",
          "ec2:DescribeSecurityGroups",
        ],
        resources: ["*"],
      });

      this.vpcPermissionsAdded = true;
    }
  }

  /**
   * Add a policy statement to the Lambda role.
   */
  public addPolicyStatements(...statements: PolicyStatement[]) {
    // we do lazy initialization here because addPolicyStatements() might be called through the
    // constructor chain of the Function base class which means that our constructor might not have
    // been called yet... yes, ugly.
    if (!this.policyStatements) {
      this.policyStatements = [];
    }

    for (const statement of statements) {
      this.policyStatements.push({
        Action: statement.actions,
        Resource: statement.resources,
        Effect: statement.effect ?? "Allow",
      });
    }
  }

  /**
   * Grants the given identity permissions to invoke this function.
   * @param principal The AWS principal to grant invoke permissions to (e.g. "s3.amazonaws.com", "events.amazonaws.com", "sns.amazonaws.com")
   */
  public addPermissionToInvoke(
    source: Resource,
    principal: string,
    sourceArn: string,
    options: FunctionPermissionsOptions = { qualifier: this.function.version }
  ): void {
    this.permissions = new LambdaPermission(
      this,
      `InvokePermission-${source.node.addr}`,
      {
        functionName: this.functionName,
        action: "lambda:InvokeFunction",
        principal: principal,
        sourceArn: sourceArn,
        ...options,
      }
    );
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }

  /**
   * Unqualified Function ARN
   * @returns Unqualified ARN of the function
   */
  public get functionArn(): string {
    return this.function.arn;
  }

  public get functionName(): string {
    return this.function.functionName;
  }

  /**
   * @internal
   */
  protected _getCodeLines(handler: cloud.IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();
    const client = "$handler";

    lines.push('"use strict";');
    lines.push(`var ${client} = undefined;`);
    lines.push("exports.handler = async function(event) {");
    lines.push(`  ${client} = ${client} ?? (${inflightClient});`);
    lines.push(
      `  return await ${client}.handle(event === null ? undefined : event);`
    );
    lines.push("};");

    return lines;
  }
}
