---
title: Terraform/Azure
id: tf-azure
sidebar_label: Terraform (tf-azure)
description: Terraform/Azure platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, cli, terraform, tf-azure, azure, microsoft azure, platform]
---

The `tf-azure` [platform](/docs/platforms/microsoft-azure/tf-azure) compiles your program for Terraform and run on Azure.

## Usage

```sh
$ export AZURE_LOCATION="East US"
$ wing compile [entrypoint] --platform tf-azure
```

## Parameters

The environment variable `AZURE_LOCATION` is required and indicates the [deployment
location](https://github.com/claranet/terraform-azurerm-regions/blob/master/REGIONS.md) of your
stack.

## Output

The output includes both a Terraform configuration file (under `target/cdktf.out/stacks/root`) and
JavaScript bundles that include inflight code that executes on compute platform such as Azure
Functions.
