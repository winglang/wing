---
title: Does Wing support Kubernetes?
sidebar_label: Kubernetes
id: kubernetes-support
keywords: [faq, supported provisioning engines, Winglang, Wing programming language, Wing language, Kubernetes, K8S]
---

## Deploying Wing workloads to Kubernetes

Yes, Wing supports Kubernetes through the `Workload` resource which is a high-level representation
of containerized workloads. When deployed to AWS, workloads are scheduled into a Kubernetes/EKS
cluster via Helm.

## Synthesizing Kubernetes manifests through Wing using CDK8s

Since Wing has native support for constructs, you can technically use [CDK for
Kubernetes](https://cdk8s.io) (CDK8s) to synthesize Kubernetes manifests and apply them to your
cluster.

See [#678](https://github.com/winglang/wing/issues/678) for details.

## Creating Kubernetes cluster infrastructure with Wing

The [Kubernetes Terraform Provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs) can be used in Wing to provision complete clusters.
