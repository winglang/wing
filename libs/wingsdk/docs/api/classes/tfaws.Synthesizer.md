[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / Synthesizer

# Class: Synthesizer

[tfaws](../modules/tfaws.md).Synthesizer

CDK for Terraform synthesizer.

## Hierarchy

- [`Synthesizer`](core.Synthesizer.md)

  ↳ **`Synthesizer`**

## Table of contents

### Constructors

- [constructor](tfaws.Synthesizer.md#constructor)

### Properties

- [app](tfaws.Synthesizer.md#app)
- [outdir](tfaws.Synthesizer.md#outdir)
- [root](tfaws.Synthesizer.md#root)

### Methods

- [synth](tfaws.Synthesizer.md#synth)

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

[src/tf-aws/synth.ts:17](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/synth.ts#L17)

## Properties

### app

• `Private` `Readonly` **app**: `App`

#### Defined in

[src/tf-aws/synth.ts:15](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/synth.ts#L15)

___

### outdir

• `Readonly` **outdir**: `string`

Path to the output directory. For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

#### Overrides

[Synthesizer](core.Synthesizer.md).[outdir](core.Synthesizer.md#outdir)

#### Defined in

[src/tf-aws/synth.ts:13](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/synth.ts#L13)

___

### root

• `Readonly` **root**: `Construct`

Place in the construct tree where all users constructs will get added.

#### Overrides

[Synthesizer](core.Synthesizer.md).[root](core.Synthesizer.md#root)

#### Defined in

[src/tf-aws/synth.ts:14](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/synth.ts#L14)

## Methods

### synth

▸ **synth**(): `void`

Synthesize the app.

#### Returns

`void`

#### Overrides

[Synthesizer](core.Synthesizer.md).[synth](core.Synthesizer.md#synth)

#### Defined in

[src/tf-aws/synth.ts:26](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/synth.ts#L26)
