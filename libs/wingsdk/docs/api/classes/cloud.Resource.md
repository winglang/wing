[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / Resource

# Class: Resource

[cloud](../modules/cloud.md).Resource

Shared behavior between all Wing SDK resources.

## Hierarchy

- `Construct`

  ↳ **`Resource`**

  ↳↳ [`BucketBase`](cloud.BucketBase.md)

  ↳↳ [`FunctionBase`](cloud.FunctionBase.md)

  ↳↳ [`QueueBase`](cloud.QueueBase.md)

## Implements

- [`ICapturable`](../interfaces/core.ICapturable.md)

## Table of contents

### Constructors

- [constructor](cloud.Resource.md#constructor)

### Properties

- [node](cloud.Resource.md#node)
- [stateful](cloud.Resource.md#stateful)

### Methods

- [\_capture](cloud.Resource.md#_capture)
- [toString](cloud.Resource.md#tostring)
- [isConstruct](cloud.Resource.md#isconstruct)

## Constructors

### constructor

• **new Resource**(`scope`, `id`)

Creates a new construct node.

**`Stability`**

stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | The scope in which to define this construct. |
| `id` | `string` | The scoped construct ID. |

#### Inherited from

Construct.constructor

#### Defined in

node_modules/constructs/lib/construct.d.ts:313

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

### stateful

• `Readonly` `Abstract` **stateful**: `boolean`

Whether a resource is stateful, i.e. it stores information that is not
defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

#### Defined in

[src/cloud/resource.ts:16](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/resource.ts#L16)

## Methods

### \_capture

▸ `Abstract` **_capture**(`captureScope`, `metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Implementation of

[ICapturable](../interfaces/core.ICapturable.md).[_capture](../interfaces/core.ICapturable.md#_capture)

#### Defined in

[src/cloud/resource.ts:20](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/resource.ts#L20)

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
