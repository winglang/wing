[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / App

# Class: App

[core](../modules/core.md).App

The root construct for all Wing applications.

## Hierarchy

- `Construct`

  ↳ **`App`**

## Table of contents

### Constructors

- [constructor](core.App.md#constructor)

### Properties

- [node](core.App.md#node)
- [outdir](core.App.md#outdir)
- [root](core.App.md#root)
- [stateFile](core.App.md#statefile)
- [synthesizer](core.App.md#synthesizer)

### Methods

- [readStateFile](core.App.md#readstatefile)
- [saveStateFile](core.App.md#savestatefile)
- [synth](core.App.md#synth)
- [toString](core.App.md#tostring)
- [isConstruct](core.App.md#isconstruct)

## Constructors

### constructor

• **new App**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AppProps`](../interfaces/core.AppProps.md) |

#### Overrides

Construct.constructor

#### Defined in

[src/core/app.ts:54](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L54)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:305

___

### outdir

• `Readonly` **outdir**: `string`

Directory where all artifacts will be synthesized to.

#### Defined in

[src/core/app.ts:43](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L43)

___

### root

• `Readonly` **root**: `Construct`

The root construct which all constructs should be added to. This is
exposed for compatibility with different CDK frameworks that require
creating their own `App` construct with a different root.

#### Defined in

[src/core/app.ts:50](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L50)

___

### stateFile

• `Optional` `Readonly` **stateFile**: `string`

The path to a state file which will track all synthesized files.

#### Defined in

[src/core/app.ts:38](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L38)

___

### synthesizer

• `Private` `Readonly` **synthesizer**: [`Synthesizer`](core.Synthesizer.md)

#### Defined in

[src/core/app.ts:52](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L52)

## Methods

### readStateFile

▸ `Private` **readStateFile**(): `Set`<`string`\>

If a state file is defined, reads it and returns the list of files that
this app manages.

#### Returns

`Set`<`string`\>

#### Defined in

[src/core/app.ts:98](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L98)

___

### saveStateFile

▸ `Private` **saveStateFile**(`files`): `void`

If a state file is defined, stores the list of files under management in that file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `Set`<`string`\> | List of file paths (relative) |

#### Returns

`void`

#### Defined in

[src/core/app.ts:114](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L114)

___

### synth

▸ **synth**(): `void`

Synthesize the app into the output directory. The artifact produced
depends on what synthesizer was used.

#### Returns

`void`

#### Defined in

[src/core/app.ts:72](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/app.ts#L72)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:319

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`Deprecated`**

use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
