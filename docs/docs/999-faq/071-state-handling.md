---
title: How does Wing handle state?
sidebar_label: How does Wing handle state?
id: how-wing-handles-state
keywords: [faq, state, winglang, Wing programming language, Wing language]
---

The short answer is that the plan is to model state explicitly in wing resources and allow users to determine how these types of resources are handled during provisioning. 

The long answer is that each Wing resource has a path that represents its unique address within the resource tree. This path is used to produce a deterministic Terraform identifier for each resource (which is what Terraform uses in its state file to map to the physical resource).

When refactoring code and resources are moved around, their Terraform identifier could change. In certain cases, especially for stateful resources with important data, this could be hazardous.

Wing resources can be explicitly marked as "stateful" or "stateless". If a resource is marked as "stateful", Wing will protect it from being accidentally deleted during deployment.

We will provide some mechanism for you to relocate the terraform identifier of a resource in order to link the old identifier to the newly placed resource.

You can track progress of this in this [issue](https://github.com/winglang/wing/issues/901).
