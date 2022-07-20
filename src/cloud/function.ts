import * as crypto from "crypto";
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { join, resolve } from "path";
import * as aws from "@cdktf/provider-aws";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import * as esbuild from "esbuild";
import { Capture, ICapturable, Process } from "../core";

export class Function extends Construct {
  private readonly env: Record<string, string> = {};

  constructor(scope: Construct, id: string, process: Process) {
    super(scope, id);

    this.rewriteHandler(process);

    // Create Lambda executable
    const asset = new TerraformAsset(this, "Asset", {
      path: path.resolve(process.path),
      type: AssetType.ARCHIVE,
    });

    // Create unique S3 bucket that hosts Lambda executable
    const bucket = new aws.s3.S3Bucket(this, "Bucket");

    // calculate a md5 hash of the contents of asset.path
    const hash = crypto
      .createHash("md5")
      .update(readFileSync(join(process.path, "index.js")))
      .digest("hex");

    const objectKey = `${hash}${this.node.addr}.zip`;

    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new aws.s3.S3Object(this, "S3Object", {
      bucket: bucket.bucket,
      key: objectKey,
      source: asset.path, // returns a posix path
    });

    // Create Lambda role
    const role = new aws.iam.IamRole(this, "IamRole", {
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

    // Add execution role for lambda to write to CloudWatch logs
    new aws.iam.IamRolePolicyAttachment(this, "IamRolePolicyAttachment", {
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      role: role.name,
    });

    // Create Lambda function
    new aws.lambdafunction.LambdaFunction(this, "LambdaFunction", {
      functionName: this.node.addr,
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: "index.handler",
      runtime: "nodejs16.x",
      role: role.arn,
      environment: {
        variables: this.env,
      },
    });

    this.addEnvironment("wing", "0.0.0");
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }

  private rewriteHandler(process: Process) {
    const lines = new Array<string>();

    const workdir = resolve(process.path);
    const indexjs = "index.js";

    const source = readFileSync(join(workdir, indexjs), "utf-8");

    lines.push("const $cap = {}");
    for (const [name, capture] of Object.entries(process.captures)) {
      lines.push(`$cap["${name}"] = ${this.createClient(name, capture)};`);
    }
    lines.push();
    lines.push(source);
    lines.push();
    lines.push("exports.handler = async function(event) {");
    lines.push("  return await $proc($cap, event);");
    lines.push("};");

    const content = lines.join("\n");
    const indexjsnew = indexjs + ".new.js";
    writeFileSync(join(workdir, indexjsnew), content);

    esbuild.buildSync({
      bundle: true,
      target: "node16",
      platform: "node",
      absWorkingDir: workdir,
      entryPoints: [indexjsnew],
      outfile: indexjs,
      minify: false,
      external: ["aws-sdk"],
      allowOverwrite: true,
    });
  }

  private createClient(name: string, capture: Capture): string {
    if (isPrimitive(capture.obj)) {
      return JSON.stringify(capture.obj);
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
