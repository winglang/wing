> **🚧 Alpha Extension**
> - This extension may crash unexpectedly due to ongoing work on Wing.
> - Requires additional setup to have automatic updates. See [below](#automatic-updates) for more information.

###  Current Features

- 💅 Syntax highlighting
- 🔄 Automatic Updates
- ❗ Diagnostics
  - Invalid syntax
  - Type errors

### Planned Features

This extension is under heavy development alongside the Wing language.  

See [issues labeled with `vscode-extension` or `language-server`](https://github.com/winglang/wing/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Avscode-extension%2Clanguage-server) for upcoming work.

- 🤖 Autocomplete
    - Keywords
    - Variables
    - Types
    - Methods and Fields
- 🔍 Hover
  - Symbol information
  - Documentation 
  - Expression type information
- ⤵️ Go-to definition
- 🕵️‍♀️ Quick Fixes
- 🖥️ Wing Console integration
- 👁️‍🗨️ Inlay hints
  - Types
  - Phase
- 🦄 ... and more!

## How to install

This extension is distributed via GitHub releases. The latest VSIX file can be found [here](https://github.com/winglang/wing/releases/latest/download/vscode-wing.vsix). This can be installed by opening the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and selecting `Extensions: Install from VSIX...` or by running:

```sh 
code --install-extension ~/Downloads/vscode-wing.vsix
```

## Automatic Updates

Run the `[Wing] Set update token` VSCode command from the command palette to add a GitHub PAT to your VSCode settings. This token is used to authenticate with GitHub to pull the latest release. [Use this link to generate a token](https://github.com/settings/tokens/new?description=Winglang%20Beta&scopes=repo,read:packages).

## Contributing

See the FAQ in [CONTRIBUTING.md](../../CONTRIBUTING.md#🔨-how-do-i-build-the-vscode-extension) for how to contribute!