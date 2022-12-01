# Wing Console

## Download link

Download the latest release: https://wing-console.s3.amazonaws.com/wing-console.dmg

## Installation

```sh
npm install

npx projen
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
# Open the included demo/index.wx
open demo/target/index.wx -a $(pwd)/release/mac-arm64/Wing\ Console.app
```

## Deeplinks

Once installed, the Wing Console will be able to process deeplinks with the `wing-console://` protocol. It expects an absolute path to a `.wx` file, as follows: `wing-console:///Users/winglang/app.wx`

## Build the Wing demo file

```sh
cd demo
wing compile -t sim index.w
# Extract the wsim, for debugging purposes
cd target
tar -xf index.wsim
```
