[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / Bucket

# Class: Bucket

[sim](../modules/sim.md).Bucket

Simulator implementation of `cloud.Bucket`.

## Hierarchy

- [`BucketBase`](cloud.BucketBase.md)

  ↳ **`Bucket`**

## Implements

- [`IResource`](../interfaces/sim.IResource.md)

## Table of contents

### Constructors

- [constructor](sim.Bucket.md#constructor)

### Properties

- [callees](sim.Bucket.md#callees)
- [callers](sim.Bucket.md#callers)
- [node](sim.Bucket.md#node)
- [public](sim.Bucket.md#public)
- [stateful](sim.Bucket.md#stateful)

### Accessors

- [addr](sim.Bucket.md#addr)

### Methods

- [\_capture](sim.Bucket.md#_capture)
- [\_toResourceSchema](sim.Bucket.md#_toresourceschema)
- [toString](sim.Bucket.md#tostring)
- [isConstruct](sim.Bucket.md#isconstruct)

## Constructors

### constructor

• **new Bucket**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`BucketProps`](../interfaces/cloud.BucketProps.md) |

#### Overrides

[BucketBase](cloud.BucketBase.md).[constructor](cloud.BucketBase.md#constructor)

#### Defined in

[src/sim/bucket.ts:16](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L16)

## Properties

### callees

• `Private` `Readonly` **callees**: `string`[]

#### Defined in

[src/sim/bucket.ts:15](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L15)

___

### callers

• `Private` `Readonly` **callers**: `string`[]

#### Defined in

[src/sim/bucket.ts:14](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L14)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Implementation of

[IResource](../interfaces/sim.IResource.md).[node](../interfaces/sim.IResource.md#node)

#### Inherited from

[BucketBase](cloud.BucketBase.md).[node](cloud.BucketBase.md#node)

#### Defined in

node_modules/constructs/lib/construct.d.ts:305

___

### public

• `Private` `Readonly` **public**: `boolean`

#### Defined in

[src/sim/bucket.ts:13](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L13)

___

### stateful

• `Readonly` **stateful**: ``true``

Whether a resource is stateful, i.e. it stores information that is not
defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

#### Inherited from

[BucketBase](cloud.BucketBase.md).[stateful](cloud.BucketBase.md#stateful)

#### Defined in

[src/cloud/bucket.ts:26](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/bucket.ts#L26)

## Accessors

### addr

• `Private` `get` **addr**(): `string`

#### Returns

`string`

#### Defined in

[src/sim/bucket.ts:35](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L35)

## Methods

### \_capture

▸ **_capture**(`captureScope`, `_metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `_metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Overrides

[BucketBase](cloud.BucketBase.md).[_capture](cloud.BucketBase.md#_capture)

#### Defined in

[src/sim/bucket.ts:42](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L42)

___

### \_toResourceSchema

▸ **_toResourceSchema**(): [`BucketSchema`](../interfaces/sim.BucketSchema.md)

#### Returns

[`BucketSchema`](../interfaces/sim.BucketSchema.md)

#### Implementation of

[IResource](../interfaces/sim.IResource.md).[_toResourceSchema](../interfaces/sim.IResource.md#_toresourceschema)

#### Defined in

[src/sim/bucket.ts:23](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.ts#L23)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

[BucketBase](cloud.BucketBase.md).[toString](cloud.BucketBase.md#tostring)

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

[BucketBase](cloud.BucketBase.md).[isConstruct](cloud.BucketBase.md#isconstruct)

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
