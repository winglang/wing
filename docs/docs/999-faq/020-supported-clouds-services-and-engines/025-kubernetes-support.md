---
title: Does Wing support Kubernetes?
sidebar_label: Kubernetes
id: kubernetes-support
keywords: [faq, supported provisioning engines, Winglang, Wing programming language, Wing language, Kubernetes, K8S]
---

## Short answer
We don't support Kubernetes yet, but we will in the future. 
Our roadmap is [here](https://docs.winglang.io/status#roadmap).

## Long answer
There are a different kinds of Kubernetes support with varying levels of maturity in Wing:
1. Creation and configuration of K8S clusters through the [K8S Terraform Provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs). Since Wing supports any Terraform provider, it should work, but we have not officially tested it yet.
2. Using Kubernetes to run long-running services. This is not yet supported. You can add your vote for it on [this issue](https://github.com/winglang/wing/issues/2319) to help increase its priority.
3. Using Kubernetes as a provisioning engine, which means it will be a built-in compilation target for cloud services. You can add your vote for it on [this issue](https://github.com/winglang/wing/issues/2066) to help increase its priority. 

Wing currently has full support for Terraform. AWS CDK (based on CloudFormation) is also supported by the community.

