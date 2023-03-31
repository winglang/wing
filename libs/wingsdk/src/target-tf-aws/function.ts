import { resolve } from "path";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamRolePolicy } from "@cdktf/provider-aws/lib/iam-role-policy";
import { IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam-role-policy-attachment";
import { LambdaFunction } from "@cdktf/provider-aws/lib/lambda-function";
import { LambdaPermission } from "@cdktf/provider-aws/lib/lambda-permission";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3Object } from "@cdktf/provider-aws/lib/s3-object";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { BUCKET_PREFIX_OPTS } from "./bucket";
import * as cloud from "../cloud";
import * as core from "../core";
import { Duration } from "../std/duration";
import { createBundle } from "../utils/bundling";
import { NameOptions, ResourceNames } from "../utils/resource-names";

/**
 * Function names are limited to 64 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 64,
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * options for granting invoke permissions to the current function
 */
export interface FunctionPermissionsOptions {
  /**
   * used for keeping function's versioning.
   */
  readonly qualifier?: string;
}

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function {
  private readonly function: LambdaFunction;
  private readonly role: IamRole;
  private policyStatements?: any[];
  /**
   * Unqualified Function ARN
   * @returns Unqualified ARN of the function
   */
  public readonly arn: string;
  /**
   * Qualified Function ARN
   * @returns Qualified ARN of the function
   */
  public readonly qualifiedArn: string;
  /** Function INVOKE_ARN */
  public readonly invokeArn: string;
  /** Permissions  */
  public permissions!: LambdaPermission;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // bundled code is guaranteed to be in a fresh directory
    const bundle = createBundle(this.entrypoint);

    // Create Lambda executable
    const asset = new TerraformAsset(this, "Asset", {
      path: resolve(bundle.directory),
      type: AssetType.ARCHIVE,
    });

    // Create unique S3 bucket for hosting Lambda code
    // TODO: share all code in a single bucket https://github.com/winglang/wing/issues/178
    const bucket = new S3Bucket(this, "Code");
    const bucketPrefix = ResourceNames.generateName(bucket, BUCKET_PREFIX_OPTS);
    bucket.bucketPrefix = bucketPrefix;

    // Choose an object name so that:
    // - whenever code changes, the object name changes
    // - even if two functions have the same code, they get different names
    //   (separation of concerns)
    const objectKey = `asset.${this.node.addr}.${bundle.hash}.zip`;

    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new S3Object(this, "S3Object", {
      bucket: bucket.bucket,
      key: objectKey,
      source: asset.path, // returns a posix path
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
          if ((this.policyStatements ?? []).length > 0) {
            return JSON.stringify({
              Version: "2012-10-17",
              Statement: this.policyStatements,
            });
          } else {
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
          }
        },
      }),
    });

    // Add execution role for lambda to write to CloudWatch logs
    new IamRolePolicyAttachment(this, "IamRolePolicyAttachment", {
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      role: this.role.name,
    });

    const name = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);

    // validate memory size
    if (props.memory && (props.memory < 128 || props.memory > 10240)) {
      throw new Error(
        "Memory for AWS Lambda function should be in between 128 and 10240"
      );
    }

    // Create Lambda function
    this.function = new LambdaFunction(this, "Default", {
      functionName: name,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "index.handler",
      runtime: "nodejs16.x",
      role: this.role.arn,
      publish: true,
      environment: {
        variables: Lazy.anyValue({ produce: () => this.env }) as any,
      },
      timeout: props.timeout
        ? props.timeout.seconds
        : Duration.fromMinutes(0.5).seconds,
      memorySize: props.memory ? props.memory : undefined,
    });

    this.arn = this.function.arn;
    this.qualifiedArn = this.function.qualifiedArn;
    this.invokeArn = this.function.invokeArn;

    // terraform rejects templates with zero environment variables
    this.addEnvironment("WING_FUNCTION_NAME", name);
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("functions can only be bound by tfaws.Function for now");
    }

    if (ops.includes(cloud.FunctionInflightMethods.INVOKE)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["lambda:InvokeFunction"],
        resource: [`${this.function.arn}`],
      });
    }

    // The function name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.function.arn);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "FunctionClient",
      [`process.env["${this.envName()}"]`]
    );
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

    this.policyStatements.push(
      ...statements.map((s) => ({
        Action: s.action,
        Resource: s.resource,
        Effect: s.effect ?? "Allow",
      }))
    );
  }

  /**
   * Grants the given identity permissions to invoke this function.
   * @param principal The AWS principal to grant invoke permissions to (e.g. "s3.amazonaws.com", "events.amazonaws.com", "sns.amazonaws.com")
   */
  public addPermissionToInvoke(
    source: core.Resource,
    principal: string,
    sourceArn: string,
    options: FunctionPermissionsOptions = { qualifier: this.function.version }
  ): void {
    this.permissions = new LambdaPermission(
      this,
      `InvokePermission-${source.node.addr}`,
      {
        functionName: this._functionName,
        action: "lambda:InvokeFunction",
        principal: principal,
        sourceArn: sourceArn,
        ...options,
      }
    );
  }

  /** @internal */
  public get _functionName(): string {
    return this.function.functionName;
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }
}

/**
 * AWS IAM Policy Statement.
 */
export interface PolicyStatement {
  /** Actions */
  readonly action?: string[];
  /** Resources */
  readonly resource?: string[] | string;
  /** Effect ("Allow" or "Deny") */
  readonly effect?: string;
}

Function._annotateInflight(cloud.FunctionInflightMethods.INVOKE, {});
