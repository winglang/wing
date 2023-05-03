---
title: Why is Wing a language, not just another library or framework? 🤔
id: why-a-language
keywords: [faq, why language, library, winglang, Wing programming language, Wing language]
---

## New language for a new programming model

Cloud applications are fundamentally different from applications that run on a single machine - they are distributed systems that rely on cloud infrastructure to achieve their goals.

To express both infrastructure and application logic in a safe and unified programming model (aka "*cloud-oriented*"), Winglang has two execution phases: Preflight for infrastructure definitions and inflight for runtime code.

Preflight code is executed during compilation and produces the infrastructure configuration for your app (e.g. Terraform, CloudFormation, etc). Inflight code is compiled to JavaScript and executed within cloud compute platforms in Node.js environments.

Let's look at a simple example:

```ts
bring cloud;

let queue = new cloud.Queue();
let counter = new cloud.Counter();
let bucket = new cloud.Bucket();

queue.add_consumer(inflight (message: str) => {
  let i = counter.inc();
  bucket.put("file-${i}.txt", message);
});
```

`cloud.Queue`, `cloud.Counter`, and `cloud.Bucket` are *preflight objects*. They represent cloud infrastructure resources. When compiled to a specific cloud provider, such as AWS, a Terraform file will be produced with the provider's implementation of these resources. The `queue.add_consumer()` method is a *preflight method* that configures the infrastructure to invoke a particular *inflight function* for each message in the queue.

**Now comes the cool part**: the code that runs inside the inflight function interacts with the `counter` and the `bucket` objects through their *inflight methods* (`counter.inc()` and `bucket.put()`). These methods can only be called from inflight scopes.

## Very cool, but what here cannot be done by a library or compiler extension?

In existing languages, where there is no way to distinguish between multiple execution phases, it is impossible to naturally represent this idea that an object has methods that can only be executed from within a specific execution phase.

In addition, other parts of Wing's *cloud-oriented* cannot be represented naturally without native support from the language. Wwe've seen some worthy efforts in projects like [Pulumi's Function Serialization](https://www.pulumi.com/docs/intro/concepts/function-serialization/) and [Functionless](https://functionless.org/). But although these efforts come close, they either have to make compromises in safety (e.g. it is possible to capture mutable objects) or in the programming model (e.g. type system is too complex).

We believe that Wing, a language that natively supports this paradigm, will make using it much easier by streamlining common patterns, in a way that is impossible to accomplish with existing ones. Kind of like what C++ did for object orientation. You could write object-oriented code in C, but you had to work hard to make it work without native support from the language.

## So how does writing code in Wing compare to other solutions?

By natively supporting the cloud-oriented programming paradigm, Wing allows developers to write very few lines of code and let the compiler take care of IAM policies and other cloud mechanics.

Below we've written the same simple demo app in Wing and other solutions. This simple app uses a Function to upload a text file to a Bucket, even without the `Counter` seen above that further complicates matters in other solutions:

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

</br>

<details>
  <summary>Terraform + Javascript</summary>

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

`main.tf`

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

locals {
  lambda_function_name = "upload_hello_txt_lambda"
}

resource "aws_s3_bucket" "this" {
  bucket = "my-s3-bucket"
  acl    = "private"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "index.js"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "this" {
  function_name = local.lambda_function_name
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = data.archive_file.lambda_zip.output_path
  timeout       = 10

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.this.bucket
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Action = [
          "s3:PutObject"
        ]
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.this.arn}/*"
      }
    ]
  })
}

output "bucket_name" {
  value = aws_s3_bucket.this.bucket
}

output "lambda_function_name" {
  value = aws_lambda_function.this.function_name
}
```
</details>

</br>

<details>
  <summary>AWS-CDK</summary>

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

`hello.js`

```js
const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const s3 = require('@aws-cdk/aws-s3');
const iam = require('@aws-cdk/aws-iam');

class YourProjectNameStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: false,
    });

    const lambdaRole = new iam.Role(this, 'LambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    lambdaRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: ['arn:aws:logs:*:*:*'],
      }),
    );

    lambdaRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:PutObject'],
        resources: [`${bucket.bucketArn}/*`],
      }),
    );

    const uploadFunction = new lambda.Function(this, 'UploadFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('path/to/your/index.js'),
      role: lambdaRole,
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });
  }
}

module.exports = { YourProjectNameStack };
```
</details>

</br>

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

</br>

The below table contains the main differences that you can see in the code examples:

| Feature                    | Wing                  | Pulumi                  | Terraform              | AWS CDK                |
|----------------------------|-----------------------|-------------------------|------------------------|------------------------|
| Language                   | Wing                  | YAML + your choice      | HCL + your choice      | Your choice            |
| Line of code               | 7                     | 98                      | 122                    | 72                     |
| Cloud Mechanics (IAM, N/W) | Generated automatically from intent | Manual              | Manual                 | Manual                 |

This table contains some more differences that cannot fit in a small code sample :)

| Feature                      | Wing                                          | Pulumi                                  | Terraform                              | AWS CDK                                |
|------------------------------|-----------------------------------------------|-----------------------------------------|----------------------------------------|----------------------------------------|
| Extensibility                | Custom resources                              | Custom/dynamic providers                | Custom modules                         | Custom Constructs / Resource Providers |
| Customizing lower levels     | Compiler plugins to customize generated Terraform | Direct access to cloud-provider APIs | No need since working at low level     | Escape hatches to modify underlying CloudFormation |
| Local simulation             | Built-in functional local simulator with instant hot reloading | No | No | No |
| Cross-cloud support          | Same code compiles to different clouds        | No (need to write different code for different clouds) | No (need to write different code for different clouds) | No (need to write different code for different clouds) |
| Provisioning engine          | Same code compiles to Terraform and AWS-CDK (CloudFormation) | Proprietary | Terraform | CloudFormation (CDKTF is used for Terraform, but you cannot compile the same code to different engines) |
| Testing                      | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing | Need mocks for local testing | Need mocks for local testing |

## Anything else?
Creating a new language that is tailored to the cloud from the ground up also allows us to assemble a variety of features (some of which exist in other languages, of course) that, when put together, offer a delightful cloud development experience. You can read more about what these features are [here](https://docs.winglang.io/faq/good-fit).
