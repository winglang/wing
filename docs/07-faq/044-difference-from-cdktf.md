---
title: What are the main differences between Wing and CDKTF?
id: differences-from-awscdk
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, CDKTF]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. CDKTF is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.

The main differences between the two are:
1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. CDKTF is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to define manually in CDKTF (IAM policies, network topologies, etc).
3. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With the CDKTF, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

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
  <summary>CDKTF</summary>

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
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider, S3Bucket, IamRole, IamRolePolicy, LambdaFunction } from '@cdktf/provider-aws';
import { Asset } from 'cdktf/lib';
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'aws', {
      region: 'us-west-2',
    });

    const bucket = new S3Bucket(this, 'MyBucket', {
      acl: 'private',
    });

    const lambdaRole = new IamRole(this, 'LambdaRole', {
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
      }),
    });

    new IamRolePolicy(this, 'LambdaPolicy', {
      name: 'lambdaPolicy',
      role: lambdaRole.id,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
            Effect: 'Allow',
            Resource: 'arn:aws:logs:*:*:*',
          },
          {
            Action: ['s3:PutObject'],
            Effect: 'Allow',
            Resource: `${bucket.arn}/*`,
          },
        ],
      }),
    });

    const asset = new Asset(this, 'LambdaAsset', {
      path: path.join(__dirname, 'path/to/your/index.js'),
    });

    new LambdaFunction(this, 'UploadFunction', {
      functionName: 'UploadHelloTxt',
      handler: 'index.handler',
      runtime: 'nodejs14.x',
      role: lambdaRole.arn,
      s3Bucket: asset.bucket.bucket,
      s3Key: asset.objectKey,
      environment: [
        {
          name: 'BUCKET_NAME',
          value: bucket.bucket,
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-lambda-upload');
app.synth();

```
</details>
</br>

The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)

| Feature                                         | Wing                                                      | CDKTF                                      |
|-------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| Language                                        | Wing                                                      | Your choice                                  |
| Line of code                                    | 7                                                         | 105                                           |
| Cloud Mechanics (IAM, N/W)                      | Generated automatically from intent                       | Manual                                       |
| Extensibility                                   | Custom resources                                          | Custom Constructs / Resource Providers       |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | Escape hatches to modify underlying CloudFormation |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform and AWS-CDK (CloudFormation) | Terraform (AWS-CDK is used for Cloudformation, but you cannot compile the same code to different engines) |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                |

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).