[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / SynthesizerProps

# Interface: SynthesizerProps

[core](../modules/core.md).SynthesizerProps

Props for `Synth`.

## Table of contents

### Properties

- [customFactory](core.SynthesizerProps.md#customfactory)
- [outdir](core.SynthesizerProps.md#outdir)

## Properties

### customFactory

• `Optional` `Readonly` **customFactory**: `IPolyconFactory`

A custom factory to resolve polycons.

**`Default`**

- use the default polycon factory included in the Wing SDK

#### Defined in

[src/core/synth.ts:17](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/synth.ts#L17)

___

### outdir

• `Optional` `Readonly` **outdir**: `string`

The output directory into which to emit synthesized artifacts.

**`Default`**

"." (the current working directory)

#### Defined in

[src/core/synth.ts:12](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/synth.ts#L12)
