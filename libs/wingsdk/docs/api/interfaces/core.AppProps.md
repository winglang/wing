[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / AppProps

# Interface: AppProps

[core](../modules/core.md).AppProps

Props for `App`.

## Table of contents

### Properties

- [stateFile](core.AppProps.md#statefile)
- [synthesizer](core.AppProps.md#synthesizer)

## Properties

### stateFile

• `Optional` `Readonly` **stateFile**: `string`

The path to a state file which will track all synthesized files. If a
statefile is not specified, we won't be able to remove extrenous files.

**`Default`**

- no state file

#### Defined in

[src/core/app.ts:22](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/app.ts#L22)

___

### synthesizer

• `Readonly` **synthesizer**: [`Synthesizer`](../classes/core.Synthesizer.md)

A synthesizer that handles setting up a CDK framework and registering a
polycon factory.

#### Defined in

[src/core/app.ts:28](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/app.ts#L28)
