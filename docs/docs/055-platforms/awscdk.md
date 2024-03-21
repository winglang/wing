---
title: AWS CDK
id: awscdk
sidebar_label: awscdk
description: AWS CDK platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, aws, awscdk, amazon web services, cloudformation]
---

The `@winglang/platform-awscdk` [platform](../02-concepts/03-platforms.md) compiles your program for the AWS CDK (CloudFormation).

## Usage

You will need to install the `@winglang/platform-awscdk` library in order to use this platform.

```sh
$ npm i @winglang/platform-awscdk
```

This platform requires the environment variable `CDK_STACK_NAME` to be set to the name of the CDK
stack to synthesize.

```sh
$ export CDK_STACK_NAME="my-project"
$ wing compile --platform @winglang/platform-awscdk [entrypoint]
```

## Parameters

The `CDK_STACK_NAME` environment variable specifies the name of the CDK stack to synthesize.

## Output

The output includes both a AWS-CDK configuration file (under `target/<entrypoint>.awscdk`) and
JavaScript bundles that include inflight code that executes on compute platforms such as AWS Lambda.

## Deployment

To deploy your app, you will first need to install the [AWS CDK
CLI](https://docs.aws.amazon.com/cdk/v2/guide/cli.html).

If not previously done, you will need to bootstrap your environment (account/region):

```sh
$ cdk bootstrap --app target/app.awscdk
```

And then you can deploy:

```sh
$ cdk deploy --app target/app.awscdk
```

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
