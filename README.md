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
open release/mac-arm64/wing-console.app --args --cloudFile=$(pwd)/electron/main/demo.wx
```
