---
title: How does Wing handle secrets securely?
sidebar_label: How does Wing handle secrets?
id: handling-secrets
keywords: [faq, winglang, Wing programming language, Wing language, secrets, secret management]
---

Wing provides a `Secret` resource that allows you to securely store sensitive information, such as API keys and passwords. 

In Wing's simulator, a secrets file is generated in your home directory at `~/.wing/secrets.json`.

When the Secret resource is compiled to a cloud provider, it is provisioned using the provider's native secret management service. For example, on AWS, this would be AWS Secrets Manager. To use it, you must manually create a secret with a matching name on the provider before deploying your application.

In the future, Wing may include support for secret rotation.

You can find more info in the [SDK spec](https://docs.winglang.io/contributors/rfcs/2023-01-20-wingsdk-spec#secret). 