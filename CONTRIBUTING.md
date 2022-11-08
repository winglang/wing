# Wing Contributor's Handbook

Thank you for your interest in contributing to Wing!  ❤️

This document describes everything you need to know to contribute to Wing.
We've structured this as an FAQ to make it easy to find the information you need.

- [Wing Contributor's Handbook](#wing-contributors-handbook)
  - [How can I help?](#how-can-i-help)
  - [How do I build Wing locally?](#how-do-i-build-wing-locally)
  - [How do I install private GitHub packages?](#how-do-i-install-private-github-packages)
  - [How do I add an example?](#how-do-i-add-an-example)
  - [What is an RFC?](#what-is-an-rfc)
  - [When should I write an RFC?](#when-should-i-write-an-rfc)
  - [What is the RFC process?](#what-is-the-rfc-process)
  - [How do I submit a pull request?](#how-do-i-submit-a-pull-request)
  - [How are pull request titles formatted?](#how-are-pull-request-titles-formatted)
  - [Where can I go to ask questions about Wing?](#where-can-i-go-to-ask-questions-about-wing)

## How can I help?

There are many ways to contribute to Wing:

* Reporting bugs (GitHub issue)
* Adding examples (see [How do I add an example?])
* Updating documentation
* Reviewing open pull requests
* Submitting pull requests for fixes or new features (see [How do I submit a pull request?])
* Proposing larger changes or features with an RFC (see [What is an RFC?])
* Answering questions in the [Wing Slack]
* Posting or answering questions in our forums [Wing Forum]

If you aren't sure where to start, check out issues tagged with the [good first issue] label.

[How do I add an example?]: #how-do-i-add-an-example
[How do I submit a pull request?]: #how-do-i-submit-a-pull-request
[What is an RFC?]: #what-is-an-rfc
[good first issue]: https://github.com/winglang/wing/issues?q=is:issue+is:open+sort:updated-desc+label:%22good+first+issue%22
[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA
[Wing Forum] (TODO: add discourse link)

## How do I build Wing locally?

The Wing monorepo uses [Nx] to run commands across all code packages in the `libs` and `apps` folders.

Here is a list of minimal tools you should install to build the Wing repo in your development environment:

* [Node.js] version 18.x or above (we recommend [nvm])
* [Rust]

To build the repo locally:

```bash
npm install
npm run build
```

To run all tests:

```bash
npm run test
```

Some parts of the Wing toolchain are written in Rust, while others are written in TypeScript. To get started contributing to a specific part of Wing, check out their individual contributing guides:

* [Wing SDK](./libs/wingsdk/CONTRIBUTING.md)
* [Wing Compiler](./libs/wingc/CONTRIBUTING.md) (TODO)
* [Wing Language Server](./apps/wing-language-server/CONTRIBUTING.md) (TODO)
* [Wing VSCode Extension](./apps/vscode-wing/CONTRIBUTING.md) (TODO)
* [Wing CLI](./apps/wing/CONTRIBUTING.md) (TODO)

[Nx]: https://nx.dev/
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/tools/install

## How do I install private GitHub packages?

While the `winglang` GitHub organization is private, you may need some extra setup to install npm packages like the CLI or SDK.

First, you need a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to login to the GitHub npm registry.
Follow the instructions in the [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) to create a PAT. Make sure it has the `read:packages` scope.

After, you should configure npm to use the @winglang package registry by default for the packages under the @winglang scope by running:

```sh
npm login --scope=@winglang --registry=https://npm.pkg.github.com

# > Username: GITHUB USERNAME
# > Password: YOUR PAT
# > Email: PUBLIC-EMAIL-ADDRESS
```

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for more information.

## How do I add an example?

Adding a code example is a great way to contribute to Wing.  Here's how to do it:

* Fork this repository on GitHub.
* Create a new branch for your example.
* Add your example to the `examples/showcase` directory.
  * If your example involves multiple files, create a dedicated directory for it.
* Add a link to your example to the `examples/showcase/README.md` file.
* Commit your changes and push them to your fork.
* Open a pull request.

## What is an RFC?

An RFC is short for "request for comments".
It's a document that describes a new feature or change to Wing.
It's a way to propose, gather feedback, and reach consensus for a change from maintainers, contributors, and users before writing any code.
For an example of an RFC, check out: https://github.com/winglang/wing/blob/main/rfcs/polycons.md

## When should I write an RFC?

Usually, an RFC is a common practice for major features or complex changes that require that extra vetting.
However, the process is designed to be as lightweight as needed and can be used to request feedback on any change.
Quite often, even changes that seem obvious and simple at first sight can be significantly improved once a wider group of interested and experienced people have a chance to weigh in.

## What is the RFC process?

See our dedicated [RFC process](./rfcs/rfc-process.md) page.

## How do I submit a pull request?

We love seeing new pull requests!
If you're new to GitHub, check out [this guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) to learn how to create your own fork of the Wing repository and make a pull request.

To help maintainers review them and get them merged in a speedy fashion, please check:

* [ ] Your pull request has a descriptive title (see [How are pull request titles formatted?](#how-are-pull-request-titles-formatted)]).
* [ ] A description of your changes are included, and a reference to a corresponding issue. (This is also a great place to shout-out anyone who helped with the changes!)
* [ ] Tests are added for all changes.
* [ ] Any handwritten documentation in `docs/` or READMEs are updated where appropriate when features are being added or removed (API docs will be automatically generated for you!).
* [ ] Your fork is in sync with the upstream repository.

Other tips:

* We recommend you avoid force pushing or rebasing your branch after a pull request has been opened in order to make it easier to review.
Your commit history doesn't need to be perfect, since it will get squashed into a single commit when the pull request is merged anyway.

## How are pull request titles formatted?

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

## Where can I go to ask questions about Wing?

Come on down and hang out in the [Wing Slack]! We're a friendly bunch and we'd love to help you out. There are no stupid questions, so don't be afraid to ask! Don't forget to introduce yourself in the #intro channel.

[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA
