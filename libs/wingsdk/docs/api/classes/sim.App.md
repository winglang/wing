[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / App

# Class: App

[sim](../modules/sim.md).App

A construct that knows how to synthesize simulator resources into a
Wing simulator (.wx) file.

## Hierarchy

- `Construct`

  ↳ **`App`**

## Table of contents

### Constructors

- [constructor](sim.App.md#constructor)

### Properties

- [node](sim.App.md#node)
- [outdir](sim.App.md#outdir)

### Methods

- [synth](sim.App.md#synth)
- [toString](sim.App.md#tostring)
- [isConstruct](sim.App.md#isconstruct)

## Constructors

### constructor

• **new App**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AppProps`](../interfaces/sim.AppProps.md) |

#### Overrides

Construct.constructor

#### Defined in

[src/sim/app.ts:30](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/app.ts#L30)

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

• `Private` `Readonly` **outdir**: `string`

Directory where artifacts are synthesized to.

#### Defined in

[src/sim/app.ts:29](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/app.ts#L29)

## Methods

### synth

▸ **synth**(): `void`

Synthesize the app into an `app.wx` file.

#### Returns

`void`

#### Defined in

[src/sim/app.ts:38](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/app.ts#L38)

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
