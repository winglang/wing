# Wing SDK

The Wing SDK is the standard library of the Wing programming language, **but it can also be used as a standalone library from any CDK supported language**.
For best experience it should be used with the Wing Language.

It contains the core set of cloud resources that are needed to build cloud applications.
These resources are cloud agnostic and can be used to build applications that run on any cloud provider.
The actual provider is determined at synth time by setting a target.

One of the supported targets is `sim` and can be used to run a cloud application locally, without an internet connection, iterate extremely fast and run tests that include cloud resources without needing to mock them.

The SDK is released as a private npm module named
[`@winglang/sdk`](https://github.com/winglang/wingsdk/packages/1519521).

## ⛺ Installation
```shell
npm i @winglang/sdk
```

## 📝 Usage

### With Wing

The Wing SDK is part of Wing's standard library. Create a new file called `hello.w` and import the SDK with `bring cloud;`:

```wing
bring cloud;

let queue = new cloud.Queue();

queue.addConsumer(inflight (message) => {
  log("Hello, ${message}!");
});
```

Then use `wing compile` to compile your program to different clouds. Run `wing compile --help` to see what options are available!

### As a TypeScript/JavaScript Library

The Wing SDK can be used just like ordinary [CDK for TF Constructs](https://github.com/hashicorp/terraform-cdk), with the distinctions that the resources are polymorphic and their concrete implementations are determined at synth time. See [Polycons](https://github.com/winglang/polycons) for more details.

```ts
import { Construct } from "constructs";
import * as sdk from "@winglang/sdk";

class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    let bucket = new sdk.cloud.Bucket(this, "bucket", {
      public: true,
    });
  }
}
```

This construct contains a `Bucket` from the cloud library which represents a polymorphic cloud resources whose actual implementation (local, aws, other clouds) is determined at synth time.

To use it in an application, you need to supply a synthesizer which will synthesize resources for the desired target.
In the example below, a `sim` synthesizer is used which tells the SDK to produce a simulator  (`.wsim`) file.
The `.wsim` file can be passed to the Wing console to simulate the bucket using your file system.
If the commented out TF AWS synthesizer is used instead, then a Terraform application will be synthesized.
The Terraform application will include an AWS S3 Bucket to represent the `Bucket`.

```ts
import * as sim from "../../src/sim";
import * as tfaws from "../../src/tf-aws";

const app = new sim.App();
// const app = new tfaws.App(); // alternative
new HelloWorld(app, "HelloWorld");
app.synth();
```

## 📖 Documentation

- [Simulator guide](../../docs/simulator.md)
- [SDK Roadmap](https://github.com/orgs/winglang/projects/3/views/1)
- [API reference](./API.md)
- Wing SDK design guidelines (TODO)

## ✋ Contributing

We welcome community contributions and pull requests. See the [Wing Contributor's Handbook](../../CONTRIBUTING.md) for information on how to set up a development environment and add new resources to the SDK.

## 🐣 Getting help

If you need help either using or contributing to this project, please join us on our [Wing Slack].

[Wing Slack]: https://t.winglang.io/slack

## ⚖️ License

This library is licensed under the MIT license.
