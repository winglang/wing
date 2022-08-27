# Wing SDK

The Wing SDK is the standard library of the Wing programming language, **but it can also be used as a standalone library from any CDK supported language**.

For best experience it should be used with the Wing Language.

It contains the core set of cloud resources that are needed to build cloud applications.

These resources are cloud agnostic and can be used to build applications that run on any cloud provider.

The actual provider is determined at synth time by setting a target.

One of the supported targets is `local` and can be used to run a cloud application locally, without an internet connection, iterate extremely fast and run tests that include cloud resources without needing to mock them.
To use it, you need to use [Wing Local](https://github.com/monadahq/wing-local).

The SDK is released as a private npm module called
[`@monadahq/wingsdk`](https://github.com/monadahq/wingsdk/packages/1519521).

## ⛺ Installation
```shell
npm i @monadahq/wingsdk
```

## 📝 Usage

### With Wing

### As a standalone SDK

The Wing SDK can be used just like ordinary [CDK for TF Constructs](https://github.com/hashicorp/terraform-cdk), with the distinctions that the resources are polymorphic and their concrete implementations are determined at synth time. See [Polycons](https://github.com/monadahq/polycons) for more info

```ts
import { Construct } from "constructs";
import * as wingsdk from "@monadahq/wingsdk";

class Root extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    let bucket = new wingsdk.cloud.Bucket(this, "bucket", {
      public: true,
    });    
  }
}
```

This construct contains a `Bucket` from the cloud library which contains a polymorphic cloud resources whose actual implementation (local, aws, other clouds) is determined at synth time.

To use it in an application, you need to supply a synthesizer which will synthesize resources for the desired target.
In the example below, a `local` synthesizer is used to ensure that the `Bucket` resource will be one that targets the [Wing Local cloud simulator](https://github.com/monadahq/wing-local).
If the commented out TF AWS synthesizer was used, then the `Bucket` resource would be one that targets the AWS cloud.

```ts
import * as core from "../../src/core";
import * as local from "../../src/local";
import * as tfaws from "../../src/tf-aws";

const app = new core.App({
  synthesizer: new local.Synthesizer({ outdir: __dirname }),
  //synthesizer: new tfaws.Synthesizer({ outdir: __dirname }),
});
new Root(app.root, "root");
app.synth();
```

## 🎮 Playground
<!--TODO-->
TBD


## 📖 Documentation

- [Library author guide](./docs)
- [API reference](./API.md)

## ✋ Contributing

We welcome community contributions and pull requests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to set up a development environment and submit code on GitHub.

## 🐣 Getting help

If you need help either using or contributing to this project, please join us on our [Discord server](https://discord.gg/sZDPsppJ).

## ⚖️ License

This library is licensed under the Apache-2.0 license.