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

The wing plugin system allows you to hook into the compilation process and apply non-functional requirements to the resulting infrastructure. This can be done by writing a javascript plugin that is passed into the wing cli using the `--plugins` option. This option takes in a space separated list of plugin files and they are executed in the order they are passed in. Which means you need to ensure that the order of the plugins are provided in an order that will result in the desired outcome. 

## Walkthrough

lets discuss what non-functional requirements we want to achieve with this plugin. At a distance we want to ensure that all our lambda functions are going to be tagged with our team's name to indicate ownership, this will help tremendously when incidents occur. We also have the requirement that all of the lambda functions in our application should have a node runtime of `nodejs18.x` that way we know that all of our applications are being forced to run a uniform version of node. Lastly security has been complaining that audits have found several lambda functions have environment variables named `PASSWORD` and `SECRET` which are not encrypted and only ever meant for local development, we will want to check the code for these and remove them before they are deployed.

To summarize we want to do the following:
- Tag all lambda functions with a team name
- Set all lambda functions to use nodejs18.x
- Validate that there are no obvious secrets in the lambda environment variables

Before we get started lets dive into the phases of the wing plugin system. Each one of these phases has a different purpose and is executed at a different point in the compilation process.

- The `preSynthesis` phase is executed before the wing sdk code is synthesized which means your plugin will have access to the cdktf root app.
- The `postSynthesis` phase is executed after the wing sdk code is synthesized which means your plugin will have access to the resulting terraform config.
- The `validation` phase is executed after the `postSynthesis` phase and is meant to be used to validate the resulting config, thus it is considered an immutable phase.

### Phase 1 PreSynth

Creating our wing plugin is as simple as creating a javascript file that exports the phases we want to implement. For this example we will create a file called `my-plugin.js` and export the phases we want to implement.

