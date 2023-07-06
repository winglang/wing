import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";
import * as mime from "mime";
import * as path from "path";

const config = new pulumi.Config();
const region = config.require("aws:region");

const bucket = new aws.s3.Bucket("s3-bucket");

const role = new aws.iam.Role("lambdaRole", {
  assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
      },
    ],
  }),
});

const policy = new aws.iam.RolePolicy("lambdaPolicy", {
  role: role,
  policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Action: ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
        Effect: "Allow",
        Resource: "arn:aws:logs:*:*:*",
      },
      {
        Action: ["s3:PutObject"],
        Effect: "Allow",
        Resource: `${bucket.arn}/*`,
      },
    ],
  }),
});

const lambdaFunction = new aws.lambda.Function("s3UploaderLambda", {
  runtime: "nodejs14.x",
  code: new pulumi.asset.AssetArchive({
    ".": new pulumi.asset.FileArchive("./"),
  }),
  timeout: 10,
  handler: "index.handler",
  role: role.arn,
  environment: {
    variables: {
      BUCKET_NAME: bucket.bucket,
    },
  },
});

export const bucketName = bucket.bucket;
export const lambdaFunctionName = lambdaFunction.name;

