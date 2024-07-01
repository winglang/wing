---
title: What makes Wing a good fit for cloud development? 🌟
sidebar_label: Why Wing is ideal for Cloud dev.
id: good-fit
keywords: [faq, main features, winglang, Wing programming language, Wing language]
---

Wing was built from the ground up to make it an ideal choice for building applications on any cloud.
It includes an assembly of different features that serve that purpose:

* [Cloud services](https://www.winglang.io/docs/faq/supported-clouds-services-and-engines/supported-services) as first-class citizens, with [phase modifiers](https://www.winglang.io/contributing/rfcs/language-spec#13-phase-modifiers) for config or runtime ([`preflight` and `inflight`](https://www.winglang.io/contributing/rfcs/2023-01-20-wingsdk-spec)).
* Higher level of cloud abstraction with a [cloud library](https://www.winglang.io/contributing/rfcs/2023-01-20-wingsdk-spec) containing APIs that lets you write cloud portable code.
* [Custom platforms](https://www.winglang.io/docs/concepts/platforms) that keep you in control by allowing you to customize the infrastructure definitions and run policy checks.
* Use any resource in the Terraform ecosystem as first-class citizen in your app.
* [JavaScript interoperability](https://www.winglang.io/contributing/rfcs/language-spec#5-interoperability).
* [Distributed computing primitives](https://www.winglang.io/docs/concepts/inflights).
* Automatic generation of IAM policies and other cloud mechanics based on intent.
* Local functional simulator with a visualization and interaction [console](https://www.winglang.io/docs/start-here/installation#wing-console) - used for testing and debugging with instant hot-reloading.
* [Native JSON](https://www.winglang.io/contributing/rfcs/language-spec#114-json-type) and schema validation support.
* [Default immutability](https://www.winglang.io/blog/2023/02/02/good-cognitive-friction#immutable-by-default).
* [Implicit async](https://www.winglang.io/contributing/rfcs/language-spec#113-asynchronous-model), explicit defer.

For a more in-depth look at Wing's features and benefits, check out our [documentation](https://www.winglang.io/docs/).

