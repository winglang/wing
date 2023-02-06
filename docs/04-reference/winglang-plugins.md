---
title: Compiler Plugins
id: compiler-plugins
description: Wing Compiler Plugins Reference
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, compiler plugins]
---

Wing compiler plugins are used to extend the Wing compiler. They can be used to add non-functional customizations to the compilation's resulting infrastructure. For example, you can use a compiler plugin to enforce a tagging convention on all resources in the resulting infrastructure.

## Plugin Design

A compiler plugin is a JavaScript file that exports multiple functions. These functions are called by the Wing compiler at various points during compilation also referred to as stages.

At each stage the compiler plugin is provided with a context object that allows the plugin to hook into the compilation process and apply customizations.

A single plugin can implement any number of stages. However, it is recommended to only implement the stages that are needed.

## Compilation Stages

Each compilation stage is meant to serve a specific purpose. The following is a list of the stages and their purpose:

### `preSynth` stage

This stage is called before the Wing begins to synthesize. In the context of a cdktf target, this stage will have access to the root node of the construct tree. Allowing for the plugin to add or manipulate constructs before the synthesis process begins.

The following example adds bucket to root node, note this plugin is intended to be used with the `tf-aws` target.
```js
const s3_bucket = require("@cdktf/provider-aws/lib/s3-bucket");

// exports the preSynth function
exports.preSynth = function(app) {
  // app is the root node of the construct tree
  new s3_bucket.S3Bucket(app, "MyPluginBucket", {
    bucket: "my-plugin-bucket",
  });
}
```

### `postSynth` stage

This stage is called after the Wing has finished synthesizing. In the context of a cdktf target, this stage will have access to the raw terraform JSON configuration. Allowing for manipulation of the JSON that is written to the compiled output directory.

This stage is useful for adding customizations that can not be applied in the context of the preSynth phase. Its worth noting that this is not meant as a validation phase since this stage is mutable by subsequent plugins.

The following example manipulates the terraform configuration to use a s3 backend. For brevity, the example uses hard coded values. In practice these would be configurable.
```js
// exports the postSynth function
exports.postSynth = function(config) {
  config.terraform.backend = {
    s3: {
      bucket: "my-wing-state-bucket",
      key: "plugins-rock.tfstate",
      region: "us-east-1",
    }  
  }
  return config;
}
```

### `validate` stage

This stage is called right after the `postSynth` stage and provided the same context object. In the context of a cdktf target, this is the same terraform JSON configuration. However, this stage is immutable which allows for validation of the configuration without worrying about another plugin mutating after the fact.

The following example validates that buckets all have versioning enabled if they don't it will throw an error during compilation.
```js
// exports the validate function
exports.validate = function(config) {
  for (const bucketEntry of Objects.keys(config.resource.aws_s3_bucket)) {
    const bucket = config.resource.aws_s3_bucket[bucketEntry];
    if (!bucket.versioning.enabled) {
      throw new Error(`Bucket ${bucketEntry} does not have versioning enabled`);
    }
  }
}
```

