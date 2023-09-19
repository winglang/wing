---
title: Windows Installation
id: windows
keywords: [Wing contributors, contributors, windows, installation]
---

## How to prepare for take-off on windows? 🐤

We strongly recommend to set the tools up within WSL as some of the scripts
don't support windows and expect the unix tooling.

1. Install WSL 2: [💡 GUIDE](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command)
    - Make sure to restart your machine after installation
    - You can verify your wsl setup with `wsl -l -v`
    - ⚠ All steps below should be done within WSL
2. Install cc for rust: [💡 MORE INFO](https://stackoverflow.com/questions/52445961/how-do-i-fix-the-rust-error-linker-cc-not-found-for-debian-on-windows-10)
3. Install [Rust]: [💡 GUIDE](https://rustup.rs/)
    - Make sure to run `source "$HOME/.cargo/env"` as shown in the console at the end of installation (else cargo and rustc wont be found)
4. Install [Node.js] v18: [💡 GUIDE](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm)
    - `nvm install 18` should install the correct version of node
  - You can verify your node setup with `node -v`
5. Enable [PNPM] v8:
    - For pnpm you can simply run `corepack enable`
    - You can verify your pnpm setup with `pnpm -v`
6. Install [Docker]:
    - Needed to build the grammar as WASM for the web-based playground and to run unit tests
    - WSL now comes with systemd, meaning you don't need docker desktop anymore
    - Enable systemd [💡 GUIDE](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/#how-can-you-get-systemd-on-your-machine)
    - Install docker [💡 GUIDE](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

## Cloud CLIs
- [AWS CLI]
  - Only needed for integration tests - make sure to do the setup part to create credentials
- [Terraform CLI]
  - Only needed for integration tests

## Installation

```sh
git clone https://github.com/winglang/wing
cd wing
pnpm install
```

![Bird High Five](https://i.giphy.com/media/TgrXouvj1MwKoREXap/200w.gif)

[Turbo]: https://turbo.build/repo
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/
[rustup]: https://rustup.rs/
[AWS CLI]: https://aws.amazon.com/cli/
[Terraform CLI]: https://learn.hashicorp.com/terraform/getting-started/install.html
[volta]: https://volta.sh
[PNPM]: https://pnpm.io
[Docker]: https://docs.docker.com/get-docker/
