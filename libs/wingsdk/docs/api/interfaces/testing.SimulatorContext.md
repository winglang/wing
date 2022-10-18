[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [testing](../modules/testing.md) / SimulatorContext

# Interface: SimulatorContext

[testing](../modules/testing.md).SimulatorContext

Context that is passed to individual resource simulations.

## Table of contents

### Properties

- [assetsDir](testing.SimulatorContext.md#assetsdir)
- [resolver](testing.SimulatorContext.md#resolver)

## Properties

### assetsDir

• `Readonly` **assetsDir**: `string`

The absolute path to where all assets in `app.wx` are stored.

#### Defined in

[src/testing/simulator.ts:37](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L37)

___

### resolver

• `Readonly` **resolver**: [`IResourceResolver`](testing.IResourceResolver.md)

A resolver that can be used to look up other resources in the tree.

#### Defined in

[src/testing/simulator.ts:32](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L32)
