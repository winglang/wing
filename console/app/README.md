# @wingconsole/app

## Download links

- [macOS (x64)](https://wing-console.s3.amazonaws.com/wing-console.dmg)
- [macOS (arm64)](https://wing-console.s3.amazonaws.com/wing-console-arm64.dmg)
- [Windows](https://wing-console.s3.amazonaws.com/wing-console.exe)

## Installation

```sh
pnpm install
```

## Development

```sh
pnpm run dev
```

In order to see the logs in real time:

```sh
tail -f ~/Library/Logs/wing-console/main.log
```

## Testing

```sh
pnpm run vitest
```

End to end:

```sh
# Build the electron files
pnpm run compile
# Run Playwright tests and update snapshots
pnpm run playwright:update
```

## Compile and bundle

```sh
pnpm run compile
pnpm exec vite-node scripts/bundle.mts
open demo/index.w -a $(pwd)/release/mac-arm64/Wing\ Console.app
```

OR run:

```sh
wing run demo/index.w
```

The Console with auto compile on each change you make

## Deeplinks

Once installed, the Wing Console will be able to process deeplinks with the `wing-console://` protocol. It expects an absolute path to a `.w` file, as follows: `wing-console:///Users/winglang/app.w`

## Build the Wing demo file

```sh
cd demo
wing compile -t sim index.w
```
