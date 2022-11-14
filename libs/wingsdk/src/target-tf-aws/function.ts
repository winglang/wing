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
import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { FunctionInflightMethods, FunctionProps } from "../cloud";
import {
  Code,
  Language,
  Inflight,
  CaptureMetadata,
  InflightClient,
} from "../core";

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.tfaws.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LambdaFunction;
  private readonly env: Record<string, string> = {};
  private readonly role: IamRole;
  private readonly policyStatements: any[] = [];

  constructor(
    scope: Construct,
    id: string,
    inflight: Inflight,
    props: FunctionProps
  ) {
    super(scope, id, inflight, props);

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    if (inflight.code.language !== Language.NODE_JS) {
      throw new Error("Only JavaScript code is currently supported.");
    }

    const captureClients = inflight.makeClients(this);
    const code = inflight.bundle({
      captureScope: this,
      captureClients,
      external: ["aws-sdk"],
    });

    // bundled code is guaranteed to be in a fresh directory
    const codeDir = resolve(code.path, "..");

    // calculate a md5 hash of the contents of asset.path
    const codeHash = crypto
      .createHash("md5")
      .update(readFileSync(code.path))
      .digest("hex");

    // Create Lambda executable
    const asset = new TerraformAsset(this, "Asset", {
      path: codeDir,
      type: AssetType.ARCHIVE,
    });

    // Create unique S3 bucket for hosting Lambda code
    const bucket = new S3Bucket(this, "Bucket");

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
    // those needed by captures
    new IamRolePolicy(this, "IamRolePolicy", {
      role: this.role.name,
      policy: Lazy.stringValue({
        produce: () => {
          if (this.policyStatements.length > 0) {
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

    // Create Lambda function
    this.function = new LambdaFunction(this, "Default", {
      functionName: this.node.id,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "index.handler",
      runtime: "nodejs16.x",
      role: this.role.arn,
      environment: {
        variables: this.env,
      },
    });

    // terraform rejects templates with zero environment variables
    this.addEnvironment("WING_FUNCTION_NAME", this.node.id);
  }

  /**
   * @internal
   */
  public _bind(captureScope: IConstruct, metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error(
        "functions can only be captured by tfaws.Function for now"
      );
    }

    const env = `FUNCTION_NAME__${this.node.id}`;

    const methods = new Set(metadata.methods ?? []);
    if (methods.has(FunctionInflightMethods.INVOKE)) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["lambda:InvokeFunction"],
        resource: [`${this.function.arn}`],
      });
    }

    // The function name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    captureScope.addEnvironment(env, this.function.arn);

    return InflightClient.for(__filename, "FunctionClient", [
      `process.env["${env}"]`,
    ]);
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }

  /**
   * Add a policy statement to the Lambda role.
   */
  public addPolicyStatements(...statements: PolicyStatement[]) {
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

/**
 * AWS implementation of inflight client for `cloud.Function`.
 */
export interface IFunctionClient extends cloud.IFunctionClient {}
