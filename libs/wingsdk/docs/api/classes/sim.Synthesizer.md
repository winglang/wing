[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / Synthesizer

# Class: Synthesizer

[sim](../modules/sim.md).Synthesizer

Simulator synthesizer.

## Hierarchy

- [`Synthesizer`](core.Synthesizer.md)

  ↳ **`Synthesizer`**

## Table of contents

### Constructors

- [constructor](sim.Synthesizer.md#constructor)

### Properties

- [app](sim.Synthesizer.md#app)
- [outdir](sim.Synthesizer.md#outdir)
- [root](sim.Synthesizer.md#root)

### Methods

- [synth](sim.Synthesizer.md#synth)

## Constructors

### constructor

• **new Synthesizer**(`props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SynthesizerProps`](../interfaces/core.SynthesizerProps.md) |

#### Overrides

[Synthesizer](core.Synthesizer.md).[constructor](core.Synthesizer.md#constructor)

#### Defined in

[src/sim/synth.ts:17](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/synth.ts#L17)

## Properties

### app

• `Private` `Readonly` **app**: [`App`](sim.App.md)

#### Defined in

[src/sim/synth.ts:15](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/synth.ts#L15)

___

### outdir

• `Readonly` **outdir**: `string`

Path to the output directory. For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

#### Overrides

[Synthesizer](core.Synthesizer.md).[outdir](core.Synthesizer.md#outdir)

#### Defined in

[src/sim/synth.ts:13](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/synth.ts#L13)

___

### root

• `Readonly` **root**: `Construct`

Place in the construct tree where all users constructs will get added.

#### Overrides

[Synthesizer](core.Synthesizer.md).[root](core.Synthesizer.md#root)

#### Defined in

[src/sim/synth.ts:14](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/synth.ts#L14)

## Methods

### synth

▸ **synth**(): `void`

Synthesize the app.

#### Returns

`void`

#### Overrides

[Synthesizer](core.Synthesizer.md).[synth](core.Synthesizer.md#synth)

#### Defined in

[src/sim/synth.ts:28](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/synth.ts#L28)
