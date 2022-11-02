# Wing Console

## Installation

```sh
npm install
```

## Dev

```sh
npm run dev
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
# Open
open "release/mac-arm64/Wing Console.app" --args $(pwd)/electron/main/demo.wx
```

## Deeplinks

Once installed, the Wing Console will be able to process deeplinks with the `wing-console://` protocol. It expects an absolute path to a `.wx` file, as follows: `wing-console:///Users/monada/app.wx`
