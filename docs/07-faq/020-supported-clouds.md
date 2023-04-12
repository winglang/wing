---
title: Which clouds are supported by Wing?
id: supported-clouds
keywords: [faq, supported clouds, winglang, Wing programming language, Wing language, AWS, GCP, Azure]
---

Wing was built from the ground up to make it an ideal choice for building applications on any cloud.
Since wing is in early stages of developemnt it only supports the three biggest public clouds, with different levels of maturity:
* AWS - Fully supported. If you are able to compile your Wing code for the simulator, you shoud be able to compile it for AWS as well (with the Terraform provisioning engine).
* GCP - Partial support. Not any Wing code that compiles for the simulator will compile for GCP. 
* Azure - Partial support. Not any Wing code that compiles for the simulator will compile for GCP. 

We are working hard on filling the support gap between the different clouds, and plan to add support for more clouds in the future.

# How to check specific service support for each cloud
Check out our [different roadmaps](https://docs.winglang.io/status#roadmap) to see which services are supported now on which clouds, and when they are expected to be supported if they aren't supported now.

# How to deploy on the different clouds
Check out our [CLI reference](https://docs.winglang.io/reference/cli) for instructions on how to deploy your wing code on the different clouds.
In the future, compiling for the different clouds could be supported through the GUI of the Wing Console as well (you can track progress in this [issue](https://github.com/winglang/wing/issues/2051)).

