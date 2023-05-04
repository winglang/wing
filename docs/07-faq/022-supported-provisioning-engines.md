---
title: Which provisioning engines are supported by Wing?
id: supported-provisioning-engines
keywords: [faq, supported provisioning engines, winglang, Wing programming language, Wing language, Terraform, AWS CDK, Pulumi]
---

Wing was built from the ground up to make it an ideal choice for building applications on any cloud, using a variety of provisioning engines.
Since Wing is in early stages of development, it officially only supports the Terraform provisioning engine. AWS CDK (based on CloudFormation) is also supported by the community.

Have other provisioning engines you would like to use with Wing? Let us know by leaving a comment [here](https://github.com/winglang/wing/issues/2066)!

## How to check specific service support for each provisioning engine
Check out our [compatibility matrix](https://docs.winglang.io/reference/compatibility-matrix) to see which services are supported now on which provisioning engines, and when they are expected to be supported if they aren't supported now.

## How to compile to different provisioning engines
Check out our [CLI reference](https://docs.winglang.io/reference/cli) for instructions on how to compile your wing code for the different provisioning engines.
In the future, compiling for the different provisioning engines could be supported through the GUI of the Wing Console as well (you can track progress in this [issue](https://github.com/winglang/wing/issues/2051)).

