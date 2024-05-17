---
title: Terraform/AWS
id: tf-aws
sidebar_label: tf-aws
description: Terraform/AWS platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, cli, terraform, aws, tf-aws, tfaws, amazon web services, platform]
---

The `tf-aws` [platform](../02-concepts/03-platforms.md) compiles your program for Terraform and run on AWS.

## Usage

```sh
$ wing compile --platform tf-aws [entrypoint]
```

## Parameters

The `tf-aws` platform supports the following parameters (in `wing.toml`):

* `vpc` - Determine whether to create a new VPC or use an existing one. Allowed values: `"new"` or `"existing"`.
* `private_subnet_ids` (array of strings) - If using an existing VPC, provide the private subnet IDs.
* `public_subnet_ids` (array of strings) - If using an existing VPC, provide the public subnet IDs.
* `vpc_api_gateway` (boolean) - Whether Api gateways should be deployed in a VPC.
* `vpc_lambda` (boolean) - Whether Lambda functions should be deployed in a VPC.

Example `wing.toml`:

```toml
[ tf-aws ]
vpc = "new"
vpc_lambda = true
vpc_api_gateway = true
vpc_id = "vpc-123xyz"
private_subnet_ids = ["subnet-123xyz"]
public_subnet_ids = ["subnet-123xyz"]
```

### Implicit VPC

The `tf-aws` platform can create a new VPC for you if needed. The VPC is pretty standard and includes:

- A VPC with CIDR block `10.0.0.0/16`
- An Internet Gateway
- A NAT Gateway
- A single public subnet with CIDR block `10.0.0.0/24`
- Two private subnets with CIDR blocks `10.0.4.0/22` and `10.0.8.0/22` (both have Egress via NAT Gateway)

## Output

The output includes both a Terraform configuration file (under `target/cdktf.out/stacks/root`) and
JavaScript bundles that include inflight code that executes on compute platform such as AWS Lambda.

## Deployment

You can deploy your stack to AWS using Terraform ([instructions](/docs/start-here/aws)).
