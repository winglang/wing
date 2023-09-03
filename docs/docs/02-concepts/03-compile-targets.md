---
title: Compiler targets
id: compiler-targets
description: Wing compiler targets and provisioning engines
keywords: [Wing compiler targets, provisioning engines, multi-cloud]
---

When working with the Wing programming language, an integral part of the compilation process is the use of compiler targets. In essence, compiler targets specify how and where your application is deployed. They determine both the cloud environment and the provisioning engine that the code will be deployed to.

## Targets

You can view the list of available compiler targets with the `wing compile --help` command. Here is an example of the output:

```sh
wing compile --help
Usage: wing compile [options] <entrypoint>

Compiles a Wing program

Arguments:
  entrypoint                 program .w entrypoint

Options:
  -t, --target <target>      Target platform (choices: "tf-aws", "tf-azure", "tf-gcp", "sim", "awscdk", default: "sim")
  -p, --plugins [plugin...]  Compiler plugins
  -h, --help                 display help for command
```

In the Options section, there are several choices for `--target`, such as `tf-aws`, `tf-azure`, `sim`, `awscdk` etc.
The differences between the compiler targets are described in the [CLI user manual].

These targets contain a combination of provisioning engine and cloud environment in their names. The only exception is `sim`, which is a special target for testing and simulation applications locally.

## Portability

The [Wing Cloud Library](/docs/category/cloud-library) has several classes representing abstracted cloud resources, whose APIs are not specific to a single cloud provider.
This allows you to write code that can be deployed to any supported cloud environment or provisioning engine.

Here's an example of a portable code snippet:

```js
bring cloud;

let bucket = new cloud.Bucket();
```

Each resource needs a dedicated implementation to work on a given compiler target.
A catalog of which resources are supported on each cloud can be found [here](/docs/standard-library/compatibility-matrix).

### Provisioning engines

Provisioning is the process of setting up and creating infrastructure, and the provisioning engine is the driver behind this deployment. Common engines used in the Wing compilation process include Terraform and AWS CDK, with support for more planned ([tracking issue](https://github.com/winglang/wing/issues/2066)).

Since a cloud provider may support more than one provisioning engine, a Wing target represents both the provisioning engine and the cloud destination. For instance, `tf-aws` signifies the use of Terraform for AWS deployment, while `tf-gcp` indicates Terraform for Google Cloud deployment.

## Target-specific code

There might be times when you need to write code that is specific to a compiler target. For instance, you may want to activate a verbose logging service only when testing locally to save on cloud log storage costs.

With the Wing `util` library, you can access environment variables. The `WING_TARGET` environment variable contains the current compiler target, which you can use to conditionally run target-specific code. See the example below:

```js playground
bring cloud;
bring util;

let invocationCounter = new cloud.Counter();
let queue = new cloud.Queue();

queue.setConsumer(inflight (msg: str) => {
  invocationCounter.inc();
});

new cloud.Function(inflight ()=> { 
  // push a message to queue
  queue.push("m");
  // sleep according to target 
  if util.env("WING_TARGET") == "sim" {
    log("Running on Simulator, sleeping for 1s");
    util.sleep(1s);
  } else {
    log("Running on the cloud, sleeping for 30s");
    util.sleep(30s);
  }
  log("Function invoked ${invocationCounter.peek()} times");
});
```

In this example, we want to sleep briefly for the Simulator target and for 30 seconds for cloud targets, this is achieved using the `WING_TARGET` environment variable. 

## Compiler plugins

Compiler plugins serve to extend the capabilities of the Wing compiler. They offer customization for the compilation output, such as infrastructure definitions. For instance, a compiler plugin can be employed to enforce a specific tagging convention on all resources within the resulting infrastructure.

Learn more about compiler plugins [here](https://www.winglang.io/docs/tools/compiler-plugins)



