# Wing Console

## Installation

download the latest release dmg file from [releases](https://github.com/winglang/console/releases)

```sh
npm install
```

## Dev

```sh
npm run dev
```

In order to see the logs in real time:

```sh
tail -f ~/Library/Logs/wing-console/main.log
```

## Storybook

```sh
npm run storybook
```

## Build

```sh
# Build
npm run release
npm exec vite-node scripts/builderElectronApp.mts
# Open the included demo.wx
open electron/main/demo.wx -a $(pwd)/release/mac-arm64/Wing\ Console.app
```

## Deeplinks

Once installed, the Wing Console will be able to process deeplinks with the `wing-console://` protocol. It expects an absolute path to a `.wx` file, as follows: `wing-console:///Users/winglang/app.wx`
