---
title: What are the main differences between Wing and AWS-CDK?
id: differences-from-awscdk
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, CDK, AWS-CDK]
---

1. Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. The CDK is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.
2. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. The CDK is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
3. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to manually define in the CDK (IAM policies, network topologies, etc).
4. Wing compiles to Javascript and ASW-CDK. You can use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the output directly.
5. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With the CDK, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).