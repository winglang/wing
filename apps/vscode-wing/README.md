<h1 align="center">Wing for VSCode</h1>
<p align="center">
  <a href="https://www.winglang.io/docs/">Docs</a>
  ▪︎
  <a href="http://t.winglang.io/slack">Community</a>
  ▪︎
  <a href="https://www.winglang.io/docs/category/faq">FAQ</a>
  ▪︎
  <a href="https://www.winglang.io/contributing/status#roadmap">Roadmap</a>
  ▪︎
  <a href="https://github.com/winglang/wing/issues">Issues</a>
  ▪︎
  <a href="https://play.winglang.io/">Playground</a>
  ▪︎
  <a href="https://www.winglang.io/contributing/">Contribute 💖</a>
</p>

> 🚧 This is a pre-release, please see our [project status](https://www.winglang.io/contributing/status) for more details.

###  Features

- 💅 Syntax highlighting
- ❗ Compiler diagnostics
- 🤖 Code completion
- ✂️ Snippets 
- 🔍 Types and documentation on hover
- 🖥️ Embedded [Wing Console](https://www.winglang.io/docs/tools/wing-console)

### Getting Started

This extension uses the globally installed `wing` CLI to provide language services. You can install it via npm:

```sh
npm install -g winglang
```

### Planned Features

See [issues labeled with `vscode-extension` or `language-server`](https://github.com/winglang/wing/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Avscode-extension%2Clanguage-server) for upcoming work. Here are some of the features we're planning to add:

- ⤵️ Go-to definition
- ♻️ Refactoring and renaming
- 🎨 Semantic highlighting
- 🕵️‍♀️ Quick Fixes
- 👁️‍🗨️ Inlay hints for implicit types and phases
- 🦄 ... and much more!

## Contributing

We welcome community contributions and pull requests. Check out the [Contributor's Handbook](https://www.winglang.io/contributing/) for information on how to set up a development environment. A typical flow for working on the extension is [available there](https://www.winglang.io/contributing/start-here/development#-how-do-i-build-the-vscode-extension) as well.

Most of the logic for this extension is found in the Wing Language server. The extension mostly serves as a client to that server, with some additional features. The entrypoint of the server is in the CLI [here](../wing/src/commands/lsp.ts), while the functionality is in the `wingc` Rust module [here](../../libs/wingc/src/lsp).
