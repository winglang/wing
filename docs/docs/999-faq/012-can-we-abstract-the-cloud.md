---
title: Isn't trying to abstract the cloud a bad idea?
sidebar_label: Abstracting the cloud - good idea?
id: why-cloud-abstraction
keywords: [faq, abstraction, winglang, Wing programming language, Wing language, Terraform]
---

This question often arises in various forms, such as:
- Why do I need another abstraction layer?
- How do you abstract services that differ significantly across cloud providers?
- Wouldn't I lose control of crucial finer details?
- How do you handle API incompatibility? Does your API only include the lowest common denominator or does it fail when targeting a cloud with a missing feature?
- Won't Wing always lag behind hosted API feature capabilities, being a step behind Terraform and the cloud providers themselves?
- What if a Terraform provider you depend on fails?
- Why would I want the compiler to generate IAM policies?

We understand your concerns and acknowledge the challenges in achieving a higher level of cloud abstraction. However, as with the evolution of software development, abstraction layers are continuously added to increase development velocity and focus on solving business needs. We believe that, through incremental progress, it's possible to abstract the cloud just as we've done with single machines.

Recall the days when developers had to write code for specific file systems or operating systems to save a file to disk. Today, programming languages and frameworks have successfully abstracted these components, a result of a long, gradual process. We envision a future where targeting specific cloud storage solutions or manually setting up IAM policies becomes unnecessary, as policies can be deduced from application code.

While this process takes time, we've implemented [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) in Wing to allow customization of Terraform output, providing more control over finer details in the meantime.

## Why use Wing abstraction and compiler plugins?

Compiler plugins let you modify the infrastructure when needed without manually configuring and maintaining IAM roles and encryption policies for numerous cloud services. Instead, you can write a plugin that enforces policies without knowing every specific resource in the app, such as ensuring any internet-exposed bucket is encrypted.

## What about resources that can't be abstracted?

You can use Terraform resources directly with Wing, though you may lose some language advantages. As the cloud matures, most developers can stay a step or two behind and still have the functionality they need for most cloud services.

## Dealing with multi-cloud and localhost development

When using a vendor-specific solution like BigQuery, you'll have to weigh your options depending on your requirements and the ecosystem Wing offers. You can:

1. Proxy to a remote cloud account.
2. Use a mocking service.
3. Mock only the BigQuery features needed for testing and interaction.

## API incompatibility

Wing offers the lowest common denominator in its API for functional differences between cloud providers. However, when it comes to non-functional differences, you can use compiler plugins to add the missing features in most cases. 

As a result, having a missing feature will likely be less common than expected. You can also use any Terraform resource with Wing or extend Wing with your own service and local simulator implementation. Over time, we hope to develop an ecosystem of additional services and local simulator implementations.

## How do we go about creating abstractions?

We follow these rules of thumb:

1. Focus on the functional API of a resource.
2. Abstract common, non-functional API aspects.
3. Create high-level abstractions to hide implementation details.
4. Avoid abstracting the un-abstractable.
5. Understand if your aim is for multi-cloud or localhost development.

Achieving effective cloud abstraction requires community input, iterating on ideas, and building battle-tested solutions. By overcoming these challenges, we can change the way we write and test cloud applications.
