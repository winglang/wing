![](./logo/banner-dark.png#gh-dark-mode-only)
![](./logo/banner-light.png#gh-light-mode-only)

<p style="border-top: 1px #eee solid; margin-top: -8px"></p>


<p align="center" style="margin-top: -8px; margin-bottom: 10px">
  ▪︎
  <a href="https://docs.winglang.io/getting-started">Quick Start</a>
  ▪︎
  <a href="http://t.winglang.io/slack">Slack</a>
  ▪︎
  <a href="https://docs.winglang.io/">Docs</a>
  ▪︎
  <a href="https://github.com/winglang/wing/discussions">Post a question</a>
  ▪︎
  <a href="https://github.com/winglang/wing/issues/new?assignees=&labels=bug&template=bug.yml">Report a bug</a>
  ▪︎
  <a href="https://docs.winglang.io/contributors/handbook">Contribute</a>
  ▪︎
</p>

<p style="border-top: 1px #eee solid"></p>

**Wing** is a cloud-oriented programming language. It is a modern,
object-oriented, and strongly-typed language. Most programming languages think
about computers as machines, in Wing, ***the cloud is the computer***.

<p style=
    "
    padding-top: 5pt; 
    padding-bottom: 5pt; 
    padding-left: 10pt;
    padding-right: 10pt;
    margin-bottom: 12pt; 
    background-color: #fff8e6; 
    border-left: #E6A700 5px solid;
    border-right: #E6A700 5px solid;
    border-radius: 4px
    ">
   👷‍♀️ <b style="text-decoration: underline">Alpha:</b> Wing is in very early stages of development.   See our <a href="https://docs.winglang.io/status">Project Status</a> page for more information
</p>

<p style="border-top: 1px #eee solid"></p>

Wing applications compile to [Terraform] and JavaScript, and can be deployed to
any cloud provider (currently only AWS is supported but support for
[GCP](https://github.com/winglang/wing/issues/675) and [Azure]() is planned).

 AWS, GCP,
Azure, or run in your development using the [Wing
Console](https://docs.winglang.io/getting-started/console).



[cloud oriented]: https://docs.winglang.io/#what-is-a-cloud-oriented-language

```js
bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(() ~> {
  bucket.put("greeting.txt", "hello, world!");
});
```

The cloud has evolved to become a general-purpose computing platform. It allows
individuals and teams to deliver value by leveraging services and
infrastructure, which take care of many of the challenges of building and
running software.

However, the cloud has also introduced a new set of challenges for developers.
The cloud is a complex environment, and writing applications often requires
understanding too many low-level details. It is also difficult to build
applications that are portable across cloud providers, and to test and debug
applications locally.

Wing is designed to address these challenges in the following ways:

* **Iteration speed** - Wing applications can run in a local cloud simulator.
  This allows developers to iterate at a much faster pace, and to see the
  effects of incremental changes at milliseconds latency.
* **High-level cloud primitives** - Wing allows developers to leverage the cloud
  to its full extent through a set of rich, high-level and cloud-independent
  resources. This allows developers build complete cloud applications without
  having to be infrastructure experts.
* **Cloud unit tests** - Wing allows developers to use the cloud simulator as
  a library inside unit tests, and test complete architectures without requiring
  deployments or heavy mocking.
* **Infrastructure as policy** - infrastructure concerns such as deployment,
  networking, security and observability can be applied horizontally through
  policies instead of inside the application code.

## Getting Started

See the [getting started] guide in the Wing docs.

[getting started]: https://docs.winglang.io/getting-started

## Learning more

Now that you've written your first Wing program, what's next? Here are some
resources to help you get started:

- [Wing Language Specification](./docs/winglang-spec.md)
- [Wing SDK Reference](./docs/wingsdk-api.md)

## Community

We all hang out at the [Wing Slack] workspace. Come as you are, say hi, ask
questions, help friends, geek out!

Alternatively, post any question you have in [Wing Discussions](https://github.com/winglang/wing/discussions)


## Contributing

We welcome and celebrate contributions from the community! Please see our
[contribution guide](./CONTRIBUTING.md) for more information about setting up a
development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

We are also actively tracking planned features in our roadmap:

- [Wing Language Roadmap](https://github.com/orgs/winglang/projects/1/views/1)
- [Wing SDK Roadmap](https://github.com/orgs/winglang/projects/3/views/1)

## License

This project is licensed under the [MIT License](./LICENSE.md). 

Contributions are made under our [contribution license](https://docs.winglang.io/terms-and-policies/contribution-license.html).

[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA
[Terraform]: https://www.terraform.io/
[AWS account]: portal.aws.amazon.com/billing/signup
[AWS CLI]: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
[AWS credentials]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
[construct programming model]: https://github.com/aws/constructs
[CDK construct]: https://constructs.dev
[personal access token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
