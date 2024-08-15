---
title: Roadmap
id: index
slug: /roadmap
keywords: [roadmap]
---

# Roadmap

Below, we've listed our goals for what we want to include in Wing 1.0.

We want to stabilize as many of the items below as possible by the end of 2025, but we're eagerly interested in feedback and collaboration.

## Toolchain

We want to provide a robust CLI for people to compile, test, and perform other essential functions with their Wing code.

We want the CLI to be easy to install, update, and set up on a variety of systems.

Dependency management should be simple and insulated from problems specific to individual Node package managers.

The Wing toolchain makes it easy to create and publish Wing libraries with automatically generated API docs, and it doesn't require existing knowledge of npm.

Wing Platforms allow you to specify a layer of infrastructure customizations that apply to all application code written in Wing.
It should be simple and straightforward to create new Wing platforms. It should be straightforward to extend existing platforms.
It's possible to specify both multi-cloud abstractions in Wing as well as the actual platform (for example, the implementation of cloud.Bucket) in Wing.

Wing lets you easily write tests that run both locally and on the cloud.
The test runner can be customized per platform.
Tests in Wing can be run in a variety of means -- via the CLI, via the Wing Console, and in CI/CD.
The design of the test system should make it easy for developers to write reproducible (or deterministic) tests, and also provide facilities for debugging.

## Compiler

Wing's syntax and type system is robust, well documented, and easy for developers to learn.
Developers coming from other mainstream languages with C-like syntax (Java, C++, TypeScript) should feel right at home.
Most Wing code is statically typed in order to support automatic permissions.

Wing should be able to interoperate with a vast majority of TypeScript libraries.
It should be straightforward to import libraries that are available on npm and automatically have corresponding Wing types generated for them based on the TypeScript type information.
The language also has mechanisms for more advanced users to use custom JavaScript code in Wing.

We want Wing to have friendly, easy to understand error messages that point users towards how to fix their problems.

Wing has a built-in language server that gives users a first-class editing and refactoring experience in their IDEs.

## Standard Library and Ecosystem

Wing provides a batteries-included experience for performing common programming tasks like working with data structures, file systems, calculations, random number generation, HTTP requests, and other common needs.

Wing also has a ecosystem of Wing libraries ("winglibs") that make it easy to write cloud applications by providing easy-to-use abstractions over popular cloud resources.
This includes a `cloud` module that is an opinionated set of resources for writing applications on the most popular public clouds.
The cloud primitives are designed to be cloud-agnostic (we aren't biased towards a specific cloud provider).
These cloud primitives all can be run to a high degree of fidelity and performance with the local simulator.
Not all winglibs may be fully stable when the language reaches 1.0.

## Wing Console / Simulator

We want to provide a first class local development experience for Wing that makes it easy and fast to test your applications locally.
It gives you observability into your running application and interact live with different components.
It gives you a clearer picture of your infrastructure graph and how preflight and inflight code are related.
It complements the experience of writing code in a dedicated editor.

## Documentation

We want to easy for people to get exposed to Wing code and have ways to try applications without having to install Wing locally.
The Wing docs should provide content appealing to different kinds of developers trying to acquire different kinds of information at different stages -- from tutorials to references to how-to-guides.

Wing docs need to have content for both the personas of developers writing their own applications and platform engineers aiming to provide simpler abstractions and tools for their teams.
We want to provide hundreds of examples and code snippets to make it easy to learn the syntax of the language and easy to see how to solve common use cases.
