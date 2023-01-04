# Wing Console

## Download link

[macOS latest](https://wing-console.s3.amazonaws.com/wing-console.dmg)

[macOS (arm64)](https://wing-console.s3.amazonaws.com/wing-console-arm64.dmg)

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
# Open the included demo/target/index.wsim
open demo/target/index.wsim -a $(pwd)/release/mac-arm64/Wing\ Console.app
```

OR run:

```sh
wing run demo/index.w
```

The Console with auto compile on each change you make

## Deeplinks

Once installed, the Wing Console will be able to process deeplinks with the `wing-console://` protocol. It expects an absolute path to a `.wsim` file, as follows: `wing-console:///Users/winglang/app.wsim`

## Build the Wing demo file

```sh
cd demo
wing compile -t sim index.w
# Extract the wsim, for debugging purposes
cd target
tar -xf index.wsim
```

## Build the Construct Hub demo file

```sh
npx vite-node scripts/generateConstructHubWsim.mts
```
