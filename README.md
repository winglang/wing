


<div align="center">
  <img src="./apps/wing/logo/banner.gif" alt="Wing Banner" >
</div>

<h1 align="center">Welcome to the Wing Language! :wave:</h1>
<p align="center">
<a href="https://www.winglang.io/learn/">Take a Tour</a>
▪︎
<a href="https://www.winglang.io/docs/">Getting Started</a>
▪︎
<a href="http://t.winglang.io/slack">Join Slack</a>
▪︎
<a href="https://www.winglang.io/docs/category/faq">FAQ</a>
▪︎
<a href="https://www.winglang.io/contributing/status#roadmap">Roadmap</a>
▪︎
<a href="https://github.com/winglang/wing/issues">Issues</a>
▪︎
<a href="https://github.com/winglang/wing/discussions">Discussions</a>
▪︎
<a href="https://www.winglang.io/contributing/">Contribute</a>

</p>

**Winglang** is a new open-source programming language designed for the cloud (aka "_cloud-oriented_").
Wing enables developers to build distributed systems that leverage cloud services as first-class citizens by combining infrastructure **_and_** application code in a safe and unified programming model (aka "_cloud-oriented_").
Wing programs can be executed locally (_yes, no internet required_) using a fully-functional simulator, or deployed to any cloud provider (_yes, Wing programs are portable across providers_).

The mission of Winglang is to bring back your creative flow and close the gap between imagination and creation.

Developing for the cloud today requires mastering various layers of the cloud stack, IAM roles, networking, and numerous tools, along with finding creative ways to test and debug code. In addition, long deployment times hinder iteration cycles and take developers out of their creative flow.

Winglang addresses these pains by letting you work at a higher level of abstraction and allowing you to focus on business logic instead of cloud mechanics, only surfacing low-level details when it's needed.
We also provide you with a set of tools that let you test your code locally, significantly faster than before.

<div align="center">
  <img src="./apps/wing/logo/demo.gif" alt="Wing Demo" height="400px">
</div>

