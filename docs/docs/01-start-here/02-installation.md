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

In this section you will install the Wing toolchain on your system.

The toolchain includes three tools:

1. **Wing CLI** - the compiler toolchain
2. **Wing VSCode Extension** - IDE support for Wing
3. **Wing Console** - a web application for viewing and interacting with your Wing programs.

To install Wing, you will need the following setup:

* [Node.js](https://nodejs.org/en/) (>= 18.13.0)
* [VSCode]
    * Not required, but currently supported with an [extension](#wing-ide-extension)

## Wing CLI

<br/>
<details>
  <summary><b>!Caution If you were in our closed alpha</b></summary>
<br/>

If you installed Wing as part of our closed alpha, please make sure to uninstall the existing version
and clean up your `~/.npmrc` before continuing. Otherwise you will see the following error when trying
to install `winglang`:

```
Not Found - GET https://npm.pkg.github.com/@winglang%2fsdk
```

First, uninstall Wing from your system:

```sh
npm uninstall -g @winglang/wing
```

Now, edit `~/.npmrc` and remove this line:

```
@winglang:registry=https://npm.pkg.github.com/
```

You can also just delete `~/.npmrc` if there are no other registries that you are signed into.

</details>

<br/>

Install the Wing CLI through npm:

```sh
npm install -g winglang
```

Check that the installation was successful:

```sh
wing --version
```

## Wing IDE Extension

This extension adds syntax highlighting and other conveniences for the Wing language in [VSCode]. You don't *have*
to use it, but it's great. It's available through the VSCode Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing).

[AWS account]: https://portal.aws.amazon.com/billing/signup
[AWS CLI]: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
[AWS credentials]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
[personal access token]: https://github.com/settings/tokens/new?description=Winglang%20Beta&scopes=repo,read:packages
[VSCode]: https://code.visualstudio.com/