We will implement our tagging requirement using the preSynth phase. This because we have access to the cdktf root app which means we can apply an Aspect to our tree. To learn more about Aspects please refer to the [cdktf aspect docs](https://developer.hashicorp.com/terraform/cdktf/concepts/aspects).

So before we write our preSynth code lets create the Aspect.

```js
const cdktf = require("cdktf");
const lambda = require("@cdktf/provider-aws/lib/lambda-function");

class TagLambdaAspect {
  constructor(tagsToAdd) {
    this.tagsToAdd = tagsToAdd;
  }
  visit(node) {
    if (node instanceof lambda.LambdaFunction) {
      node.tags = { ...node.tags, ...this.tagsToAdd };
    }
  }
}
```
Alright we have an aspect, and its pretty simple. It takes in a map of tags and applies them to all lambda functions in the tree. Now lets implement the preSynth phase.

```js
// my-plugin.js
exports.preSynth = function (app) {
  cdktf.Aspects.of(app).add(new TagLambdaAspect(
    { 
      "owner": "wingnuts team",
      "email": "hopeitdontbreak@outfishing.com" 
    }
  ));
}
```
Boom! just like that we have our first requirement in the preSynth phase. Now lets move on to the next requirement.

### Phase 2 PostSynth
For setting our timeouts we will use the postSynth phase. This is because we have access to the resulting terraform config and can modify it as we see fit. This could also have been done in the preSynth phase but we will do it here to show off the mutability of the postSynth phase.

In this phase we have access to the raw terraform code, and we know that lambda functions in terraform can be found in the `resource "aws_lambda_function"` block. So we will use the `postSynth` phase to find all the lambda functions and set their node runtime to nodejs18.x

```js
exports.postSynth = function (config) {
  const functions = Object.keys(config.resource.aws_lambda_function);
  for (const function of functions) {
    config.resource.aws_lambda_function[func].runtime = "nodejs18.x";
  }
  return config;
};
```
I know, i know, but its that easy! Its worth calling out here that this function must return the manipulated config. This manipulated config is then used to override the existing config and is used for the validation phase. Which speaking of...

### Phase 3 Validation
For our final security requirement we are going to use the validation phase. This phase is meant to be used to validate the resulting config, thus it is considered an immutable phase. This means that we cannot modify the config in this phase, we can only validate it and throw an error if it does not meet our requirements.

```js
exports.validate = function (config) {
  const functions = Object.keys(config.resource.aws_lambda_function);
  for (const func of functions) {
    const envVars = config.resource.aws_lambda_function[func].environment.variables;
    if (envVars.PASSWORD || envVars.SECRET) {
      throw new Error("Found unsafe environment variables in: " + envVars);
    }
  }
}
```

Viola! We have implemented all of our requirements and have a working plugin. Now all we have to do is run `wing compile` with our plugin and we will see the results.

```bash
$ wing compile -t tf-aws -p ./my-plugin.js app.w
```

## Other Use Cases

The following use cases are examples of real world scenarios that should be solved by implementing a plugin in the plugin system.

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
exports.preSynthesis = function(app) {
  new SandboxVPCPlugin().preSynthesis(app);
}
```

- Security policies in an organization require the use of customer managed keys for all resources that support encryption at rest. 
  **Plugin Example: TODO**

- To better manage and understand costs, an organization requires that all resources are tagged with a certain set of tags.
  **Plugin Example: TODO**

- An organization's security team has decided that all IAM policies should not contain Allow "*" actions. A plugin can be written to scan the synthesized config and throw an error if a policy statement is found, and where it is found.
**Plugin Example:**
```js
exports.validate = function(config) {
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
```
- A development team is importing an existing stateful resource into their wing code, however the access to the resource should only ever be readonly. The devops team decides to write a plugin to ensure that no resource in the wing code is ever granted a policy that would allow write access to the imported stateful resource.

- An organization requires that for every bucket in an app, versioning and replication must be enabled.
**Plugin Example:**
```js
const cdktf = require("cdktf");
const s3_bucket = require("@cdktf/provider-aws/lib/s3-bucket");
const s3_bucket_replication_configuration = require("@cdktf/provider-aws/lib/s3-bucket-replication-configuration");
const iam_role = require("@cdktf/provider-aws/lib/iam-role");
const iam_policy = require("@cdktf/provider-aws/lib/iam-policy");
const iam_policy_attachment = require("@cdktf/provider-aws/lib/iam-policy-attachment");
const s3_bucket_versioning = require("@cdktf/provider-aws/lib/s3-bucket-versioning");

class ReplicateS3Aspect {
  constructor() { }
  visit(node) {
    if (node instanceof s3_bucket.S3Bucket) {
      const scope = node.node.scope;
      const replicaBucket = new s3_bucket.S3Bucket(scope, `Replica${node.node.id}`, {
        bucket: `replica-${node.bucket}`
      });
      
      const replicaRole = new iam_role.IamRole(scope, `Replica${node.node.id}Role`, {
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
      
      const replicaPolicy = new iam_policy.IamPolicy(scope, `Replica${node.node.id}Policy`, {
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
        
        new iam_policy_attachment.IamPolicyAttachment(scope, `Replica${node.node.id}PolicyAttachment`, {
          policyArn: replicaPolicy.arn,
          name: `replica-policy-attachment${node.bucket}`,
          roles: [replicaRole.name]
        });
        
        new s3_bucket_versioning.S3BucketVersioningA(scope, `Source${node.node.id}Versioning`, {
          bucket: node.id,
          versioningConfiguration: {
          status: "Enabled"
          }
        });
        
        new s3_bucket_versioning.S3BucketVersioningA(scope, `Replica${node.node.id}Versioning`, {
          bucket: replicaBucket.id,
          versioningConfiguration: {
            status: "Enabled"
          }
        });
        
        new s3_bucket_replication_configuration.S3BucketReplicationConfigurationA(scope, `Replica${node.node.id}Config`, {
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

exports.preSynthesis = function (app) {
  cdktf.Aspects.of(app).add(new ReplicateS3Aspect());
};
```

- An organization has a service control policy requiring all IAM policy names to be prefixed with a certain string and to include a specific permission boundary. A developer should be able to write wing code and not care about this non-functional requirement. A plugin can be written that is reusable for various teams and naming conventions.

**Plugin Example:**
```js
var iam_role = require("@cdktf/provider-aws/lib/iam-role");
var cdktf = require("cdktf");

class IamNamingConventionsAspect {
  constructor(conventions) {
    this.namePrefix = conventions.namePrefix;
    this.nameSuffix = conventions.nameSuffix;
  }

  visit(node) {
    if (node instanceof iam_role.IamRole) {
      node.name = `${this.namePrefix}${node.name}${this.nameSuffix}`;
    }
  }
}

class NamingConventionPlugin {
  constructor(conventions) {
    this.namePrefix = conventions.namePrefix;
    this.nameSuffix = conventions.nameSuffix;

    exports.preSynth = function(app) {
      cdktf.Aspects.of(app).add(new IamNamingConventionsAspect(conventions));
    };
  }
}
```

Importing and using the file:
```js
var namingConventionPlugin = require("./naming-convention-plugin");

new namingConventionPlugin.NamingConventionPlugin({
  namePrefix: "my-prefix-",
  nameSuffix: "-my-suffix"
});
```
