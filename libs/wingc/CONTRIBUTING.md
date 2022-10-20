# Contributing to WingLang

Thank you for wanting to contribute to Wing Language! This will guide you through everything you need to know to make changes 
and submit pull requests to the GitHub repository.

- [Contributing to Wing SDK](#contributing-to-wing-sdk)
  - [Opening Issues](#opening-issues)
  - [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [Setting up GitHub private packages](#setting-up-github-private-packages)
  - [Orientation](#orientation)
    - [`src` folder](#src-folder)
    - [`test` folder](#test-folder)
  - [Setting up and building the project](#setting-up-and-building-the-project)
  - [Testing](#testing)
    - [Sandbox](#sandbox)
  - [Creating a resource](#creating-a-resource)
  - [Submitting a pull request](#submitting-a-pull-request)
  - [Getting Help](#getting-help)

## Opening Issues

One of the easiest ways to contribute to the Wing SDK is by opening [issues](https://github.com/monadahq/winglang/issues/new).
If you're reporting a bug, try to include detailed information including steps to reproduce it, and what you expected to happen.
If you're suggesting a feature or enhancement, please include information about your use case for it.

## Getting Started

Start by forking or cloning the repository. [GitHub's guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
is a great place to get started on this process.

## Prerequisites

These tools are needed to build the library and run unit tests:

- ???? (@sep)
- Your favorite code editor


To build the project, you also need to `npm login` into `@monadahq` in order to install private npm packages.

### Setting up GitHub private packages

First, you need a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to login to the GitHub npm registry. Follow the instructions in the [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) to create a PAT. Make sure it has the `read:packages` scope.

After, you should configure npm to use the @monadahq package registry by default for the packages under the @monadahq scope by running:

```sh
npm login --scope=@monadahq --registry=https://npm.pkg.github.com

# > Username: GITHUB USERNAME
# > Password: YOUR PAT
# > Email: PUBLIC-EMAIL-ADDRESS
```

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for more information.

## Orientation


### `src` folder

### `test` folder

... we don't have one


## Setting up and building the project

Install the dependencies using npm:

```shell
cargo something
```

## Testing

### Sandbox


## Creating a resource

## Submitting a pull request

To ensure pull requests are reviewed and accepted as quickly as possible, please make sure:

[ ] Tests are written for all changes.

[ ] Hand-written documentation in `libs/wingc/README.md` is updated if features are being added or removed.

[ ] Commit messages are clear and descriptive and pushed to your fork.

[ ] Your fork is in sync with the upstream repository.

Create a new pull request [here](https://github.com/monadahq/wingsdk/compare), selecting your fork for the 'compare' 
and `main` for the 'base'. 

The title of the pull request should adhere to [conventional commits](https://www.conventionalcommits.org). For example, 
if you're adding new features, the pull request title should start with `feat(sdk):`. If you are fixing a bug, then `fix(sdk):` 
should be the title prefix.

In the description reference any open issues that the changes resolve. Describe the changes you made and include anything
you think would be useful for a reviewer to know. It's also a great place to add a shout-out to anyone who helped with the 
changes.

## Getting Help

If you need help in contributing to this project please join our [Discord server](https://discord.gg/7wrggS3dZU) where 
people are waiting to help in the #help channel.
