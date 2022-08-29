# Contributing to Wing SDK

Thank you for wanting to contribute to Wing SDK! This will guide you through everything you need to know to make changes 
and submit pull requests to the GitHub repository.

## Opening Issues

One of the easiest ways to contribute to this project is by opening [issues](https://github.com/monadahq/wingsdk/issues/new).
If you're reporting a bug, try to include detailed information including steps to reproduce it, and what you expected to happen.
If you're suggesting a feature or enhancement, please include information about your use case for it.

## Getting Started

Start by forking or cloning the repository. [GitHub's Guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
is a great place to get started on this process.

## Prerequisites
- [AWS CLI](https://aws.amazon.com/cli/) - make sure to do the setup part to create credentials
- [Terraform CLI](https://learn.hashicorp.com/terraform/getting-started/install.html)
- [CDK TF CLI](https://learn.hashicorp.com/tutorials/terraform/cdktf-install?in=terraform/cdktf) - not required if you are using just the commands added to npm in the projen def file


You also need to `npm login` into `@monadahq`.

## Orientation
This is a [CDK for Terraform](https://www.terraform.io/cdktf) [JSII](https://github.com/aws/jsii) [Projen](https://github.com/projen/projen) project. So its package.json and other resources are generated from the `.projenrc.js` file in the root. After modifying it, run `npx projen` to regenerate the resources.

### src folder
Contains the cloud resources for different targets: local and aws at the moment.

All the resource implementations inherit from the base resources in the `cloud` folder.

The non-base resources there are consumed by the app and their constructors return the injected target implementation (aws or local) using the [Polycons](https://github.com/monadahq/polycons) factory that is configured at synth time.

The actual in-flight (or runtime) code of the resources is taken from the [wingsdk-clients repo](https://github.com/monadahq/wingsdk-clients).

### test folder
Contains tests for the different parts of the SDK and a `sandbox` folder which is a root of a CDK for TF project that you can use to deploy a mock app to the cloud or to our local simulator [Wing Local](https://github.com/monadahq/wing-local).

## License

Apache 2.0 (when released)

## Installing Dependencies

Install the dependencies needed with NPM:

```shell
$ npm i
```

## Building

Building this project is accomplished by running the build script:

```shell
$ npm run build
```

This will build the project, generate the docs, lint the code, and run tests.

## Testing

Any changes that you make to this project should be covered with tests. If you are adding new resources to the 
library, please ... TODO: complete this section when we have a test FW. <!-- TODO complete this section when we have a test FW--> 

This project uses [jest](https://jestjs.io/) testing framework. Please refer to the documentation on it if you are not 
familiar with it. 

When writing tests, group together common functionality under test using a `describe` function. Individual tests are 
written in `it` functions. For example:

```typescript

```

All changes need to have tests. Feature changes should have full test coverage and bug fixes should be verified first
through new tests. 

All tests can be run using the `test` script:

```shell
$ npm run test
```

During a lot of active development you may find it useful to watch for changes and automatically re-run the tests:

```shell
$ npm run test:watch
```

### Sandbox

```bash
// This will synth the sandbox to either the cloud or wing local
npm install
npm run sandbox:synth

// This will deploy the sandbox app to the cloud or to Wing Local
npm run sandbox:deploy 

// follow up with this command to clear the cloud resources
npm run sandbox:destroy 
```

## Updating the README

Changes in core functionality should include changes to the README.md file explaining the functional changes. Please 
consider this when submitting changes. If you feel there is no need to change the README or documentation,
state your reason when submitting the pull request. A lack of updates to the README may cause a delay in a pull request 
being merged.

## Submitting a pull request

To ensure pull requests are reviewed and accepted as quickly as possible, please make sure:

[ ] Tests are written for all changes.

[ ] README.md is updated if new features are being added.

[ ] `npm run build` has been run to lint, build, and update API docs.

[ ] Commit messages are clear and descriptive and pushed to your fork.

[ ] Your fork is in sync with the upstream repository.

Create a new pull request [here](https://github.com/monadahq/wingsdk/compare), selecting your fork for the 'compare' 
and `main` for the 'base'. 

The title of the pull request should adhere to [conventional commits](https://www.conventionalcommits.org). For example, 
if you're adding new features, the pull request title should start with `feat:`. If you are fixing a bug, then `fix:` 
should be the title prefix.

In the description reference any open issues that the changes resolve. Describe the changes you made and include anything
you think would be useful for a reviewer to know. It's also a great place to add a shout-out to anyone who helped with the 
changes.

## Getting Help

If you need help in contributing to this project please join our [Discord server](https://discord.gg/7wrggS3dZU) where 
people are waiting to help in the #help channel.
