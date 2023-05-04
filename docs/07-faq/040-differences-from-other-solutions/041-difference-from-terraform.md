---
title: What are the main differences between Wing and Terraform?
sidebar_label: Terraform
id: differences-from-terraform
keywords: [faq, winglang, Wing programming language, Wing language, TF, Terraform, IAC]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. Terraform is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.
These are the main differences between the two:

1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. Terraform is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generate much of the infrastructure definitions that you have to manually define in Terraform (IAM policies, network topologies, etc).
3. Wing compiles to Javascript and Terraform. You can use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the Terraform output directly.
4. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With Terraform, you must deploy to the cloud in order to interact with your application, which can take several minutes.

## Code samples

To get a deeper understanding of the differences, let's see the same app built in both Wing and Pulumi.
This simple cloud app uses a Function to upload a text file to a Bucket,

import CodeComparison from '../../src/components/CodeComparison';

<CodeComparison 
  exampleName="function-upload-to-bucket"
  desiredPlatformLabels="['Terraform']"
/>
<br/>

**The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)**

| Feature                                         | Wing                                                      | Terraform                                    |
|-------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| Language                                        | Wing                                                      | HCL + your choice                            |
| Line of code                                    | 7                                                         | 122                                          |
| Cloud Mechanics (IAM, Networking)                      | Generated automatically from intent                       | Manual                                       |
| Extensibility                                   | Custom resources                                          | Custom modules                               |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | No need since working at low level           |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform or AWS-CDK (CloudFormation) | Terraform                         |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                |

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).