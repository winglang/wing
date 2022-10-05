# Contributing Guide

Thank you for your interest in contributing to Wing!  ❤️

This document describes everything you need to know to contribute to Wing. There are many ways you can contribute, like:

* [Reporting Issues](#reporting-issues)
* [Updating Documentation](#updating-documentation)
* [Reviewing Pull Requests](#review-pull-requests)
* [Fixing Bugs](#fixing-bugs)
* [Adding Features](#adding-new-features)

## Getting Started

The following section describes how to get started developing changes in this repository.

If you are unsure where to get started with contributing to Wing, please review the [issues labelled 'good first issue'](https://github.com/monadahq/winglang/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

### Setup

Please refer to the individual projects for set up instructions.

[WingSdk](./libs/wingsdk/CONTRIBUTING.md)
[WingLang](./libs/wingc/CONTRIBUTING.md)

### Private Repository Access

While Wing is still in preview mode you take an extra step to access the private repositories. Make sure you have `npm`
installed from Node.js. 

> To generate a token go to your GitHub account and select **Developer
settings** > **Personal access tokens** > **Generate new token**. Make sure to
include permissions for the **read:packages** scope (see
[docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)).

Once you have your Private Access Token (PAT), run the following:

```sh
npm login --scope=@monadahq --registry=https://npm.pkg.github.com
Username: YOUR GITHUB USERNAME
Password: YOUR PERSONAL ACCESS TOKEN
Email: PUBLIC-EMAIL-ADDRESS
```

This will update your local ~/.npmrc file to include a private GitHub Access Token and give you access to the MonadaHQ 
organization repositories.

### Cloning the Repository

Clone this repository. We recommend you use SSH for cloning the repository.

> If you have never set up your local machine to authenticate with GitHub using SSH, you can follow [this guide](TODO).

```shell
git clone git@github.com:monadahq/winglang.git
```

### Project Layout

This repository is a [monorepo] style repository. Sub-projects, like winglang and wingsdk are in separate subdirectories.

```text
.
|-- libs
    |-- wingc
    |-- wingsdk 
```

## WingSDK

The WingSDK is in the `./libs/wingsdk` directory. Please review [that CONTRIBUTING.md](./libs/wingsdk/CONTRIBUTING.md) 
for more information about how to make contributions to that project.

## WingLang

... Coming soon!

## Opening a Pull Request

We love seeing pull requests being submitted, changes are great! To ensure the quickest path to having them reviewed
and accepted by maintainers, please ensure:

- [ ] Tests are written for all changes.

- [ ] Hand-written documentation in `wingsdk/docs/` is updated if features are being added or removed.

- [ ] `npm run build` has been run to lint, build, and update API docs.

- [ ] Commit messages are clear and descriptive and pushed to your fork.

- [ ] Your fork is in sync with the upstream repository.

Create a new pull request [here](https://github.com/monadahq/wingsdk/compare), selecting your fork for the 'compare'
and `main` for the 'base'.

The title of the pull request should adhere to [conventional commits](https://www.conventionalcommits.org). For example,
if you're adding new features, the pull request title should start with `feat(sdk):`. If you are fixing a bug, then `fix(sdk):`
should be the title prefix.

In the description reference any open issues that the changes resolve. Describe the changes you made and include anything
you think would be useful for a reviewer to know. It's also a great place to add a shout-out to anyone who helped with the
changes.

## Reporting Issues

Knowing what problems have to be solved is the first step in having a great piece of software. One of the easiest and 
best ways to get started in contributing to any project is by reporting issues.

Wing development works off of [issues](Issues/) for all bug fixes and feature changes. If you have an issue either because
something isn't working the way you expected, or you'd like a new feature to help you build your applications, you
should open a [new issue](Issues/new).

Reporting issues also provides a place for other members of the community to discuss an issue and not feel alone in their
problems.

When creating a new issue please include as much detail as you can about what you experienced and what you expected. 

For example

...

## Updating Documentation

Documentation can always be improved. Perhaps you found a typo, or maybe a concept was confusing or could benefit from
a diagram. Documentation changes are a great place to getting started contributing to Wing. 

Start by recording the problem with an [issue]. This helps keep track of what has already been identified and helps reduce
duplicate efforts. 

Then, you can open a pull request and have it reviewed. 

## Review Pull Requests

Pull requests will be opened for many different types of changes. All pull requests must be reviewed for:

* Formatting - all code should be passed through linters.
* Documentation - new features should be documented
* Tests - all bugs and new features should have automated tests

## Fixing Bugs

Any bugs or unexpected functionality should be recorded as issues. Once there, it's time to fix them!

## Adding New Features

If Wing isn't doing what it needs to do, an issue should be opened. Those issues will be discussed amongst the community
and then they need to be implemented.

## Next Steps

Still not sure what to do next? Join us on our [Discord server](./README.md#community) and we'll be glad to help.


