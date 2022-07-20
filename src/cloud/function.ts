import * as path from "path";
import * as aws from "@cdktf/provider-aws";
import { AssetType, TerraformAsset } from "cdktf";
import { Construct } from "constructs";

export interface FunctionProps {
  readonly codeDirectory: string;
}

export class Function extends Construct {
  private readonly env: Record<string, string> = {};

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);
    props;

    // Create Lambda executable
    const asset = new TerraformAsset(this, "Asset", {
      path: path.resolve(props.codeDirectory),
      type: AssetType.ARCHIVE,
    });

    // Create unique S3 bucket that hosts Lambda executable
    const bucket = new aws.s3.S3Bucket(this, "Bucket");

    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new aws.s3.S3Object(this, "S3Object", {
      bucket: bucket.bucket,
      key: `${this.node.addr}.zip`,
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
}
