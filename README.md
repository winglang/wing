![](./logo/banner.png)

<p align="center">
  &nbsp;
  <a href="https://docs.winglang.io/getting-started">Quick Start</a>
  ▪︎
  <a href="http://t.winglang.io/slack">Slack</a>
  ▪︎
  <a href="https://docs.winglang.io">Docs</a>
  ▪︎
  <a href="https://docs.winglang.io/status#roadmap">Roadmap</a>
  ▪︎
  <a href="https://docs.winglang.io/getting-started">Getting Started</a>
  ▪︎
  <a href="https://github.com/winglang/wing/issues">Issues</a>
  ▪︎
  <a href="https://github.com/winglang/wing/discussions">Discussions</a>
  ▪︎
  <a href="https://stackoverflow.com/questions/tagged/winglang">Stack Overflow</a>
  ▪︎
  <a href="https://docs.winglang.io/contributors/">Contribute</a>
</p>

[![Short demo](./logo/demo.gif)](https://youtu.be/x0xfIoY5y6E)

# Welcome! :wave:

**Wing** is a new open-source, statically-typed, [cloud-oriented programming language]. 
It has [distributed computing primitives], a [resource system] that represents cloud services with their 2 different phases (configuration & runtime), and [other optimizations for cloud programming].

[![Same object - different interfaces](./logo/diff-interfaces.gif)](https://youtu.be/y7OGRC2f5gk)

While most programming languages think about computers as machines, in Wing, **_the cloud is the computer_**.
So like traditional languages abstract the computer, wing abstarcts the cloud to allow developers to work at a higher level of abstraction and choose the target cloud at compile time.
The compiler generates least privilege IAM policies based on intent, and other cloud mechanics.
**The compilation artifacts are JavaScript and Terraform** (with more provisioning engines on the way).
Wing's [compiler plugins] can be used to customize to the compilation output, such as infrastructure definitions.

[![Compile to different clouds](./logo/compile-diff-clouds.gif)](https://youtu.be/gr4ewOJGkfo)

By providing a built-in local simulator, and an observability & debugging [console], Wing aims to reduce cognitive load and context switching, enabling developers to stay in their creative flow. 

[![Compile to different clouds](./logo/console.gif)](https://youtu.be/Gqn1hYPEwqg)

Wing's creator is Elad Ben-Israel, who was the creator of the AWS CDK.

[console]: https://docs.winglang.io/getting-started/console
[cloud-oriented programming language]: https://docs.winglang.io/#what-is-a-cloud-oriented-language
[distributed computing primitives]: https://docs.winglang.io/concepts/inflights
[resource system]:https://docs.winglang.io/concepts/resources
[other optimizations for cloud programming]: #what-are-the-main-features-of-wing-that-make-it-suitable-for-cloud-development
[compiler plugins]: https://docs.winglang.io/reference/compiler-plugins

Sample wing code:

```js
bring cloud;

// This code runs at compile time to provision the bucket
let bucket = new cloud.Bucket();

// Here we are able to interact with infra config of the bucket
bucket.stateful = true;

// This code runs at compile time to provision the function
new cloud.Function(inflight () => {
  // This code runs later, on other machines, and interacts with the provisioned bucket
  // So the interface for the same bucket is now different
  bucket.put("hello.txt", "Hello, World!");
});
```

## Why a language? (and not an SDK or platform)
We believe that the cloud is a new kind of computer that requires a [new programming paradigm](https://docs.winglang.io/#what-is-a-cloud-oriented-language) in order to fully utilize it.
This new paradigm needs a language that natively supports it in order to give the best development experience.

For example, 
unlike a regular computer, the cloud is a big distributed machine, and it needs strong distributed programming primitives to fully leverage the power of a distributed system. Wing's inflight functions serve that purpose in wing 

## What are the main features of wing that make it suitable for cloud development

## What does the development flow look like with wing
1. Write code that targets an abstract cloud.
2. Visualize, test, and interact with it using the Wing console and its instant hot reloading.
3. Compile to JS and Terraform, targeting the desired cloud and provisioning engine.
4. Deploy and manage with your existing tools.
[![Short demo](./logo/demo.gif)](https://youtu.be/x0xfIoY5y6E)


## Is there a company behind wing / what is the business model
Monada inc. is leading the development of winglang.
The language and local sumulator will always be open-source and free and are planed to be donated to a foundation.
Monada's business model is planned around connecting the Wing console to production applications and charging for the enhanced management and observability experience it will provide.

## This is Alpha

Wing is in its very early stages of development and not recommended for
production use. Many features are still missing, and APIs will dramatically
evolve in the coming months. We are excited for anyone to take part in
influencing the direction of every part of this project.

Our <a href="https://docs.winglang.io/status">Project Status</a> page includes
more information about stability and roadmap 👷‍♀️

## Why you should consider wing
[Details here.](https://docs.winglang.io/#why-you-should-consider-wing)

## Installation

- [Prerequisites](https://docs.winglang.io/getting-started/installation#prerequisites)
- [Wing CLI](https://docs.winglang.io/getting-started/installation#wing-cli)
- [Wing IDE Extension](https://docs.winglang.io/getting-started/installation#wing-ide-extension)
- [Wing Console](https://docs.winglang.io/getting-started/installation#wing-console)

## Getting Started

The [Getting Started](https://docs.winglang.io/getting-started) guide is a
once-in-a-lifetime adventure into the Wing rabbit hole.

To learn more about Wing concepts such as
[resources](https://docs.winglang.io/concepts/resources) and
[inflights](https://docs.winglang.io/concepts/inflights), jump over to the
[Concepts](https://docs.winglang.io/category/concepts) section in our docs.

For a comprehensive reference of the language, check out the [Wing Language
Specification](https://docs.winglang.io/reference/spec) and the [API
Reference](https://docs.winglang.io/reference/sdk).

## Community

We all hang out on [Wing Slack]. Come as you are, say hi, ask questions, help
friends, geek out! Alternatively, post any question you have on [GitHub
Discussions](https://github.com/winglang/wing/discussions).

## Contributing

We welcome and celebrate contributions from the community! Please see our [contribution
guide](https://github.com/winglang/wing/blob/main/CONTRIBUTING.md) for more information about
setting up a development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

We are also actively tracking planned features in our roadmap:

- [Wing Language Roadmap](https://github.com/orgs/winglang/projects/1/views/1)
- [Wing SDK Roadmap](https://github.com/orgs/winglang/projects/3/views/1)

## Contributors

<a href="https://github.com/winglang/wing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=winglang/wing" />
</a>

## License

This project is licensed under the [MIT License](./LICENSE.md). Contributions are made under our [contribution license](https://docs.winglang.io/terms-and-policies/contribution-license.html).

[wing slack]: https://t.winglang.io/slack
