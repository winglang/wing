import * as crypto from "crypto";
import { readFileSync } from "fs";
import { join, resolve } from "path";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamRolePolicy } from "@cdktf/provider-aws/lib/iam-role-policy";
import { IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam-role-policy-attachment";
import { LambdaFunction } from "@cdktf/provider-aws/lib/lambda-function";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3Object } from "@cdktf/provider-aws/lib/s3-object";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import * as cloud from "../cloud";
import * as core from "../core";
import { mkdtemp } from "../util";
import { addConnections } from "./util";

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: LambdaFunction;
  private readonly env: Record<string, string> = {};
  private readonly role: IamRole;
  private readonly policyStatements: any[] = [];
  /** Function ARN */
  public readonly arn: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    inflight._bind(this, ["handle"]);
    const inflightClient = inflight._toInflight();

    const lines = new Array<string>();
    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${inflightClient.text}.handle(event);`);
    lines.push("};");

    const tempdir = mkdtemp();
    const outfile = join(tempdir, "index.js");

    esbuild.buildSync({
      bundle: true,
      stdin: {
        contents: lines.join("\n"),
        resolveDir: tempdir,
        sourcefile: "inflight.js",
      },
      target: "node16",
      platform: "node",
      absWorkingDir: tempdir,
      outfile,
      minify: false,
      external: ["aws-sdk"],
    });

    // bundled code is guaranteed to be in a fresh directory
    const codeDir = resolve(outfile, "..");

    // calculate a md5 hash of the contents of asset.path
    const codeHash = crypto
      .createHash("md5")
      .update(readFileSync(outfile))
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
    // those needed by bound resources
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
      functionName: this.sanitizeFunctionName(this.node.id),
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "index.handler",
      runtime: "nodejs16.x",
      role: this.role.arn,
      environment: {
        variables: this.env,
      },
    });

    this.arn = this.function.arn;

    // terraform rejects templates with zero environment variables
    this.addEnvironment("WING_FUNCTION_NAME", this.node.id);
  }

  /**
   * Temporary work around to use node.id in function name.
   * Valid lambda naming: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-FunctionName
   *
   * Should be deprecated by https://github.com/winglang/wing/discussions/861 (Name Generator)
   */
  private sanitizeFunctionName(name: string): string {
    return name.replace(/[^a-zA-Z0-9\:\-]+/g, "_");
  }

  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
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

    addConnections(this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "FunctionClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  public addEnvironment(name: string, value: string) {
    if (this.env[name] !== undefined) {
      throw new Error(`Environment variable "${name}" already set.`);
    }
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
