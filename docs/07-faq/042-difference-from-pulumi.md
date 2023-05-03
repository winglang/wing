---
title: What are the main differences between Wing and Pulumi?
id: differences-from-pulumi
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, Pulumi]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. Pulumi is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code
The main differences between them are:
1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. Pulumi is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to manually define in Pulumi (IAM policies, network topologies, etc).
3. You will be able to compile Wing to Javascript and Pulumi in the future (roadmap is [here](https://docs.winglang.io/status#roadmap)). You will be able to use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the Pulumi output directly.
4. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With Pulumi, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

## Code samples

To get a deeper understanging of the differences, let's see the same app built in both Wing and Pulumi.
This simple app uses a Function to upload a text file to a Bucket,

<details open>
  <summary>Wing</summary>


    `hello.w`

```ts
bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(inflight () => {
bucket.put("hello.txt", "world!");
});
```

</details>
<br/>

<details>
  <summary>Pulumi</summary>

`index.js`

```js
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const key = 'hello.txt';
  const content = 'Hello world!';

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: content,
  };

  try {
    await S3.putObject(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify('File uploaded successfully.'),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error uploading the file.'),
    };
  }
};
```

`main.ts`

```ts
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
```

`pulumi.yaml`

```yaml
name: s3-lambda-pulumi
runtime: nodejs
description: A simple example that uploads a file to an S3 bucket using a Lambda function
template:
  config:
    aws:region:
      description: The AWS region to deploy into
      default: us-west-2
```


</details>

<br/>

The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)

| Feature                                         | Wing                                                      | Pulumi                                        |
|-------------------------------------------------|-----------------------------------------------------------|-----------------------------------------------|
| Language                                        | Wing                                                      | YAML + your choice                            |
| Line of code                                    | 7                                                         | 98                                            |
| Cloud Mechanics (IAM, N/W)                      | Generated automatically from intent                       | Manual                                        |
| Extensibility                                   | Custom resources                                          | Custom/dynamic providers                      |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | Direct access to cloud-provider APIs          |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                   |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform and AWS-CDK (CloudFormation) | Proprietary    |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                 |


You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).