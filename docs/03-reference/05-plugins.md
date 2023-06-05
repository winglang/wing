---
title: Plugins
id: plugins
description: Wing Compiler Plugins Reference
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, compiler plugins]
---

Wing compiler plugins are used to extend the Wing compiler. They can be used to
customize to the compilation output such as  infrastructure definitions.
For example, you can use a compiler plugin to enforce a tagging convention on
all resources in the resulting infrastructure.

## Plugin Design

A compiler plugin is a JavaScript file that exports multiple functions (called hooks). These
hooks are called by the compiler at various points during compilation.

Each hook is provided some context object that allows
the plugin to hook into the compilation process and apply customizations.

A single plugin can implement any number of hooks. However, it is recommended
to only implement the hooks that are needed.

## Compilation Hooks

The compiler offers hooks that can be used to customize its behavior at various
points during the compilation process.

### `preSynth` hook

API Reference
```ts
preSynth(app: Construct): void;
```

This hook is called before the compiler begins to synthesize. In the context of a
Terraform-based  target like `tf-aws`, this hook will have access to the root
node of the construct tree. This allows the plugin to add or change [CDK for
Terraform](https://github.com/hashicorp/terraform-cdk) constructs before the
tree is synthesized.

The following example adds a bucket to the root node (note this plugin is
intended to be used  with the `tf-aws` target).
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

### `postSynth` hook

API Reference
```ts
postSynth(config: any): any;
```

This hook runs after artifacts were synthesized. When compiling to a
Terraform-based target like `tf-aws`,  the hook will have access
to the raw Terraform JSON configuration, allowing for manipulation of the JSON
that is written to the compiled output directory.

This hook is useful for adding customizations that can not be applied in the
context of the preSynth hook. Its  worth noting that this is not meant as a
validation phase since the config is still mutable by subsequent plugins.

The following example manipulates the Terraform configuration to use a S3
backend. For brevity, the example uses  hard coded values. In practice these
could be configured through environment variables, class constructors,
configuration files, etc.
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

### `validate` hook

API Reference
```ts
validate(config: any): void;
```

This hook is called right after the `postSynth` hook and provided the same
context object. In the context of a  Terraform-based target like `tf-aws`, this
is the same Terraform JSON configuration. However, does not allow configuration
to be mutated, which allows plugins to validate the configuration without
worrying about another plugin mutating after the fact.

The following example validates that buckets all have versioning enabled
and throw an  error during compilation if they don't.
```js
// exports the validate function
exports.validate = function(config) {
  for (const bucketEntry of Object.keys(config.resource.aws_s3_bucket)) {
    const bucket = config.resource.aws_s3_bucket[bucketEntry];
    if (!bucket.versioning.enabled) {
      throw new Error(`Bucket ${bucketEntry} does not have versioning enabled`);
    }
  }
}
```

### Plugin names

Another optional feature of plugins is the ability to specify a name. By default
the compiler will use the absolute path of a plugin when displaying diagnostic
messages. Take for example the following plugin:

```js
exports.preSynth = function(app) {
  // something went oops here
  throw new Error("oops");
}
```
this will result in the following error message:

```
preflight error: Plugin "/some/absolute/path/to/plugin/oops-plugin.js" failed, during "preSynth". cause: oops
```

In this case we could choose to export a name for the plugin that will be used
in diagnostic messages. To export a name just add `exports.name =
'my-oopsie-plugin';`

Then the resulting error message would be:

```
preflight error: Plugin "my-oopsie-plugin" failed, during "preSynth". cause: oops
```

