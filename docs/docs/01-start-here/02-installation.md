---
id: installation
title: Installation
keywords: [Wing installation, installation, Wing toolchain]
---

:::info We are out there

New experiences are always better with friends and support, [join](https://t.winglang.io/slack) 
the **Wing Community Slack** and jump right into the [#getting-started](https://winglang.slack.com/archives/C04BBDQUWQP) 
channel. Say :wave: and feel free to ask questions, post rants and 
offer advice to your fellow Wingnuts.

If you run into issues, please submit a [new
issue](https://github.com/winglang/wing/issues/new/choose) on GitHub and let us
know as soon as possible.

::: 

In this section you will install Wing on your system. This includes:

1. **Wing Toolchain**: The Wing development toolchain which includes the **Wing CLI**, **Wing Compiler** and the **Wing Console**.
2. **Wing VSCode Extension**: An extension for developing Wing code in the VSCode IDE.

## Prerequisites

To install Wing, you will need the following setup:

* [Node.js](https://nodejs.org/en/) (>= 18.13.0)
* [VSCode] (not required, but currently supported with an [extension](#wing-vscode-extension))

## Wing Toolchain

The Wing Toolchain is distributed via [npm](https://www.npmjs.com/):

```sh
npm install -g winglang
```

Verify your installation:

```sh
wing --version
```

## Wing VSCode Extension

The Wing VSCode Extension adds syntax highlighting and other conveniences for the Wing Programming Language in [VSCode].

To install the Wing VSCode extension, [download](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) it from the VSCode Marketplace. It is distributed via the VSCode Marketplace.

[VSCode]: https://code.visualstudio.com/
