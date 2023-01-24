import * as crypto from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamRolePolicy } from "@cdktf/provider-aws/lib/iam-role-policy";
import { IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam-role-policy-attachment";
import { LambdaFunction } from "@cdktf/provider-aws/lib/lambda-function";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3Object } from "@cdktf/provider-aws/lib/s3-object";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../utils/resource-names";
import { BUCKET_PREFIX_OPTS } from "./bucket";

/**
 * Function names are limited to 64 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 64,
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LambdaFunction;
  private readonly role: IamRole;
  private policyStatements?: any[];
  /** Function ARN */
  public readonly arn: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    // bundled code is guaranteed to be in a fresh directory
    const codeDir = resolve(this.assetPath, "..");

    // calculate a md5 hash of the contents of asset.path
    const codeHash = crypto
      .createHash("md5")
      .update(readFileSync(this.assetPath))
      .digest("hex");

    // Create Lambda executable
    const asset = new TerraformAsset(this, "Asset", {
      path: codeDir,
      type: AssetType.ARCHIVE,
    });

    // Create unique S3 bucket for hosting Lambda code
    const bucket = new S3Bucket(this, "Code");
    const bucketPrefix = ResourceNames.generateName(bucket, BUCKET_PREFIX_OPTS);
    bucket.bucketPrefix = bucketPrefix;

    // Choose an object name so that:
    // - whenever code changes, the object name changes
    // - even if two functions have the same code, they get different names
    //   (separation of concerns)
    const objectKey = `asset.${this.node.addr}.${codeHash}.zip`;

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

    // Create Lambda function
    this.function = new LambdaFunction(this, "Default", {
      functionName: name,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "index.handler",
      runtime: "nodejs16.x",
      role: this.role.arn,
      environment: {
        variables: Lazy.anyValue({ produce: () => this.env }) as any,
      },
    });

    this.arn = this.function.arn;

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
    return core.InflightClient.for(__filename, "FunctionClient", [
      `process.env["${this.envName()}"]`,
    ]);
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

Function._annotateInflight("invoke", {});