Wing is built by [Elad Ben-Israel](https://github.com/eladb), the guy behind the [AWS CDK](https://github.com/aws/aws-cdk), the gang at the [Wing Cloud team](https://www.wing.cloud/) and an amazing [community](https://t.winglang.io/slack) of contributors (also known as Wingnuts).

Click [here](https://www.youtube.com/watch?v=5_RhWwgGue0) to watch a short video introduction to the Wing language.

## Why do we think the cloud needs a programming language? 🤔

Cloud applications are fundamentally different from applications that run on a single machine -
they are distributed systems that rely on cloud infrastructure to achieve their goals.

In order to be able to express both infrastructure and application logic in a safe and unified programming model,
Winglang has two execution phases: _preflight_ for infrastructure definitions and _inflight_ for runtime code.

Preflight code is executed _during compilation_ and produces the infrastructure configuration for your app (e.g. **Terraform**, **CloudFormation**, etc).
Inflight code is compiled into **JavaScript** and executed within cloud compute platforms in Node.js environments.

Let's look at a simple example:

```js
bring cloud;

let queue = new cloud.Queue();
let counter = new cloud.Counter();
let bucket = new cloud.Bucket();

queue.setConsumer(inflight (message) => {
  let i = counter.inc();
  bucket.put("file-{i}.txt", message);
});
```

`cloud.Queue`, `cloud.Counter` and `cloud.Bucket` are _preflight objects_.
They represent cloud infrastructure resources.
When compiled to a specific cloud provider, such as AWS, a Terraform file will be produced with the provider's implementation
of these resources. The `queue.setConsumer()` method is a _preflight method_ that configures the infrastructure to
invoke a particular _inflight function_ for each message in the queue.

**Now comes the cool part:** the code that runs inside the inflight function interacts with the `counter` and the `bucket` objects
through their _inflight methods_ (`counter.inc()` and `bucket.put()`). These methods can only be
called from inflight scopes.

### Very cool, but what here cannot be done by a library or compiler extension?

In existing languages, where there is no way to distinguish between multiple execution phases, it is impossible to naturally represent this idea that an object has methods that can only be executed from within a specific execution phase (or within certain scopes of the program).
You are welcome to read more about it [here](https://www.winglang.io/docs/faq/why-a-language) (including code samples that show the same app built in Wing vs. other solutions).

## What makes Wing a good fit for cloud development? 🌟

Wing was built from scratch to make it easy for building applications on any cloud.
It includes an assembly of different features that serve that purpose:

- [Cloud services](https://www.winglang.io/docs/faq/supported-clouds-services-and-engines/supported-services) as first-class citizens, with [phase modifiers](https://www.winglang.io/contributing/rfcs/language-spec#13-phase-modifiers) for describing infrastructure and runtime code ([`preflight` and `inflight`](https://www.winglang.io/docs/concepts/inflights)).
- [Wing Cloud Library](https://www.winglang.io/docs/category/cloud) provides a standard set of resources that lets you write cloud portable code.
- [Custom platforms](https://www.winglang.io/docs/concepts/platforms) that keep you in control by allowing you to customize the infrastructure definitions and run policy checks.
- Use any resource in the Terraform ecosystem as first-class citizen in your app.
- [JavaScript interoperability](https://www.winglang.io/contributing/rfcs/language-spec#5-interoperability).
- Automatic generation of IAM policies and other cloud mechanics based on source code.
- [Wing Console](https://www.winglang.io/docs/start-here/installation#wing-console) - a visual application-centric operations and management console, that lets you interact with...
- A [simulator](https://www.winglang.io/docs/concepts/simulator) that can used for testing and debugging in milliseconds.
- JSON as a [primitive data type](https://www.winglang.io/docs/language-reference#114-json-type) with schema validation support for each conversion to and from structs.
- [Immutability by default](https://www.winglang.io/blog/2023/02/02/good-cognitive-friction#immutable-by-default), [implicit async code](https://www.winglang.io/contributing/rfcs/language-spec#113-asynchronous-model), and [safety from nulls and undefined](https://www.winglang.io/docs/language-reference#16-optionality).

For a more in-depth look at Wing's features and benefits, check out our [documentation](https://www.winglang.io/docs/).

## Getting started 🛠️

> 🚧 This is a pre-release, please see our [project status](https://www.winglang.io/contributing/status) for more details.

If you'd just like to dip your feet in the water and see what Wing is all about, you can try it out in our [online playground](https://www.winglang.io/play/) or walk through the [interactive tour](https://www.winglang.io/learn/).

When you're ready to start building your own Wing apps, you'll need to:

1. Install the [Wing CLI](https://www.winglang.io/docs/start-here/installation).
2. Get the [Wing IDE Extension](https://www.winglang.io/docs/start-here/installation#wing-ide-extension) for your favorite editor.
3. Launch the [Wing Console](https://www.winglang.io/docs/start-here/installation#wing-console) and take it for a spin!

For a step-by-step guide, head over to our [Getting Started](https://www.winglang.io/docs/) guide.
It's a once-in-a-lifetime adventure into the Wing rabbit hole!

## FAQs ❓

Here are some questions we're commonly asked that are covered by our [FAQ](https://www.winglang.io/docs/category/faq):

- [Who is behind this project?](https://www.winglang.io/docs/faq/who-is-behind-wing)
- [Which clouds are supported by Wing?](https://www.winglang.io/docs/faq/supported-clouds-services-and-engines/supported-clouds)
- [Which provisioning engines are supported by Wing?](https://www.winglang.io/docs/faq/supported-clouds-services-and-engines/supported-provisioning-engines)

## Community 💬

Join our flock in the [Wing Slack](https://t.winglang.io/slack) community.
We're here to help each other, answer questions, and share our cloud adventures.
Alternatively, post any questions on [GitHub Discussions](https://github.com/winglang/wing/discussions).

## Contributing 🤝

Want to help Wing take flight?
Check out our [contribution guide](https://github.com/winglang/wing/blob/main/CONTRIBUTING.md) to learn how to set up a development environment and contribute to the project.
You can also get started by opening the project in GitHub Codespaces.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/winglang/wing)

We are incredibly grateful to our entire community for contributing bug fixes and improvements:

<a href="https://github.com/winglang/wing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=winglang/wing" />
</a>

## License 📜

Wing is licensed under the [MIT License](./LICENSE.md).
Contributions are made under our [contribution license](./CONTRIBUTION_LICENSE.md).

Happy coding, and remember: the sky's the limit with Wing (yes, another pun)! 🌤️🚀

[wing slack]: https://t.winglang.io/slack
