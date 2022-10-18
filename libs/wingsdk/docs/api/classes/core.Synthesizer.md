[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / Synthesizer

# Class: Synthesizer

[core](../modules/core.md).Synthesizer

Handles the initialization and synthesis of constructs for a given
CDK framework.

## Hierarchy

- **`Synthesizer`**

  ↳ [`Synthesizer`](tfaws.Synthesizer.md)

  ↳ [`Synthesizer`](sim.Synthesizer.md)

## Table of contents

### Constructors

- [constructor](core.Synthesizer.md#constructor)

### Properties

- [outdir](core.Synthesizer.md#outdir)
- [root](core.Synthesizer.md#root)

### Methods

- [synth](core.Synthesizer.md#synth)

## Constructors

### constructor

• **new Synthesizer**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SynthesizerProps`](../interfaces/core.SynthesizerProps.md) |

#### Defined in

[src/core/synth.ts:34](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/synth.ts#L34)

## Properties

### outdir

• `Readonly` `Abstract` **outdir**: `string`

Path to the output directory. For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

#### Defined in

[src/core/synth.ts:33](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/synth.ts#L33)

___

### root

• `Readonly` `Abstract` **root**: `Construct`

Place in the construct tree where all users constructs will get added.

#### Defined in

[src/core/synth.ts:28](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/synth.ts#L28)

## Methods

### synth

▸ `Abstract` **synth**(): `void`

Synthesize the app.

#### Returns

`void`

#### Defined in

[src/core/synth.ts:40](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/synth.ts#L40)
