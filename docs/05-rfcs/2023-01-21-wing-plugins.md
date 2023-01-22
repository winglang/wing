---
title: Wing Plugins
description: How to implement wing plugins
---

# Wing Plugin System

- **Author(s)**: @Hasanaburayyan
- **Submission Date**: {2023-01-21}
- **Stage**: Draft

Implementing a simple wing plugin system

## Background

Developers using wing should whenever possible only care about functional aspects of an application's infrastructure. However, there must be a way to define non-functional requirements as that will be crucial for wide adoption. For instance, an organization may have specific security requirements to adhere to for compliance and regulation sake, such as encryption at rest, versioning, replication etc... 

Applying these non-functional requirements will mean that the wing compiler should provide the ability for users to write plugins that can hook into the compilation process and apply business logic to resources.

## Proposal

The wing plugin system allows you to hook into the compilation process and apply non-functional requirements to the resulting infrastructure. This can be done by writing a javascript plugin that is passed into the wing cli using the `--plugins` option. This option takes in a space separated list of plugin files and they are executed in the order they are passed in. Which means you need to ensure that the order of the plugins are provided in an order that will result in the desired outcome. 

For instance if you have a plugin that applies a tag to all resources, and another plugin that creates additional resources, you need to ensure that the plugin that applies the tags is executed after the plugin that creates the resources (or else the tags will not be applied to the newly created resources).

Another important thing to note is the phases of the compilation process that the plugin system hooks into. The plugin system hooks into the `preSynthesis`, `postSynthesis`, and `validation` phases of the compilation process. 

- The `preSynthesis` phase is executed before the wing sdk code is synthesized which means your plugin will have access to the cdktf root app
- The `postSynthesis` phase is executed after the wing sdk code is synthesized which means your plugin will have access to the resulting terraform config.
- The `validation` phase is executed after the `postSynthesis` phase and is meant to be used to validate the resulting config, thus it is considered an immutable phase.

```js
  // runs after the app is initialized, just before "synth" is called.
  exports.preSynthesis = function preSynthesis(app) {
    // app is the construct tree
  }

  // runs after "synth" is called with the resulting terraform config
  // returns an updated terraform config.
  exports.postSynthesis = function postSynthesis(config) {
    return config; // <-- config can be mutated (optionally)
  }

  // runs after the postSynthesis phase and is meant to be used for validation
  exports.validation = function validation(config) {
    config; // <-- config is immutable and meant to be used for validation
  }
```
Additional iterations on the implementation can be made to allow for more complex plugin systems, such as allowing users to define their plugins in a special query language, or implement their plugins using higher level apis.

## Use Cases

The following use cases are examples of real world scenarios that should be solved by implementing a plugin in the plugin system.

- An organization has a service control policy requiring all IAM policy names to be prefixed with a certain string and to include a specific permission boundary. A developer should be able to write wing code and not care about this non-functional requirement. A plugin can be written to apply this requirement to all IAM policies.

- An organization requires its cloud resources to follow strict security requirements to maintain their HIPPA compliance. These rules include encryption at rest, versioning, replication, isolation, and more. These rules can be encapsulated in a plugin that can be applied to all resources.

- An application team is provided a VPC in their account that was provisioned by the platform engineering team. It is required that all the resources in the application are deployed into this VPC.

- Security policies in an organization require the use of customer managed keys for all resources that support encryption at rest. 

- To better manage and understand costs, an organization requires that all resources are tagged with a certain set of tags.

- An organization's security team has decided that all IAM policies should not contain Allow "*" actions. A plugin can be written to scan the synthesized config and throw an error if a policy statement is found, and where it is found.

- A development team is importing an existing stateful resource into their wing code, however the access to the resource should only ever be readonly. The devops team decides to write a plugin to ensure that no resource in the wing code is ever granted a policy that would allow write access to the imported stateful resource.

## Examples
These examples are meant to be illustrative of the plugin system, and not necessarily the best way to implement the use cases.

Using plugin to apply existing cdk aspects
```ts
// some existing aspect
class HelloAspect implements IAspect {
  visit(node: IConstruct) {
    console.log(`Hello, ${node.node.path}`);
  }
}

// my-plugin.js
class MyPlugin extends WingPlugin {
  preSynthesis(app) {
    Aspects.of(app).add(new HelloAspect());
  }

  postSynthesis(config) {
    // no-op
  }
}
```

Inspect synthesized template for wildcards
```ts
// my-plugin.js
class WildcardPolicyScanner extends WingPlugin {
  preSynthesis(app) {
    // no-op
  }

  postSynthesis(config) {
    const resources = config.resource;
    if (resources.aws_iam_role_policy) {
      const policyKeys = Object.keys(resources.aws_iam_role_policy);
      
      for (const key of policyKeys) {
        const policy = resources.aws_iam_role_policy[key].policy;
        const statements = JSON.parse(policy).Statement;
        
        for (const statement of statements) {
          const actions = statement.Action as string[];
          
          if (actions.includes("*") && statement.Effect === "Allow") {
            throw new Error(`Found a wildcard allow action in policy: ${key}`);
          }
        }
      }
    }
  }
}
```