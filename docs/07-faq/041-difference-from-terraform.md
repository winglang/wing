---
title: What are the main differences between Wing and Terraform?
id: differences-from-terraform
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, TF, Terraform]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. Terraform is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.
These are the main differences between the two:

1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. Terraform is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to manually define in Terraform (IAM policies, network topologies, etc).
3. Wing compiles to Javascript and Terraform. You can use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the Terraform output directly.
4. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With Terraform, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

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

The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)

| Feature                                         | Wing                                                      | Terraform                                    |
|-------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| Language                                        | Wing                                                      | HCL + your choice                            |
| Line of code                                    | 7                                                         | 122                                          |
| Cloud Mechanics (IAM, N/W)                      | Generated automatically from intent                       | Manual                                       |
| Extensibility                                   | Custom resources                                          | Custom modules                               |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | No need since working at low level           |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform and AWS-CDK (CloudFormation) | Terraform                         |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                |

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).