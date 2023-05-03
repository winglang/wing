---
title: What are the main differences between Wing and AWS-CDK?
id: differences-from-awscdk
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, CDK, AWS-CDK]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. 
The CDK is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.
These are the main differences between the two:

1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. The CDK is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to manually define in the CDK (IAM policies, network topologies, etc).
3. Wing compiles to Javascript and ASW-CDK. You can use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the output directly.
4. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With the CDK, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

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
<br/>

The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)

| Feature                                         | Wing                                                      | AWS CDK                                      |
|-------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| Language                                        | Wing                                                      | Your choice                                  |
| Line of code                                    | 7                                                         | 72                                           |
| Cloud Mechanics (IAM, N/W)                      | Generated automatically from intent                       | Manual                                       |
| Extensibility                                   | Custom resources                                          | Custom Constructs / Resource Providers       |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | Escape hatches to modify underlying CloudFormation |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform and AWS-CDK (CloudFormation) | CloudFormation (CDKTF is used for Terraform, but you cannot compile the same code to different engines) |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                |

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).