---
title: Which cloud services are supported by Wing?
sidebar_label: Supported services
id: supported-services
keywords: [faq, supported service, winglang, Wing programming language, Wing language, AWS, GCP, Azure, Function, Bucket, Queue, Topic, API]
---

Winglang was built from the ground up to make it an ideal choice for building applications on any cloud. Every app has access to the Wing SDK, a set of batteries-included resources that represent cloud services that are common to most major cloud providers for common use cases.

Since Wing is in early stages of development, the Wing SDK supports each service with different levels of maturity.

## Compatibility Matrix
We are working hard on filling the support gap between the different services -- check out our [compatibility matrix](https://docs.winglang.io/reference/compatibility-matrix) which parts of every service are supported on the different clouds and provisioning engines.

## Future plans
You can also check out our [roadmap](https://docs.winglang.io/status#roadmap) for future plans.

If there are other services you would like to see supported, please let us know through our GitHub or Slack!

## You can use any Terraform resource
Beyond the common set of cloud resources in the SDK, you can use any Terraform resource by importing a [CDKTF](https://github.com/hashicorp/terraform-cdk) library corresponding to any given Terraform provider.

