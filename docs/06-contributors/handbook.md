---
title: Contributor's Handbook
id: handbook
---

Thank you for your interest in contributing to Wing!  ❤️

This document describes everything you need to know to help out with the Wing project.
We've structured the handbook as an FAQ to make it easy to find the information you need.

This guide is, of course, open source as well, and as such many parts of this
document might get out of date. If you see any errors, please make a [GitHub
issue] about it, or better yet open a pull request to fix them!

Without further ado, let's get started!

![](./giphy.webp)

## 👋 How can I help?

There are many ways to contribute to Wing:

* Reporting bugs through a [GitHub issue]
* Adding [examples](#how-do-i-add-an-example)
* Writing [documentation and guides](https://github.com/winglang/wing/issues?q=is:issue+is:open+sort:updated-desc+label:documentation)
* Submitting [pull requests] for new features
* Fixing [a known bug](https://github.com/winglang/wing/issues?q=is:issue+is:open+sort:updated-desc+label:bug)
* Reviewing [open pull requests]
* Proposing larger changes or features with an [RFC]
* Answering questions in the [Wing Slack]
* Posting or answering questions in [Wing Discussions]

If you aren't sure where to start, check out issues tagged with the [good first issue] label!

[GitHub issue]: https://github.com/winglang/wing/issues
[open pull requests]: https://github.com/winglang/wing/pulls?q=is:pr+is:open+sort:updated-desc
[pull requests]: #-how-do-i-submit-a-pull-request
[RFC]: #-what-is-an-rfc
[good first issue]: https://github.com/winglang/wing/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+no%3Aassignee+sort%3Aupdated-desc+
[Wing Slack]: https://t.winglang.io/slack
[Wing Discussions]: https://github.com/winglang/wing/discussions

## 🌳 How is this repository structured?

The Wing repository is structured as a monorepo, which means that it contains multiple packages.
Packages that are primarily meant to be run by users are in the `apps` directory, while packages that are primarily meant to be consumed as libraries are in the `libs` directory.
Some packages are written in Rust, while others are written in TypeScript.
Each has a README explaining what it does and how to use it. (If you see one missing, please open an issue and let us know!)

The Wing monorepo uses [Nx] to run commands across all code packages in the `libs` and `apps` folders.
This means it includes packages that form the entire toolchain (compiler, SDK, IDE extension, etc), and the build and release bind them all together.

Nx will be installed alongside the rest of the project's dependencies after you run `npm install` from the root directory, and can be accessed with `npx nx`.
(It does not need to be installed separately).

## 🔨 How do I build Wing locally?

Here is a list of minimal tools you should install to build the Wing repo in your development environment:

* [Node.js] version 18.x or above (we recommend [nvm])
* [Rust]
* [AWS CLI] (only needed for integration tests - make sure to do the setup part to create credentials)
* [Terraform CLI] (only needed for integration tests)

To build the repo locally:

```sh
sudo bash scripts/setup_wasi.sh # one-time setup
npm install
npm run build
```

To run all tests:

```sh
npm run test
```

[Nx]: https://nx.dev/
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/tools/install
[AWS CLI]: https://aws.amazon.com/cli/
[Terraform CLI]: https://learn.hashicorp.com/terraform/getting-started/install.html
[nvm]: https://github.com/nvm-sh/nvm

## 🔨 How do I build just the SDK?

The SDK resides in `libs/wingsdk` and it's where Wing's standard library of resources lives. It's written in TypeScript, and is published to npm.

The SDK is built using a couple of extra libraries and tools:

* [CDK for Terraform] ("cdktf") is a framework for defining Terraform infrastructure. The SDK uses it to generate the Terraform files that users deploy.
* [JSII] is a tool we used to compile the SDK. JSII is a wrapper over TypeScript that makes it possible to use the SDK in other languages like Python, Java, C#, and Go. This is made possible through extra type checks. In practice, the main difference from ordinary TypeScript is that you cannot use advanced TypeScript types like `Partial` or generics in public APIs.
* [Projen] is a tool used to manage project configuration files. It uses the `.projenrc.ts` file to generate `package.json` and other files. You can modify it and run `npx projen` to regenerate the resources. If you are not touching configuration files, you can totally ignore this.

Everything in the SDK can be built by running `npm run build` from `libs/wingsdk`. You can also run `npm run test` to just run tests.

(If you have any issues building the package, please open an issue and let us know!)

[CDK for Terraform]: https://github.com/hashicorp/terraform-cdk
[JSII]: https://github.com/aws/jsii
[Projen]: https://github.com/projen/projen

## 🔨 How do I build the VSCode extension?

The VSCode extension is located in `apps/vscode`. Most of the logic is in the language server, which is located in `apps/wing-language-server`.
Running `nx build` from `apps/vscode` will ensure the language server is built first and the binary is available. This creates an installable VSIX file.

A VSCode launch configuration is available to open a VSCode with a development version of the extension.

## 🧱 How do I add a dependency to the SDK?

If you need to add a new npm dependency to the SDK, you can do so by editing the `.projenrc.ts` file and running `npx projen` after making the edits.
If the dependency is a JSII library[2], you should add it to the list named `peerDeps` - otherwise, you should add it to `bundledDeps`.

Here is an example of adding a package named "fast-json-stringify" pinned to major version 5 through the projenrc file:

```diff
--- a/libs/wingsdk/.projenrc.ts
+++ b/libs/wingsdk/.projenrc.ts
@@ -17,6 +17,7 @@ const project = new cdk.JsiiProject({
   bundledDeps: [
     "esbuild-wasm",
+    "fast-json-stringify@^5",
     "@aws-sdk/client-s3",
     "@aws-sdk/client-lambda",
```

> [2] JSII libraries are npm packages that are compiled with JSII. They are usually published to npm with the `cdk` keyword, and they will have a `.jsii` file at their root.

## 🧩 How do I add a resource to the SDK?

A resource in the SDK has several parts:

* A preflight [polycon](https://github.com/winglang/polycons) API that is shared across all cloud targets. Resource polycons are defined in `src/cloud`. For example, [`src/cloud/bucket.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/cloud/bucket.ts).
* An interface representing the inflight API common across all cloud targets. By convention, if the resource is named like `Gizmo`, the inflight interface should be named `IGizmoClient`. This is usually in the same file as the preflight API.
* A simulator implementation in `src/sim`. This includes:
  * A schema with information to simulate the resource and display the resource in the Wing console. Currently these are in [`src/sim/schema-resources.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/sim/schema-resources.ts).
  * A class that implements the polycon API and can produce the resource's simulation schema. For example, [`src/sim/bucket.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/sim/bucket.ts).
  * An class that implements the inflight API and can simulate the resource. For example, [`src/sim/bucket.sim.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/sim/bucket.sim.ts).
  * Unit tests for the simulator implementation. For example, [`test/sim/bucket.test.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/test/sim/bucket.test.ts).
* An implementation for each target cloud (currently just AWS). This includes:
  * A class that implements the polycon API and creates all of the required terraform resources. For example, [`src/tf-aws/bucket.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/tf-aws/bucket.ts).
  * A class that implements the inflight API that interacts with the cloud resource. For example, [`src/tf-aws/bucket.inflight.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts).
  * Unit tests for the cloud infrastructure. For example, [`test/tf-aws/bucket.test.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/test/tf-aws/bucket.test.ts) and [`test/tf-aws/capture.test.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/test/tf-aws/captures.test.ts).
  * (TODO) Integration tests for the cloud infrastructure.

If you are implementing a new resource, or implementing an existing resource for a new cloud provider, try to take a look at code for existing resources (`Bucket`, `Function`, `Queue`) to see how to structure your code.

For more information about designing resources, check out the Wing SDK design guidelines (TODO).

Feel free to create an issue if you have questions about how to implement a resource or want to discuss the design of a resource.
You can also join us on our [Wing Slack] to ask questions (or just say hi)!

[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA

## 🎨 How do I design the API for a SDK resource?

Check out the Wing SDK design guidelines (TODO).

## 🏁 How do I add and run tests to the SDK?

The SDK uses [jest](https://jestjs.io/) for running unit tests - all of the tests are inside of the `libs/wingsdk/test` directory, organized by the file they test.

All features and bug fixes should have tests! They're easy to forget, but they pay off by helping prevent breakages in the future.

All tests can be run by running the following command from `libs/wingsdk`:

```sh
npm run test
```

During development, you might find it useful to watch for changes and automatically re-run the tests:

```sh
npm run test:watch
```

To re-run individual tests, you can directly use the `jest` command -- for example:

```sh
npx jest test/tf-aws/bucket.test.ts
```

## 🖼️ How do I add an example?

Adding a code example is a great way to contribute to Wing.  Here's how to do it:

* Fork this repository on GitHub.
* Create a new branch for your example.
* Add your Wing code to the `examples` directory.
  * If your example involves multiple files, create a dedicated directory for it.
* Add a link to your example to the `examples/README.md` file.
* Commit your changes and push them to your fork.
* Open a pull request. A Wing maintainer will review it as soon as possible!

## 🧪 How do I run E2E tests?

The [Hangar](./tools/hangar) project hosts our E2E tests. To get started, first ensure you can [build wing](#🔨-how-do-i-build-wing-locally).

Add a `.env` file to `tools/hangar` with the following:

```env
NPM_TOKEN=<GitHub PAT with access to @winglang packages>
```

This allows the spun-up registry to pull down @winglang packages from the private github registry.

To run the tests (and update snapshots), run the following commands from the root of the Hangar project:

```sh
npx nx test
```

## 🧬 What is an RFC?

An RFC is short for "request for comments".
It's a document that describes a new feature or change to Wing.
It's a way to propose, gather feedback, and reach consensus for a change from maintainers, contributors, and users before writing any code.
For an example of an RFC, check out: https://github.com/winglang/wing/blob/main/rfcs/polycons.md

Usually, an RFC is a common practice for major features or complex changes that require that extra vetting.
However, the process is designed to be as lightweight as needed and can be used to request feedback on any change.
Quite often, even changes that seem obvious and simple at first sight can be significantly improved once a wider group of interested and experienced people have a chance to weigh in.

## 🔬 What is the RFC process?

See our dedicated [RFC process](https://github.com/winglang/wing/blob/main/rfcs/rfc-process.md) page.

## 🐞 How do I submit a bug report?

Wing is a work in progress!
Our goal is to to keep the toolchain stable, and to minimize surprising behavior as new features are added -- but even then, sometimes bugs slip through.

If you spot a bug or any behavior that doesn't match how you expected it to work, please go to our GitHub and [open an issue](https://github.com/winglang/wing/issues/new).
A Wing maintainer will come to triage it and identify where the problem is, and if there's a way we can fix it.

Also, if you think you have an idea of where the bug is, or even think you might be able to fix it -- please let us know in the issue! We can give you some pointers and help you get started.

## 📬 How do I submit a pull request?

We love seeing new pull requests!
If you're new to GitHub, check out [this guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) to learn how to create your own fork of the Wing repository and make a pull request.

To help maintainers review them and get them merged in a speedy fashion, please check:

* [ ] Your pull request has a [descriptive title](#how-are-pull-request-titles-formatted).
* [ ] A description of your changes are included, and a reference to a corresponding issue. (This is also a great place to shout-out anyone who helped with the changes!)
* [ ] Tests are added for all changes.
* [ ] Any handwritten documentation in `docs/` or READMEs are updated where appropriate when features are being added or removed (API docs will be automatically generated for you!).
* [ ] Your fork is in sync with the upstream repository.
* [ ] All build checks on GitHub are passing.

We also recommend you avoid force pushing or rebasing your branch after a pull request has been opened in order to make it easier to review.
Your commit history doesn't need to be perfect, since it will get squashed into a single commit when the pull request is merged anyway.

### How are pull request titles formatted?

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate our changelog.
To that end, pull request titles must follow this convention:

```
<type>(<scope>): <subject>
```

* `<type>` must be be one of:
  * `feat` (new feature)
  * `fix` (bug fix)
  * `docs` (documentation update)
  * `rfc` (new/update to an RFC doc)
  * `chore` (not included in changelog)
* `<scope>` must be one of:
  * `compiler`
  * `sdk`
  * `docs`
  * `cli`
  * `examples`
  * `build` - change related to development environment, build system, build tools, etc.
  * `repo` - change related to repository behavior (e.g. pull request templates, issue templates, etc).
* `<subject>`
  * Should be all lowercase and without a period (improves aesthetics of changelog).
  * For `fix` changes, subject should describe the problem, not the solution (e.g. `fix(cli): intermediate.js file not found` instead of ~`fix(cli): make sure output directory exists`~).
  * For `feat` changes, subject should describe the feature, not the activity of adding the feature (e.g. `feat(sdk): google cloud platform support` instead of `feat(sdk): add tf-gcp target to sdk`).
  * For `rfc` changes, subject should be the title of the rfc (e.g. `rfc(cli): run command` instead of `rfc(cli): rfc for run cli run command`).

## ⚖️ What is the code of conduct?

The Wing community follows the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md).

Please review it before contributing issues, pull requests, or joining the [Wing Slack].

## 🙋 Where can I go to ask questions about Wing?

Come on down and hang out in the [Wing Slack]! We're a friendly bunch and we'd love to help you out. There are no stupid questions, so don't be afraid to ask! Don't forget to introduce yourself in the [#intro](https://winglang.slack.com/archives/C048QDSMC7L) channel.

[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA

## 📕 How do I update documentation

Our documentation lives under the [`docs`](https://github.com/winglang/wing/tree/main/docs) directory 
of the Wing GitHub repository. 

To propose an update to the docs, simply submit a pull request against the
relevant markdown file.

## 📕 Can I view the local documentation website on my machine?

Yes, you can! We use the awesome [Docusaurus](https://docusaurus.io/) project
for our docs.

To start the documentation website, run the following command from the root of
the repo:

```sh
npm run docs
```

This magical script will clone the
[winglang/docsite](https://github.com/winglang/docsite) repository into
`~/.winglang-docsite`, symlink your local copy into it and start a browser with
the site.
