---
title: What are the main differences between Wing and AWS-CDK?
sidebar_label: AWS-CDK
id: differences-from-awscdk
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, CDK, AWS-CDK]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. 
The CDK is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.
These are the main differences between the two:

1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. The CDK is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generate much of the infrastructure definitions that you have to manually define in the CDK (IAM policies, network topologies, etc).
3. Wing compiles to Javascript and ASW-CDK. You can use our [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to customize the output directly.
4. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With the CDK, you must deploy to the cloud in order to interact with your application, which can take several minutes.

## Code samples

To get a deeper understanding of the differences, let's see the same app built in both Wing and Pulumi.
This simple cloud app uses a Function to upload a text file to a Bucket,

import CodeComparison from '../../src/components/CodeComparison';

<CodeComparison 
  exampleName="function-upload-to-bucket"
  desiredPlatformLabels="['AWSCDK']"
/>
<br/>

**The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)**

| Feature                                         | Wing                                                      | AWS CDK                                      |
|-------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| Language                                        | Wing                                                      | Your choice                                  |
| Line of code                                    | 7                                                         | 72                                           |
| Cloud Mechanics (IAM, N/W)                      | Generated automatically from intent                       | Manual                                       |
| Extensibility                                   | Custom resources                                          | Custom Constructs / Resource Providers       |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | Escape hatches to modify underlying CloudFormation |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform and AWS-CDK (CloudFormation) | CloudFormation (CDKTF is used for Terraform, but you cannot compile the same code to different engines) |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                |

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).