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

The `cloud.Domain` resource represents a domain configuration in the cloud.

## Usage

### Defining a domain

```js
bring cloud;

let domain = new cloud.Domain(
  domainName: "www.example.com",
);

new cloud.Website(path: "./site", domain: domain);
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator stores the domain value in memory.

Note that domain data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Domain` requires certain platform-specific values such as the `hostedZoneId` and either `iamCertificate` or `acmCertificateArn` to be provided.

To provide these values, there are two options.

You can either pass the values in the command line or you can provide a TOML file with the configurations:

```
wing compile -t tf-aws main.w --value root/Default/Default/Domain/acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee --value root/Default/Default/Domain/hostedZoneId=Z0111111111111111111F
```

Alternatively, create a `wing.toml` file in your project directory:

```toml
[root.Default.Default.Domain]
hostedZoneId = "Z0XXXXXXXXXXXXXXXXXXF"
acmCertificateArn = "arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
```

### Azure (`tf-azure`)

🚧 Not supported yet

### GCP (`tf-gcp`)

🚧 Not supported yet