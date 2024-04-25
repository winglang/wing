---
title: AWS CDK
id: awscdk
sidebar_label: awscdk
description: AWS CDK platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, aws, awscdk, amazon web services, cloudformation]
---

The `@winglang/platform-awscdk` [platform](../02-concepts/03-platforms.md) compiles your program for
the AWS CDK and deployed through the CDK CLI (and AWS CloudFormation).

## Prerequisites

* Install the AWS CDK (or use via `npx cdk`):
  ```sh
  npm i aws-cdk
  ```

* Install the Wing `awscdk` platform:
  ```sh
  npm i @winglang/platform-awscdk
  ```

## Usage

Let's create `main.w` with our Wing program:

```js
bring cloud;

new cloud.Bucket();
```

> At this point, you can just run `wing it` (or `wing run`) to open the Wing Simulator.

To use Wing with the AWS CDK, we will need to tell the CDK CLI to run `wing compile` as the CDK app
and that the synthesis output is in the Wing's target directory.

This can be done by creating a `cdk.json` file manually or through `cdk init` and editing the `app`
and the `output` fields:

```json
{
  "app": "CDK_STACK_NAME='MyStack' CDK_AWS_ACCOUNT='111111555555' CDK_AWS_REGION='us-east-1' wing compile --platform @winglang/platform-awscdk main.w",
  "output": "target/main.awscdk",

  // ... rest of cdk.json
}
```

The `awscdk` platform uses the following environment variables as configuration options:

* `CDK_STACK_NAME` (required) - sets the CloudFormation stack name to use.
- `CDK_AWS_ACCOUNT` and `CDK_AWS_REGION` (optional) - the AWS environment for deployment and context
  lookups (e.g. VPC lookups). The default is to use the AWS account region defined in the CLI
  environment.

Now, the AWS CDK CLI will work as normal:

* `npx cdk bootstrap` bootstrap your AWS account for AWS CDK use (once per account/region).
* `npx cdk deploy` deploy the Wing app to your default AWS account/region.
* `npx cdk synth` synthesize output to `cdk.out`.
* `npx cdk diff` show a diff between your code and the deployed version

## Deployment

Before you can first deploy an AWS CDK app to your account, you'll need to bootstrap the account/region:

```sh
npx cdk bootstrap
```

Now, you can use `cdk deploy` to deploy the latest version:

```sh
npx cdk deploy
```

Let's make a change to your app:

```js
bring cloud;

let b = new cloud.Bucket();

new cloud.Function(inflight () => {
  b.put("hello.txt", "world");
});
```

If we run `cdk diff` we should see the new resources that are about to be created:

```sh
$ npx cdk diff
IAM Statement Changes
┌───┬──────────────────────────────────┬────────┬──────────────────────────────────┬──────────────────────────────────┬───────────┐
│   │ Resource                         │ Effect │ Action                           │ Principal                        │ Condition │
├───┼──────────────────────────────────┼────────┼──────────────────────────────────┼──────────────────────────────────┼───────────┤
│ + │ ${Default/Default/Bucket/Default │ Allow  │ s3:Abort*                        │ AWS:${Default/Default/Function/D │           │
│   │ .Arn}                            │        │ s3:PutObject*                    │ efault/ServiceRole}              │           │
│   │ ${Default/Default/Bucket/Default │        │                                  │                                  │           │
│   │ .Arn}/*                          │        │                                  │                                  │           │
├───┼──────────────────────────────────┼────────┼──────────────────────────────────┼──────────────────────────────────┼───────────┤
│ + │ ${Default/Default/Function/Defau │ Allow  │ sts:AssumeRole                   │ Service:lambda.amazonaws.com     │           │
│   │ lt/ServiceRole.Arn}              │        │                                  │                                  │           │
└───┴──────────────────────────────────┴────────┴──────────────────────────────────┴──────────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬──────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────┐
│   │ Resource                                                     │ Managed Policy ARN                                           │
├───┼──────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ + │ ${Default/Default/Function/Default/ServiceRole}              │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambda │
│   │                                                              │ BasicExecutionRole                                           │
└───┴──────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[+] AWS::Logs::LogGroup Default/Default/Function/LogGroup FunctionLogGroup55B80E27 
[+] AWS::IAM::Role Default/Default/Function/Default/ServiceRole FunctionServiceRole675BB04A 
[+] AWS::IAM::Policy Default/Default/Function/Default/ServiceRole/DefaultPolicy FunctionServiceRoleDefaultPolicy2F49994A 
[+] AWS::Lambda::Function Default/Default/Function/Default Function76856677 


✨  Number of stacks with differences: 1
```

Sweet!, now deploy again:

```sh
npx cdk deploy
```

To destroy your stack, you can use:

```sh
npx cdk destroy
```

## Bringing AWS CDK constructs to your Wing code

You can bring any AWS CDK library and use constructs in your Wing programs.

> Using AWS CDK constructs directly in your Wing application will only have an effect when compiling
> and deploying AWS CDK applications and not when running in the Wing Simulator.

The following example shows how to define an EC2 instance inside a VPC (from a lookup):

```js
bring "aws-cdk-lib" as cdk;

let myVpc = cdk.aws_ec2.Vpc.fromLookup(this, "MyVpc", vpcId: "vpc-111111111222ddddd");

let type = cdk.aws_ec2.InstanceType.of(cdk.aws_ec2.InstanceClass.T2, cdk.aws_ec2.InstanceSize.MICRO);

new cdk.aws_ec2.Instance(
  instanceType: type,
  machineImage: cdk.aws_ec2.MachineImage.latestAmazonLinux2(),
  vpc: myVpc,
);
```

Note that in order for the VPC lookup to work, you will need to make sure `CDK_AWS_ACCOUNT` and
`CDK_AWS_REGION` are configured properly in your `cdk.json` `app` configuration.

## Customizations

### Custom CDK Stack

The `App` class has a `stackFactory` property that can be used to customize how the root CDK stack
is created.

To use this, create a custom platform like this:

```js
import { App } from "@winglang/platform-awscdk";
import { platform } from "@winglang/sdk";

export class Platform implements platform.IPlatform {
  public readonly target = "awscdk";
  public newApp?(appProps: any): any {
    return new App({
      ...appProps,
      stackFactory: (app: cdk.App, stackName: string) => {
        // customize here!
        return new cdk.Stack(app, stackName);
      }
    });
  }
}
```
