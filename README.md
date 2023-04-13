# Welcome to the Wing Language! :wave:

<p align="left">
  <a href="https://docs.winglang.io/getting-started">Quick Start</a>
  ▪︎
  <a href="http://t.winglang.io/slack">Join Slack</a>
  ▪︎
  <a href="https://docs.winglang.io">Docs</a>
  ▪︎
  <a href="https://docs.winglang.io/faq">FAQ</a>
  ▪︎
  <a href="https://docs.winglang.io/status#roadmap">Roadmap</a>
  ▪︎
  <a href="https://github.com/winglang/wing/issues">Issues</a>
  ▪︎
  <a href="https://github.com/winglang/wing/discussions">Discussions</a>
  ▪︎
  <a href="https://docs.winglang.io/contributors/">Contribute</a>
</p>

**Winglang** is a new open-source programming language designed for the cloud (aka "*cloud-oriented*"). Wing enables developers to build distributed systems that leverage cloud services as first-class citizens by combining infrastructure ***and*** code.
Wing programs can be executed locally (*yes, no internet required*) using a fully-functional simulator, or deployed to any cloud provider (*yes, Wing programs are portable across providers*).

Our mission is to bring back your creative flow and close the gap between imagination and creation. Wing elevates your cloud development experience to new heights (the puns are just inevitable so bear with us)! 🚀

<a href="https://youtu.be/vHy1TM2JzUQ" target="_blank" align="left">
    <img src="./logo/demo.gif" alt="Wing Demo" height="300px">
</a>

Wing is built by [Elad Ben-Israel](https://github.com/eladb), the guy behind the [AWS CDK](https://github.com/aws/aws-cdk), the gang at [Monada](https://monada.co) and an amazing [community](https://t.winglang.io/slack) of contributors (also known as Wingnuts).

## What's so special about Wing? 🤔

Wing takes a unique approach to cloud development - instead of thinking about computers as individuals machines, it treats the ***entire cloud as the computer***.
By abstracting the cloud, Wing allows anyone building cloud applications to focus on their business logic and choose the target cloud at compile time.

The result? While your main code is written in Wing, the compilation artifacts are JavaScript and Terraform (with more provisioning engines on the way), meaning Wing can fit seamlessly into your existing stack!

In addition, Wing provides a built-in local simulator, and an observability & debugging [console](https://docs.winglang.io/getting-started/console), making it easier for you to reduce cognitive load and context switching, enabling you to stay in your creative flow.

Here's a taste of what Wing code looks like:

```js
bring cloud;

// This code defines a bucket as part of your application.
// At compile time, it will be substituted by an implementation
// for the target cloud provider.
let bucket = new cloud.Bucket();

// Here we are able to interact with infra config of the bucket
bucket.public = true;

// An `inflight` represents code that runs later, on other machines,
// and can interact with any cloud resources
let hello_world = inflight () => {
  bucket.put("hello.txt", "Hello, World!");
};

// We can deploy the inflight as a serverless function
// (or in the future as a long-running service, etc.)
new cloud.Function(hello_world);
```

> ### Note for cloud experts 🤓
>
> To give full control over how applications are deployed, Wing lets you customize **operational details** in a few ways:
>
> 1. by creating a [compiler plugin](https://docs.winglang.io/reference/compiler-plugins) that modifies the generated Terraform, or 
> 2. by providing implementations of built-in resources like `cloud.Bucket`, or
> 3. by developing your own custom resources.
>
> This layer of separation allows you to refactor code and write unit tests that focus on the business logic, while still having the flexibility to make changes under the hood.

## Getting started 🛠️

> 🚧 Wing is still in alpha, and not recommended for production use. But we're excited for anyone to take part in shaping our 
> roadmap and contributing in any way. Our [project status](https://docs.winglang.io/status) page includes more information about 
> stability and roadmap.

You can install Wing in a few simple steps:

1. Check out the [Prerequisites](https://docs.winglang.io/getting-started/installation#prerequisites).
2. Install the [Wing CLI](https://docs.winglang.io/getting-started/installation#wing-cli).
3. Get the [Wing IDE Extension](https://docs.winglang.io/getting-started/installation#wing-ide-extension) for your favorite editor.
4. Launch the [Wing Console](https://docs.winglang.io/getting-started/installation#wing-console) and take it for a spin!

For a step-by-step guide, head over to our [Getting Started](https://docs.winglang.io/getting-started) guide.
It's a once-in-a-lifetime adventure into the Wing rabbit hole!

## Deeper dive 🤿

To learn more about Wing concepts such as resources and inflights, jump over to the [Concepts](https://docs.winglang.io/category/concepts) section in our docs.

For a comprehensive reference of the language, check out the [Wing Language Specification](https://docs.winglang.io/reference/spec) and the [API Reference](https://docs.winglang.io/reference/sdk).

## FAQs ❓

Have a question about Wing? head over to our [FAQ](https://docs.winglang.io/faq) to find the answer.
Three main questions you can find there are:

### Why is Wing a language, not just another library or framework? 🤔
The answer is [here]((https://docs.winglang.io/faq/why-a-language)).

### What makes Wing a good fit for cloud development? 🌟
The answer is [here]((https://docs.winglang.io/faq/good-fit)).

### Who is behind this project? 💼
The answer is [here]((https://docs.winglang.io/faq/who-is-behind-wing)).

## Community 💬

Join our flock in the [Wing Slack](https://t.winglang.io/slack) community.
We're here to help each other, answer questions, and share our cloud adventures.
Alternatively, post any questions on [GitHub Discussions](https://github.com/winglang/wing/discussions).

## Contributing 🤝

Want to help Wing take flight?
Check out our [contribution guide](https://github.com/winglang/wing/blob/main/CONTRIBUTING.md) to learn how to set up a development environment and contribute to the project.
We appreciate your support and look forward to learning and building together.

We are incredibly grateful to our entire community for contributing bug fixes and improvements:

<a href="https://github.com/winglang/wing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=winglang/wing" />
</a>

## License 📜

Wing is licensed under the  [MIT License](./LICENSE.md).
Contributions are made under our [contribution license](https://docs.winglang.io/terms-and-policies/contribution-license.html).

Happy coding, and remember: the sky's the limit with Wing (yes, another pun)! 🌤️🚀

[wing slack]: https://t.winglang.io/slack
