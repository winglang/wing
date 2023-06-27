---
title: Troubleshooting
id: troubleshooting
keywords: [Wing contributors, contributors, Troubleshooting]
---

# 🔨 Troubleshooting

## `npm run build`

#### Mac dev tools: `error: linking with cc failed: exit code: 1`
Make sure to install Mac dev tools:
```sh
xcode-select --install
```

#### NPM registry: `npm ERR! Cannot read properties of null (reading 'pickAlgorithm')`
```sh
npm cache clear --force 
npm config set registry https://registry.npmjs.org/
```

## `npm run test`

`Error: Failed to bundle function: assertion failed [block != nullptr]: BasicBlock requested for unrecognized address (BuilderBase.h:550 block_for_offset)`

Seems that you run `esbuild-wasm` with node `x64` executable on Apple Silicon device.

Make sure that your current terminal session is on `arm64`:
```sh
arch -arm64 /bin/zsh
```
Reinstall node with `arm64` executable via [nvm](https://github.com/nvm-sh/nvm):
```sh
nvm use system
nvm uninstall <NODE_VERSION>
nvm use <NODE_VERSION>
```
Check the installed node runtime architecture:
```sh
node -e 'console.log(process.arch)'
> arm64
```
Your previously installed `esbuild/darwin-x64` package needs to be replaced by `esbuild/darwin-arm64`. Therefore, remove `esbuild` folder from `./libs/wing/wingsdk/node_modules` and run `npm install`.

## `This version of rustfmt is deprecated. Use rustfmt-nightly.`

Try to move to [rustup]:

- Uninstall Rust (e.g. `brew uninstall rust`).
- Clear `~/.cargo` 
- Install `rustup` (via `brew install rustup` or https://sh.rustup.rs)

[rustup]: https://sh.rustup.rs
