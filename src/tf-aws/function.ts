import * as crypto from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname, basename, resolve } from "path";
import * as aws from "@cdktf/provider-aws";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import * as esbuild from "esbuild";
import * as cloud from "../cloud";
import {
  Capture,
  Code,
  ICapturable,
  Language,
  NodeJsCode,
  Process,
} from "../core";

export class Function extends cloud.FunctionBase {
  private readonly env: Record<string, string> = {};
  private readonly role: aws.iam.IamRole;
  private readonly policyStatements: any[] = [];

  constructor(scope: Construct, id: string, process: Process) {
    super(scope, id, process);

    if (process.code.language !== Language.NODE_JS) {
      throw new Error("Only JavaScript code is currently supported.");
    }

    const code = this.rewriteHandler(process);

    // Create Lambda executable
    const asset = new TerraformAsset(this, "Asset", {
      path: resolve(code.path),
      type: AssetType.FILE,
    });

    // Create unique S3 bucket that hosts Lambda executable
    const bucket = new aws.s3.S3Bucket(this, "Bucket");

    // calculate a md5 hash of the contents of asset.path
    const hash = crypto
      .createHash("md5")
      .update(readFileSync(code.path))
      .digest("hex");

    const objectKey = `${hash}${this.node.id}.zip`;

    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new aws.s3.S3Object(this, "S3Object", {
      bucket: bucket.bucket,
      key: objectKey,
      source: asset.path, // returns a posix path
    });

    // Create Lambda role
    this.role = new aws.iam.IamRole(this, "IamRole", {
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

    new aws.iam.IamRolePolicy(this, "IamRolePolicy", {
      role: this.role.name,
      policy: Lazy.stringValue({
        produce: () =>
          JSON.stringify({
            Version: "2012-10-17",
            Statement: this.policyStatements,
          }),
      }),
    });

    // Add execution role for lambda to write to CloudWatch logs
    new aws.iam.IamRolePolicyAttachment(this, "IamRolePolicyAttachment", {
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      role: this.role.name,
    });

    // Create Lambda function
    new aws.lambdafunction.LambdaFunction(this, "LambdaFunction", {
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

    this.addEnvironment("wing", "0.0.0");
  }

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }

  public addPolicyStatements(...statements: PolicyStatement[]) {
    this.policyStatements.push(
      ...statements.map((s) => ({
        Action: s.action,
        Resource: s.resource,
        Effect: s.effect ?? "Allow",
      }))
    );
  }

  private rewriteHandler(process: Process): Code {
    const lines = new Array<string>();

    const code = process.code;

    const absolutePath = resolve(code.path);
    const workdir = dirname(absolutePath);
    const filename = basename(code.path);

    lines.push("const $cap = {}");
    for (const [name, capture] of Object.entries(process.captures)) {
      const clientCode = this.createClient(name, capture);
      lines.push(`$cap["${name}"] = ${clientCode.text};`);
    }
    lines.push();
    lines.push(code.text);
    lines.push();
    lines.push("exports.handler = async function(event) {");
    lines.push("  return await $proc($cap, event);");
    lines.push("};");

    const content = lines.join("\n");
    const filenamenew = filename + ".new.js";
    writeFileSync(join(workdir, filenamenew), content);

    esbuild.buildSync({
      bundle: true,
      target: "node16",
      platform: "node",
      absWorkingDir: workdir,
      entryPoints: [filenamenew],
      outfile: absolutePath,
      minify: false,
      external: ["aws-sdk"],
      allowOverwrite: true,
    });

    return code;
  }

  private createClient(name: string, capture: Capture): Code {
    if (isPrimitive(capture.obj)) {
      return NodeJsCode.fromInline(JSON.stringify(capture.obj));
    }

    if (
      typeof capture.obj == "object" &&
      typeof capture.obj.capture === "function"
    ) {
      const c: ICapturable = capture.obj;
      return c.capture(this, capture);
    }

    throw new Error(`unable to capture "${name}", no "capture" method`);
  }
}

function isPrimitive(value: any) {
  return (
    (typeof value !== "object" && typeof value !== "function") || value === null
  );
}

export interface PolicyStatement {
  readonly action?: string[];
  readonly resource?: string[];
  readonly effect?: string;
}
