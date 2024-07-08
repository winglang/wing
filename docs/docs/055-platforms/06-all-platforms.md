---
title: Wing Platforms
id: all-platforms
sidebar_label: List of platforms
description: List of platforms that for Wing
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, cli, terraform, tf-gcp, gcp, google cloud platform, platform]
---

List of platforms that are supported by Wing.

## Native platforms

Platforms that are native to Wing and part of the [Wing CLI](/docs/tools/cli).

| Platform    | Cloud provider | Description 
| -------- | ------- | ------- 
| [sim](/docs/platforms/sim)  | Local simulation    | A simple localhost implementation of all the resources of the [Wing Cloud Library](/docs/category/cloud) | 
| [tf-aws](/docs/platforms/tf-aws) (Terraform)  | AWS    | Compiles your program for [Terraform](https://www.terraform.io/) and run on [AWS](https://aws.amazon.com/) | 
| [tf-azure](/docs/platforms/tf-azure) (Terraform)  | Microsoft Azure    | Compiles your program for [Terraform](https://www.terraform.io/) and run on [Azure](https://azure.microsoft.com/) | 
| [tf-gcp](/docs/platforms/tf-azure) (Terraform)  | Google Cloud (GCP)    | Compiles your program for [Terraform](https://www.terraform.io/) and run on [Google Cloud](https://cloud.google.com/) | 

## External platforms

Platforms that are external to Wing and require installation.

| Platform    | Cloud provider | Description 
| -------- | ------- | ------- 
| [awscdk](/docs/platforms/awscdk) (CDK)  | AWS    | Compiles your program for the [AWS CDK](https://aws.amazon.com/cdk/) and deployed through the [CDK CLI](https://docs.aws.amazon.com/cdk/v2/guide/cli.html) (and AWS CloudFormation).|