---
title: Terraform/GCP
id: tf-gcp
sidebar_label: Terraform (tf-gcp)
description: Terraform/GCP platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, cli, terraform, tf-gcp, gcp, google cloud platform, platform]
---

The `tf-gcp` [platform](/docs/platforms/google-cloud/tf-gcp) compiles your program for Terraform and run on Google Cloud Platform.

## Usage

```sh
$ export GOOGLE_PROJECT_ID="my-project"
$ export GOOGLE_STORAGE_LOCATION="US"
$ wing compile [entrypoint] --platform tf-gcp
```

## Parameters 

The environment variable `GOOGLE_STORAGE_LOCATION` is required and indicates the [deployment
location](https://cloud.google.com/storage/docs/locations) of all storage
resources (such as buckets and queues). 

The environment variable `GOOGLE_PROJECT_ID` is required and indicates
the project ID of your stack.

The output includes both a Terraform configuration file (under `target/cdktf.out/stacks/root`) and
JavaScript bundles that include inflight code that executes on compute platform such as Google Cloud Functions.
