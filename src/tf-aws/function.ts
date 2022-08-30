import * as crypto from "crypto";
import { mkdtempSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import * as os from "os";
import { join, dirname, basename, resolve } from "path";
import * as aws from "@cdktf/provider-aws";
import { AssetType, Lazy, TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import * as cloud from "../cloud";
import { FunctionProps } from "../cloud";
import {
  Capture,
  Code,
  ICapturable,
  Language,
  NodeJsCode,
  Inflight,
} from "../core";

export class Function extends cloud.FunctionBase {
  private readonly env: Record<string, string> = {};
  private readonly role: aws.iam.IamRole;
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

    const code = this.rewriteHandler(inflight);

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
    const bucket = new aws.s3.S3Bucket(this, "Bucket");

    // Choose an object name so that:
    // - whenever code changes, the object name changes
    // - even if two functions have the same code, they get different names
    //   (separation of concerns)
    const objectKey = `${this.node.addr}.${codeHash}.zip`;

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

    // Add policy to Lambda role for any custom policy statements, such as
    // those needed by captures
    new aws.iam.IamRolePolicy(this, "IamRolePolicy", {
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

    // terraform rejects templates with zero environment variables
    this.addEnvironment("WING_FUNCTION_NAME", this.node.id);
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

  /**
   * Precondition: user provides some the path to a JavaScript file that
   * contains a handler function.
   *
   * Postcondition: we return the path to a JavaScript file that has been
   * rewritten to include all dependencies and captured values, and which has
   * been isolated into its own directory so that it can be zipped up and
   * uploaded to S3.
   *
   * High level process:
   * 1. Read the file (let's say its path is path/to/foo.js)
   * 2. Create a new javascript file named path/to/foo.new.js, including a map
   *    of all capture clients, a new handler that calls the original handler
   *    with the clients passed in, and a copy of the user's code from
   *    path/to/foo.js.
   * 3. Use esbuild to bundle all dependencies, outputting the result to a file
   *    in a temporary directory.
   */
  private rewriteHandler(inflight: Inflight): Code {
    const lines = new Array<string>();

    const originalCode = inflight.code;

    const absolutePath = resolve(originalCode.path);
    const workdir = dirname(absolutePath);
    const filename = basename(absolutePath);

    lines.push("const $cap = {}");
    for (const [name, capture] of Object.entries(inflight.captures)) {
      const clientCode = this.createClient(name, capture);
      lines.push(`$cap["${name}"] = ${clientCode.text};`);
    }
    lines.push();
    lines.push(originalCode.text);
    lines.push();
    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${inflight.entrypoint}($cap, event);`);
    lines.push("};");

    const content = lines.join("\n");
    const filenamenew = filename + ".new.js";
    writeFileSync(join(workdir, filenamenew), content);

    const tempdir = mkdtemp("wingsdk.");
    const outfile = join(tempdir, "index.js");

    esbuild.buildSync({
      bundle: true,
      target: "node16",
      platform: "node",
      absWorkingDir: workdir,
      entryPoints: [filenamenew],
      outfile,
      minify: false,
      // AWS Lambda includes the aws-sdk in all Node Lambda functions, so
      // we can safely omit it from bundled code
      external: ["aws-sdk"],
    });

    // clean up the intermediate file
    unlinkSync(join(workdir, filenamenew));

    return NodeJsCode.fromFile(outfile);
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

function mkdtemp(prefix: string): string {
  return mkdtempSync(join(os.tmpdir(), prefix));
}
