---
title: What are the main differences between Wing and Pulumi?
id: differences-from-pulumi
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, Pulumi]
---

1. Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. Pulumi is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.
2. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. Pulumi is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
3. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to manually define in Pulumi (IAM policies, network topologies, etc).
4. You will be able to compile Wing to Javascript and Pulumi in the future (roadmap is [here](https://docs.winglang.io/status#roadmap)). You will be able to use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the Pulumi output directly.
5. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With Pulumi, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).