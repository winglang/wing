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
  class MyWingPlugin {
    // runs after the app is initialized, just before "synth" is called.
    preSynthesis(app) {
      // "app" is the construct tree
    }

    // runs after "synth" is called with the resulting terraform config
    // returns an updated terraform config.
    postSynthesis(config) {
      return config; // <-- can be mutated (optionally)
    }

    // runs after the postSynthesis phase and is meant to be used to validate the resulting config.
    validate(config) {
      config; // <-- immutable only meant for validation
    }
  }
```
Additional iterations on the implementation can be made to allow for more complex plugin systems, such as allowing users to define their plugins in a special query language, or implement their plugins using higher level apis.

## Use Cases

The following use cases are examples of real world scenarios that should be solved by implementing a plugin in the plugin system.

- An organization has a service control policy requiring all IAM policy names to be prefixed with a certain string and to include a specific permission boundary. A developer should be able to write wing code and not care about this non-functional requirement. A plugin can be written to apply this requirement to all IAM policies.

  **Plugin Example:**
  ```js
  class IamNamingConventionsAspect {
    constructor() {
      this.namePrefix = 'SOME_PREFIX';
      this.permissionsBoundaryArn = 'SOME_ARN';
    }
    visit(node) {
      if (node instanceof IamRole) {
        node.namePrefix = this.namePrefix;
        node.permissionsBoundary = this.permissionsBoundaryArn;
      }
    }
  }
  class IamNamingConventions {
    constructor() { }
    preSynthesis(app) {
      Aspects.of(app).add(new IamNamingConventionsAspect());
    }
  }
  ```

- An organization requires its cloud resources to follow strict security requirements to maintain their HIPPA compliance. These rules include encryption at rest, versioning, replication, isolation, and more. These rules can be encapsulated in a plugin that can be applied to all resources.
  **Plugin Example: TODO**

- An application team is provided a VPC in their account that was provisioned by the platform engineering team. It is required that all the resources in the application are deployed into this VPC.
  **Plugin Example:**
  ```js
  class SandboxVPCAspect {
    constructor() { }
    visit(node) {
      if (node instanceof LambdaFunction) {
        node.putVpcConfig({
          subnetIds: ["SOME_SUBNET_ID"],
          securityGroupIds: ["SOME_SG_ID"]
        });
      }
    }
  }
  class SandboxVPCPlugin {
    constructor() { }
    preSynthesis(app) {
      Aspects.of(app).add(new SandboxVPCAspect());
    }
  }
  ```

- Security policies in an organization require the use of customer managed keys for all resources that support encryption at rest. 
  **Plugin Example: TODO**

- To better manage and understand costs, an organization requires that all resources are tagged with a certain set of tags.
  **Plugin Example: TODO**

- An organization's security team has decided that all IAM policies should not contain Allow "*" actions. A plugin can be written to scan the synthesized config and throw an error if a policy statement is found, and where it is found.
  **Plugin Example:**
  ```js
  class ForbidWildcards {
    constructor() { }
    validate(config) {
      const resources = config.resource;
      if (resources.aws_iam_role_policy) {
        const policyKeys = Object.keys(resources.aws_iam_role_policy);
        for (const key of policyKeys) {
          const policy = resources.aws_iam_role_policy[key].policy;
          const statements = JSON.parse(policy).Statement;
          for (const statement of statements) {
            const actions = statement.Action;
            if (actions.includes("*") && statement.Effect === "Allow") {
              throw new Error(`Found a wildcard allow action in policy: ${key}`);
            }
          }
        }
      }
    }
  }
  ```
- A development team is importing an existing stateful resource into their wing code, however the access to the resource should only ever be readonly. The devops team decides to write a plugin to ensure that no resource in the wing code is ever granted a policy that would allow write access to the imported stateful resource.

- An organization requires that for every bucket in an app, versioning and replication must be enabled.
  **Plugin Example:**
  ```js
  const cdktf_1 = require("cdktf");
  const s3_bucket_1 = require("@cdktf/provider-aws/lib/s3-bucket");
  const s3_bucket_replication_configuration_1 = require("@cdktf/provider-aws/lib/s3-bucket-replication-configuration");
  const iam_role_1 = require("@cdktf/provider-aws/lib/iam-role");
  const iam_policy_1 = require("@cdktf/provider-aws/lib/iam-policy");
  const iam_policy_attachment_1 = require("@cdktf/provider-aws/lib/iam-policy-attachment");
  const s3_bucket_versioning_1 = require("@cdktf/provider-aws/lib/s3-bucket-versioning");

  class ReplicateS3Aspect {
    constructor() { }
    visit(node) {
      if (node instanceof s3_bucket_1.S3Bucket) {
        const scope = node.node.scope;
        const replicaBucket = new s3_bucket_1.S3Bucket(scope, `Replica${node.node.id}`, {
          bucket: `replica-${node.bucket}`
        });
        
        const replicaRole = new iam_role_1.IamRole(scope, `Replica${node.node.id}Role`, {
          name: `replica-${node.bucket.substring(0, 20)}`,
          assumeRolePolicy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Action: "sts:AssumeRole",
                Principal: {
                  Service: "s3.amazonaws.com"
                },
                Effect: "Allow",
                Sid: "AllowS3Replication"
              }
            ]
          })
        });
        
        const replicaPolicy = new iam_policy_1.IamPolicy(scope, `Replica${node.node.id}Policy`, {
          name: `replica-${node.bucket.substring(0, 20)}`,
          policy: JSON.stringify({
            Version: "2012-10-17",
              Statement: [
                {
                  Action: [
                    "s3:GetReplicationConfiguration",
                    "s3:ListBucket",
                  ],
                  Effect: "Allow",
                  Resource: [
                    node.arn,
                    `${node.arn}/*`
                  ]
                },
                {
                  Action: [
                    "s3:GetObjectVersionForReplication",
                    "s3:GetObjectVersionAcl",
                    "s3:GetObjectVersionTagging",
                  ],
                  Effect: "Allow",
                  Resource: `${node.arn}/*`
                },
                {
                  Action: [
                    "s3:ReplicateObject",
                    "s3:ReplicateDelete",
                    "s3:ReplicateTags",
                  ],
                  Effect: "Allow",
                  Resource: `${replicaBucket.arn}/*`
                }
              ]
            }),
          });
          
          new iam_policy_attachment_1.IamPolicyAttachment(scope, `Replica${node.node.id}PolicyAttachment`, {
            policyArn: replicaPolicy.arn,
            name: `replica-policy-attachment${node.bucket}`,
            roles: [replicaRole.name]
          });
          
          new s3_bucket_versioning_1.S3BucketVersioningA(scope, `Source${node.node.id}Versioning`, {
            bucket: node.id,
            versioningConfiguration: {
            status: "Enabled"
            }
          });
          
          new s3_bucket_versioning_1.S3BucketVersioningA(scope, `Replica${node.node.id}Versioning`, {
            bucket: replicaBucket.id,
            versioningConfiguration: {
              status: "Enabled"
            }
          });
          
          new s3_bucket_replication_configuration_1.S3BucketReplicationConfigurationA(scope, `Replica${node.node.id}Config`, {
            bucket: node.id,
            role: replicaRole.arn,
            rule: [
              {
                id: `replicate-${node.bucket}`,
                destination: {
                  bucket: replicaBucket.arn,
                  storageClass: "STANDARD"
                },
                status: "Enabled",
              }
            ]
          });
        }
      }
  }
  class ReplicateS3Plugin {
      constructor() { }
      preSynthesis(app) {
        cdktf_1.Aspects.of(app).add(new ReplicateS3Aspect());
      }
      postSynthesis(config) { config; }
  }
  exports.ReplicateS3Plugin = ReplicateS3Plugin;
```

