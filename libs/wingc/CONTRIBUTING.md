# Contributing to WingLang

Thank you for wanting to contribute to Wing Language! This will guide you through everything you need to know to make changes 
and submit pull requests to the GitHub repository.

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
- [Compiler Contributor Setup](#compiler-contributor-setup)
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

## Compiler Contributor Setup

The setup below is almost universal, but it has been only tested on Ubuntu 22.04
under Windows 11 with [WSLg](https://github.com/microsoft/wslg) installed.

You would want the following installed:

- [VSCode](https://code.visualstudio.com/) as your IDE
- Your platform's C/C++ build essentials: `sudo apt install build-essential`
- [LLDB](https://lldb.llvm.org/) for debugging: `sudo apt install lldb`
- [WASI-SDK](https://github.com/WebAssembly/wasi-sdk/): `scripts/setup_wasi.sh`
- [ccache](https://ccache.dev/) for caching builds: `sudo apt install ccache`
- [Rust](https://www.rust-lang.org/) for working on the source code.
- [Perf](https://perf.wiki.kernel.org/index.php/Main_Page) for profiling.
- [FlameGraph](https://github.com/brendangregg/FlameGraph): `cargo install flamegraph`

You need the `perf` utility in order to be able to run a profiler over code.  
`sudo apt install linux-tools-common linux-tools-generic` suffices, but consult
your platform's documentation for more details.

> NOTE: On some platforms the `perf` program that is available on `PATH` may not
> be linked against the correct binary. Look under `/usr/lib/linux-*`.

You would want the following environment variables set:

```bash
export PERF="/usr/lib/linux-tools-*/perf"
export CC="ccache gcc"
export CXX="ccache g++" 
```

`ccache` speeds up native builds through Cargo.

> NOTE: Your compiler might be named differently (e.g `cc` and `c++`).
> Substitute accordingly in the environment variables above.

You would want VSCode opened up in the `wingc` directory.  
You also need the [CodeLLDB](https://github.com/vadimcn/vscode-lldb) extension.

The following debugger configuration works for the compiler with breakpoints:
  
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Debug executable 'wingc'",
      "cargo": {
        "args": [
          "build",
          "--bin=wingc",
          "--package=wingc"
        ],
        "filter": {
          "name": "wingc",
          "kind": "bin"
        }
      },
      "args": ["../../examples/tests/valid/captures.w"],
      "cwd": "${workspaceFolder}"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Debug unit tests in executable 'wingc'",
      "cargo": {
        "args": [
          "test",
          "--no-run",
          "--bin=wingc",
          "--package=wingc"
        ],
        "filter": {
          "name": "wingc",
          "kind": "bin"
        }
      },
      "args": [],
      "cwd": "${workspaceFolder}"
    },
  ]
}
```

To run a profiling session, first modify `Cargo.toml` by adding:

```toml
[profile.bench]
debug = true
```

And run `cargo flamegraph --dev -- ../../examples/tests/valid/captures.w`.  
This should result in a file called `flamegraph.svg` in the `wingc` directory.  
You can drag drop this file into any modern browser to view the profiler data.

## Getting Help

If you need help in contributing to this project please join our [Discord server](https://discord.gg/7wrggS3dZU) where 
people are waiting to help in the #help channel.
