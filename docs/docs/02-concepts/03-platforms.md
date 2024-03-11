---
title: Platforms
id: platforms
description: Wing platforms
keywords: [platforms, targets, target, platform, aws, gcp, azure, sim, terraform, cloudformation, pulumi, provisioning engines, multi-cloud]
---

When working with the Wing programming language, an integral part of the compilation process is the use of platform. In essence, platform specify how and where your application is deployed. They determine both the cloud environment and the provisioning engine that the code will be deployed with.

You can view the list of available builtin platform with the `wing compile --help` command. Here is an example of the output:

```sh
wing compile --help
Usage: wing compile [options] [entrypoint]

Compiles a Wing program

Arguments:
  entrypoint                    program .w entrypoint

Options:
  -t, --platform <platform> --platform <platform>  Target platform provider (builtin: sim, tf-aws, tf-azure, tf-gcp) (default: [sim])
  -h, --help                    display help for command
```

Wing is shipped with several builtin platforms such as `sim`, `tf-aws`, `tf-azure`, and `tf-gcp` but it is also possible to create and use [custom platforms](#custom-platforms) to fully control how Wing resources are deployed to the cloud.

These providers contain a combination of provision engine and cloud environment in their names, we refer to these as the platform target (which is discussed in more detail below). The only exception is `sim`, which is a special platform for testing and simulating applications locally.

### Specifying Multiple Platforms

You may have noticed that the `--platform` option can be provided multiple times. This means you can specify multiple platforms to compile your application to. For example, if you wanted to compile your application using multiple platforms

```sh
wing compile app.main.w --platform tf-aws --platform platform-foo --platform platform-bar
```
The order in which platforms are evaluated is important. 

The first platform in the list is the primary platform, it is responsible for providing the Wing compiler with the base App that will be used to determine how resources are created, as well it will also lay the ground work for what target the rest of the platforms will need to be compatible with.

#### Using Implicit Platforms

Additionally, you can use naming conventions to implicitly define platforms that should be used. These platform files can be located in the root of your project or in a library that your project uses. The naming convention is as follows:
```sh
platform.js
*.platform.js
```

For example, if you have a file named `my-platform.js` in the root of your project, it will automatically be added to the list of platforms to be used when compiling your application. Its also important to note that implicit platforms are always loaded after the platforms specified in the `--platform` option.

### Provisioning Engines

Provisioning is the process of setting up and creating infrastructure, and the provisioning engine is the driver behind this deployment. Common engines used in the Wing compilation process include Terraform and AWS CDK, with support for more planned ([tracking issue](https://github.com/winglang/wing/issues/2066)).

Understanding the differences between provisioning engines will help as we dive deeper into the additional concepts of the platform provider system.

### Platform Targets

Platform targets are the combination of a provisioning engine and a cloud environment. For example, `tf-aws` is a platform target that uses Terraform as the provisioning engine and AWS as the cloud environment.

It is worth noting that the platform names are not guaranteed to match their targets, we will see this more as we delve into the idea of Custom Platforms below.

Though not currently implemented, the platform target system is designed with extensibility in mind, as it will be used to determine compatibility between different platforms ([tracking issue](https://github.com/winglang/wing/issues/1474))

#### Platform Parameters

Some platform targets may require additional parameters to be provided. These parameters can be used to pass configuration values to the platform. For example, the platform target `tf-aws` has an optional parameter that can be specified to determine if a new VPC 
should be created or if an existing VPC should be used. In order to provide this parameter, you can use the `--value` option in the cli to specify a key-value pair. For example:

```sh
wing compile app.main.w --platform tf-aws --value tf-aws/vpc=existing
```

which will tell the `tf-aws` platform to use an existing VPC. However this will result in an parameter validation error, since when using an existing VPC, you will be required to add additional parameters such as `vpcId` and subnets. As shown in the error below:

```sh
Error: Parameter validation errors:
- must have required property 'vpc_id'
- must have required property 'private_subnet_ids'
- must have required property 'public_subnet_ids'
```

it is possible to provide these additional parameters using the `--value` option as well. For example:

```sh
wing compile app.main.w --platform tf-aws --value tf-aws/vpc=existing --value tf-aws/vpcId=vpc-1234567890 --value tf-aws/privateSubnetId=subnet-1234567890 --value tf-aws/publicSubnetId=subnet-1234567890
```

Though this may be a bit verbose. As an alternative you can use a values file. Value files are a way to provide multiple config values in a single file. By default the compiler will look for a file named `wing` with any of the following extensions `.json`, `.yaml`, `.yml`, `.toml` Though you can also specify a custom file using the `--values` option.

Here is an example of using a `wing.toml` file to provide the same parameters as above:

```toml
[ tf-aws ]
# vpc can be set to "new" or "existing"
vpc = "new"
# vpc_lambda will ensure that lambda functions are created within the vpc on the private subnet
vpc_lambda = true
# vpc_api_gateway will ensure that the api gateway is created within the vpc on the private subnet
vpc_api_gateway = true
# The following parameters will be required if using "existing" vpc
# vpc_id = "vpc-123xyz"
# private_subnet_ids = ["subnet-123xyz"]
# public_subnet_ids = ["subnet-123xyz"]
```

#### Target-specific code

There might be times when you need to write code that is specific to a particular platform target. For example, you may want to activate a verbose logging service only when testing locally to save on cloud log storage costs.

With the Wing `util` library, you can access environment variables. The `WING_TARGET` environment variable contains the current platform target as it's value, which you can use to conditionally run target-specific code. See the example below:

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
  log("Function invoked {invocationCounter.peek()} times");
});

```

## Custom Platforms

Wing's platform architecture is not just limited to the built-in platforms that come with the language; it's extensible. This means you can create custom platforms tailored to your needs, whether to support a unique cloud provider, introduce additional optimization layers, or integrate with specific enterprise systems.

### Why might you want to create a custom platform?

There are many reasons why you might want to create a custom platform. Here are a few examples:

- Custom infrastructure requirements: Wing's built-in platforms are opinionated about how various resources are implemented. With custom platforms, you can fully control the infrastructure configuration of each cloud resource based on the needs, policies and constraints of your team.

- Enhanced Security: Some organizations have stringent security requirements. With custom platforms, you can embed additional security checks, audits, or encryption layers to suit these needs.

- Optimizations: Your organization may have developed optimization strategies that can help reduce costs or improve performance when deploying applications. Integrating these strategies into a custom platform can make them a seamless part of the deployment process.

### Creating a custom platform

Developing a custom platform requires understanding and adhering to the `IPlatform` interface. This ensures that your custom platform can be integrated smoothly with the Wing compilation process. 

The IPlatform interface is defined as follows:

```ts
export interface IPlatform {
  // Define the target compatibility of the platform
  readonly target: string;

  // Define the App that will be used for creating resources
  newApp?(appProps: AppProps): App;

  // Define overrides for concrete resources
  newInstance?(type: string, scope: Construct, id: string, props: any): any;

  // Synthesis Hooks
  preSynth?(app: Construct): void;
  postSynth?(config: any): any;
  validate?(config: any): any;
}
```

### Using a custom platform

When running the `wing compile` command, the `--platform` option is used to specify the platform provider(s) you wish to use. This option accepts variadic arguments, which means you can specify any number of platforms. 

The specified platform can be a built-in platform, or a path to a custom platform. For example, if you have a custom platform named `my-platform`, you can specify it as follows:

```sh
wing compile --platform tf-aws --platform ../my-platform
```

### Synthesis Hooks

In the above interface there are three methods that are categorized as synthesis hooks. These hooks are called by the compiler at various points during the compilation process. They allow you to hook into the compilation process and apply customizations. 

Your platform only needs to implement the methods that are relevant to your use case. For example, if you are creating a platform that is designed to apply additional security configurations for your organization, then you may only need to implement the `preSynth` hook.

Lets take a look at what each hook is responsible for:

:::info Examples Incoming
The following examples of hooks use simple JavaScript files for brevity. However, you can and probably would want to build your platform as a Node library to package and distribute it. Examples of this are coming soon.
:::

### `preSynth` hook

API Reference
```ts
preSynth(app: Construct): void;
```

This hook is called before the compiler begins to synthesize. In the context of a
Terraform-based platform like `tf-aws`, this hook will have access to the root
node of the construct tree. This allows the platform to add or change [CDK for
Terraform](https://github.com/hashicorp/terraform-cdk) constructs before the
tree is synthesized.

The following example adds a bucket to the root node.
```js
const s3_bucket = require("@cdktf/provider-aws/lib/s3-bucket");

exports.Platform = class MyPlatform {
  preSynth(app) {
    // app is the root node of the construct tree
    new s3_bucket.S3Bucket(app, "MyPlatformBucket", {
      bucket: "my-platform-bucket",
    });
  }
} 
```

### `postSynth` hook

API Reference
```ts
postSynth(config: any): any;
```

This hook runs after artifacts were synthesized. When compiling to a
Terraform-based platform like `tf-aws`,  the hook will have access
to the raw Terraform JSON configuration, allowing for manipulation of the JSON
that is written to the compiled output directory.

This hook is useful for adding customizations that can not be applied in the
context of the preSynth hook. Its worth noting that this is not meant as a
validation phase since the config is still mutable by subsequent platforms.

The following example manipulates the Terraform configuration to use a S3
backend. For brevity, the example uses hard coded values.
```js
exports.Platform = class MyPlatform {
  postSynth(config) {
    config.terraform.backend = {
      s3: {
        bucket: "my-wing-state-bucket",
        key: "platforms-rock.tfstate",
        region: "us-east-1",
      }  
    }
    return config;
  }
}
```

### `validate` hook

API Reference
```ts
validate(config: any): void;
```

This hook is called right after the `postSynth` hook and provided the same
context object. In the context of a Terraform-based platform like `tf-aws`, this
is the same Terraform JSON configuration. However, does not allow configuration
to be mutated, which allows platforms to validate the configuration without
worrying about another platform mutating after the fact.

The following example validates that buckets all have versioning enabled
and throw an  error during compilation if they don't.
```js
exports.Platform = class MyPlatform {
  validate(config) {
    for (const bucketEntry of Object.keys(config.resource.aws_s3_bucket)) {
      const bucket = config.resource.aws_s3_bucket[bucketEntry];
      if (!bucket.versioning.enabled) {
        throw new Error(`Bucket ${bucketEntry} does not have versioning enabled`);
      }
    }
  }
} 
```

### Defining Custom Platform Parameters

In addition to the hooks mentioned above, you can also define custom parameters for your platform. These parameters can be used to pass
configuration to your platform and can be optional or required.

Parameters are defined using the `parameters` property of the platform. These parameters are expected to be provided in the form of a 
(JSON schema)[https://json-schema.org/]. 

The following example shoes how to define three parameters `replicateAllBuckets`, `bucketsToReplicate` and `replicaRegion` for a custom platform.
Our platform's logic will either replicate all buckets if `replicateAllBuckets` is set to `true` or replicate only the buckets specified in `bucketsToReplicate` to the region specified in `replicaRegion`.

Its important to understand the relationship between these parameters, as in if `replicateAllBuckets` is set to `true` then `bucketsToReplicate` is not required.
Whereas no matter the value of `replicateAllBuckets`, `replicaRegion` is always required.

Luckily, JSON schema allows us to define these relationships and constraints like so:

```js
class MyPlatform {
  parameters = {
    type: "object",
    required: ["replicateAllBuckets", "replicaRegion"],
    properties: {
      replicateAllBuckets: {
        type: "boolean",
      },
      nameOfBucketsToReplicate: {
        type: "array",
        items: {
          type: "string",
        },
      },
      replicaRegion: {
        type: "string",
      },
    },
    "$comment": "Here in an allOf we can define multiple conditions that must be met for the schema to be valid",
    allOf: [
      {
        if: { properties: { replicateAllBuckets: { const: false }} },
        then: { required: ["nameOfBucketsToReplicate"] },
      }
    ]
  }
}
```
