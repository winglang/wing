![](./logo/banner-dark.png#gh-dark-mode-only)
![](./logo/banner-light.png#gh-light-mode-only)

<p align="center">
  &nbsp;
  <a href="https://docs.winglang.io/getting-started">Quick Start</a>
  ▪︎
  <a href="http://t.winglang.io/slack">Slack</a>
  ▪︎
  <a href="https://docs.winglang.io/">Docs</a>
  ▪︎
  <a href="https://github.com/winglang/wing/issues">Issues</a>
  ▪︎
  <a href="https://github.com/winglang/wing/discussions">Discussions</a>
  ▪︎
  <a href="https://stackoverflow.com/questions/tagged/winglang">Stack Overflow</a>
  ▪︎
  <a href="https://docs.winglang.io/contributors/handbook">Contribute</a>
</p>

# Welcome! :wave:

**Wing** is a [cloud-oriented programming language]. It is a modern,
object-oriented, and strongly-typed language. Most programming languages think
about computers as machines. In Wing, ***the cloud is the computer***.

Wing applications compile to Terraform and JavaScript that are ready to deploy
to your favorite cloud provider, and can also be tested in your local
environment using the [Wing Console](https://docs.winglang.io/getting-started/console).

[cloud-oriented programming language]: https://docs.winglang.io/#what-is-a-cloud-oriented-language

```js
bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(inflight (event: str): str => {
  bucket.put("greeting.txt", "hello, world!");
});
```

## This is Alpha

Wing is in its very early stages of development and not recommended for
production use. Many features are still missing, and APIs will dramatically
evolve in the coming months. We are excited for anyone to take part in
influencing the direction of every part of this project.

Our <a href="https://docs.winglang.io/status">Project Status</a> page includes
more information about stability and roadmap 👷‍♀️ 

## Installation

* [Prerequisites](https://docs.winglang.io/getting-started/installation#prerequisites)
* [Wing CLI](https://docs.winglang.io/getting-started/installation#wing-cli)
* [Wing IDE Extension](https://docs.winglang.io/getting-started/installation#wing-ide-extension)
* [Wing Console](https://docs.winglang.io/getting-started/installation#wing-console)

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

We welcome and celebrate contributions from the community! Please see our
[contribution guide](./CONTRIBUTING.md) for more information about setting up a
development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

We are also actively tracking planned features in our roadmap:

- [Wing Language Roadmap](https://github.com/orgs/winglang/projects/1/views/1)
- [Wing SDK Roadmap](https://github.com/orgs/winglang/projects/3/views/1)

## License

This project is licensed under the [MIT License](./LICENSE.md). Contributions are made under our [contribution license](https://docs.winglang.io/terms-and-policies/contribution-license.html).

[Wing Slack]: https://t.winglang.io/slack
