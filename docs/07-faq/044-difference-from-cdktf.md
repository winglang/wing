---
title: What are the main differences between Wing and CDKTF?
id: differences-from-cdktf
keywords: [faq, who is behind wing, winglang, Wing programming language, Wing language, CDKTF]
---

Wing is a general purpose programming language, designed to develop entire cloud applications - including their infrastructure and application code. CDKTF is an infrastructure as code tool that focuses on the infrastructure part of the application. You then need a way to stitch together that infrastructrute and the application code.

The main differences between the two are:
1. Wing code is cloud-portable, so you can write the code once and then compile to any cloud. CDKTF is not cloud-portable. Although it supports all clouds, you need to write specific code for each one.
2. Since the Wing compiler sees both the infra and application code, it can automatically generates much of the infrastructure definitions that you have to define manually in CDKTF (IAM policies, network topologies, etc).
3. Wing provides local simulation and visualization [tools](https://docs.winglang.io/getting-started/console) that let you develop locally with instant hot reloading. With the CDKTF, you must deploy to the cloud in order to interact with your aplication, which can take several minutes.

## Code samples

To get a deeper understanging of the differences, let's see the same app built in both Wing and Pulumi.
This simple app uses a Function to upload a text file to a Bucket,

import CodeComparison from '../src/components/CodeComparison';

<CodeComparison 
  exampleName="function-upload-to-bucket"
  desiredPlatformLabels="['CDKTF']"
/>
<br/>

**The below table contains the main differences that you can see in the code examples, and also some that cannot fit in such a small app, but we still would like you to know about :)**

| Feature                                         | Wing                                                      | CDKTF                                      |
|-------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| Language                                        | Wing                                                      | Your choice                                  |
| Line of code                                    | 7                                                         | 105                                           |
| Cloud Mechanics (IAM, N/W)                      | Generated automatically from intent                       | Manual                                       |
| Extensibility                                   | Custom resources                                          | Custom Constructs / Resource Providers       |
| Customizing lower levels                        | Compiler plugins to customize generated Terraform         | Escape hatches to modify underlying CloudFormation |
| Local simulation                                | Built-in functional local simulator with instant hot reloading | No                                |
| Cross-cloud support                             | Same code compiles to different clouds                    | No (need to write different code for different clouds) |
| Provisioning engine                             | Same code compiles to Terraform and AWS-CDK (CloudFormation) | Terraform (AWS-CDK is used for Cloudformation, but you cannot compile the same code to different engines) |
| Testing                                         | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing                |

You can get a sense of the development experience with Wing in our [playground](https://play.winglang.io/).