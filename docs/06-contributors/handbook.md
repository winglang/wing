---
title: Contributor's Handbook
id: handbook
keywords: [Wing contributors, contributors]
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
* Adding [examples](#%EF%B8%8F-how-do-i-add-an-example)
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
Packages that are primarily meant to be run by users are in the `apps` directory, while packages
that are primarily meant to be consumed as libraries are in the `libs` directory. Some packages are
written in Rust, while others are written in TypeScript. Each has a README explaining what it does
and how to use it. (If you see one missing, please open an issue and let us know!)

The Wing monorepo uses [Nx] to run commands across all code packages in the `libs` and `apps`
folders. This means it includes packages that form the entire toolchain (compiler, SDK, IDE
extension, etc), and the build and release bind them all together.

Nx will be installed alongside the rest of the project's dependencies after you run `npm install`
from the root directory, and can be accessed with `npx nx`. (It does not need to be installed
separately).

## 🔨 How do I build the VSCode extension?

The VSCode extension is located in `apps/vscode-wing`. Most of the logic is in the language server, which
is located in `apps/vscode-wing`. Running `npx nx build` from `apps/vscode-wing` will ensure the
language server is built first and the binary is available. This creates an installable VSIX file.

A VSCode launch configuration is available to open a VSCode with a development version of the
extension.

To modify the package.json, please edit `.projenrc.ts` and run `npx projen`.

## 🖼️ How do I add an example?

Adding a code example is a great way to contribute to Wing.  Here's how to do it:

* Fork this repository on GitHub.
* Create a new branch for your example.
* Add your Wing code to the `examples` directory.
  * If your example involves multiple files, create a dedicated directory for it.
* Add a link to your example to the `examples/README.md` file.
* Commit your changes and push them to your fork.
* Open a pull request. A Wing maintainer will review it as soon as possible!

## 🏠 How do I build Wing?

Assuming you've [setup your environment](https://docs.winglang.io/contributors/workflows#environment-setup), including the `npm install` part,
just run the following command from the root of the project:
```
npx nx wing
```

## 🧪 How do I run E2E tests?

Our end-to-end tests are hosted under `./tools/hangar`. To get started, first ensure you can [build wing](#🏠-How-do-I-build-Wing).

To run the tests (and update snapshots), run the following commands from the root of the Hangar
project:

```sh
npm test
```

Or, you can run the following command from the root of the monorepo:

```sh
npx nx run hangar:test
```

## 🧬 What is an RFC?

An RFC is short for "request for comments". It's a document that describes a new feature or change
to Wing. It's a way to propose, gather feedback, and reach consensus for a change from maintainers,
contributors, and users before writing any code. For an example of an RFC, check out:
https://github.com/winglang/wing/blob/main/docs/05-rfcs/2022-06-14-polycons.md

Usually, an RFC is a common practice for major features or complex changes that require that extra
vetting. However, the process is designed to be as lightweight as needed and can be used to request
feedback on any change. Quite often, even changes that seem obvious and simple at first sight can be
significantly improved once a wider group of interested and experienced people have a chance to
weigh in.

## 🔬 What is the RFC process?

See our dedicated [RFC process](https://github.com/winglang/wing/blob/main/docs/05-rfcs/process.md)
page.

## 🐞 How do I submit a bug report?

Wing is a work in progress! Our goal is to to keep the toolchain stable, and to minimize surprising
behavior as new features are added -- but even then, sometimes bugs slip through.

If you spot a bug or any behavior that doesn't match how you expected it to work, please go to our
GitHub and [open an issue](https://github.com/winglang/wing/issues/new). A Wing maintainer will come
to triage it and identify where the problem is, and if there's a way we can fix it.

Also, if you think you have an idea of where the bug is, or even think you might be able to fix it
-- please let us know in the issue! We can give you some pointers and help you get started.

## 📬 How do I submit a pull request?

We love seeing new pull requests! If you're new to GitHub, check out [this
guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) to learn how to
create your own fork of the Wing repository and make a pull request.

To help maintainers review them and get them merged in a speedy fashion, please check:

* [ ] Your pull request has a [descriptive title](#how-are-pull-request-titles-formatted).
* [ ] A description of your changes are included, and a reference to a corresponding issue. (This is also a great place to shout-out anyone who helped with the changes!)
* [ ] Tests are added for all changes.
* [ ] Any handwritten documentation in `docs/` or READMEs are updated where appropriate when features are being added or removed (API docs will be automatically generated for you!).
* [ ] Your fork is in sync with the upstream repository.
* [ ] All build checks on GitHub are passing.

We also recommend you avoid force pushing or rebasing your branch after a pull request has been
opened in order to make it easier to review. Your commit history doesn't need to be perfect, since
it will get squashed into a single commit when the pull request is merged anyway.

### How are pull request titles formatted?

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate our
changelog. To that end, pull request titles must follow this convention:

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
  * `playground`
  * `vscode`
  * `build` - change related to development environment, build system, build tools, etc.
  * `repo` - change related to repository behavior (e.g. pull request templates, issue templates,
    etc).
* `<subject>`
  * Should be all lowercase and without a period (improves aesthetics of changelog).
  * For `fix` changes, subject should describe the problem, not the solution (e.g. `fix(cli): intermediate.js file not found` instead of ~`fix(cli): make sure output directory exists`~).
  * For `feat` changes, subject should describe the feature, not the activity of adding the feature (e.g. `feat(sdk): google cloud platform support` instead of `feat(sdk): add tf-gcp target to sdk`).
  * For `rfc` changes, subject should be the title of the rfc (e.g. `rfc(cli): run command` instead
    of `rfc(cli): rfc for run cli run command`).

## ⚖️ What is the code of conduct?

The Wing community follows the [CNCF Code of
Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md).

Please review it before contributing issues, pull requests, or joining the [Wing Slack].

## 🙋 Where can I go to ask questions about Wing?

Come on down and hang out in the [Wing Slack]! We're a friendly bunch and we'd love to help you out.
There are no stupid questions, so don't be afraid to ask! Don't forget to introduce yourself in the
[#intro](https://winglang.slack.com/archives/C048QDSMC7L) channel.

[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA

## 📕 How do I update documentation

Our documentation lives under the [`docs`](https://github.com/winglang/wing/tree/main/docs)
directory of the Wing GitHub repository. 

To propose an update to the docs, simply submit a pull request against the relevant markdown file.

## 📕 Can I view the local documentation website on my machine?

Yes, you can! We use the awesome [Docusaurus](https://docusaurus.io/) project for our docs.

To start the documentation website, run the following command from the root of the repo:

```sh
npm run docs
```

This magical script will clone the [winglang/docsite](https://github.com/winglang/docsite)
repository into `~/.winglang-docsite`, symlink your local copy into it and start a browser with the
site.
