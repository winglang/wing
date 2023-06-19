---
title: Compiler Targets
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

Wing's [cloud library](../04-standard-library/01-cloud) has several classes representing abstracted cloud resources, whose APIs are not specific to a single cloud provider. This allows you to write code that can be deployed to any supported cloud environment or provisioning engine.

Here's an example of a portable code snippet:

```js
bring cloud;

let bucket = new cloud.Bucket();
```

Each resource needs a dedicated implementation to work on a given compiler target.
A catalog of which resources are supported on each cloud can be found [here](../04-standard-library/03-winglang-support-matrix).

### Provisioning engines

When compiling your Wing code for deployment into the cloud, it's crucial to select the right provisioning engine. Provisioning is the process of setting up and creating infrastructure, and the provisioning engine is the driver behind this deployment. Common engines used in the Wing compilation process include Terraform and AWS CDK, with more on the horizon.

Knowing this, it's clear to see how targets represent both the provisioning engine and the cloud destination. For instance, `tf-aws` signifies the use of Terraform for AWS deployment, while `tf-gcp` indicates Terraform for Google Cloud.

## Target-specific code

There might be times when you need to write code that is specific to a compiler target. For instance, you may want to activate a verbose logging service only when testing locally to save on cloud log storage costs.

With the Wing `util` library, you can access environment variables. The `WING_TARGET` environment variable contains the current compiler target, which you can use with an if statement to write target-specific code. See the example below:

```js
bring cloud;
bring util;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter();
let queue = new cloud.Queue();

queue.setConsumer(inflight (msg: str) => {
  let i = counter.inc();
  bucket.put("file-${i}.txt", msg);
});

// only create this verbose logger if our Wing target is sim
if (util.env("WING_TARGET") == "sim") {
  let verboseLogger = new cloud.Service(
    onStart: inflight() => {
      // Continuously log the files in the bucket every 10 seconds
      while true {
        util.sleep(10s);
        log("Files in bucket");
        log("==================");
        for f in bucket.list() {
          log(f);
        }
        log("===================");
      }
    }
  );
}
```

In this example, we're creating a verbose logger service only when the `WING_TARGET` environment variable is set to "sim". The `onStart` function of this service lists the files in the bucket and logs them every 10 seconds.