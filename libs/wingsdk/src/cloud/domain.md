---
title: Domain
id: domain
description: A built-in resource for representing a domain in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Domain,
  ]
sidebar_position: 1
---

The `cloud.Domain` resource represents the domain that will be configured when creating a website in the cloud.

## Usage

### Defining a domain

```js
bring cloud;

let domain = new cloud.Domain(
  domain: "www.example.com",
);

new cloud.Website(path: "./site", domain: domain);
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator stores the domain value in memory.

Note that domain data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Domain` requires certain platform-specific values such as the `hostedZoneId` and either `iamCertificate` or `acmCertificateArn` to be provided.

To provide these values, there are two options. You can either pass the values in the command line as shown in the example below:

```bash
wing compile \
-t tf-aws \
-v root/Default/Default/cloud.Domain.hostedZoneId=Z0XXXXXXXXXXXXXXXXXXF \
-v root/Default/Default/cloud.Domain.acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee  domain.w
```

Or you can provide a YAML file with the configurations as follows:

```bash
wing compile -t tf-aws --values config.yaml domain.w
```

This YAML file should contain the data as shown in the example below:

```yaml
root/Default/Default/cloud.Domain:
  hostedZoneId: Z0XXXXXXXXXXXXXXXXXXF
  acmCertificateArn: arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```

### Azure (`tf-azure`)

🚧 Not supported yet

### GCP (`tf-gcp`)

🚧 Not supported yet