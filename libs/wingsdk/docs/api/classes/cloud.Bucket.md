[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / Bucket

# Class: Bucket

[cloud](../modules/cloud.md).Bucket

Represents a cloud object store.

## Hierarchy

- [`BucketBase`](cloud.BucketBase.md)

  ↳ **`Bucket`**

## Table of contents

### Constructors

- [constructor](cloud.Bucket.md#constructor)

### Properties

- [node](cloud.Bucket.md#node)
- [stateful](cloud.Bucket.md#stateful)

### Methods

- [\_capture](cloud.Bucket.md#_capture)
- [toString](cloud.Bucket.md#tostring)
- [isConstruct](cloud.Bucket.md#isconstruct)

## Constructors

### constructor

• **new Bucket**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`BucketProps`](../interfaces/cloud.BucketProps.md) |

#### Overrides

[BucketBase](cloud.BucketBase.md).[constructor](cloud.BucketBase.md#constructor)

#### Defined in

[src/cloud/bucket.ts:41](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/bucket.ts#L41)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

[BucketBase](cloud.BucketBase.md).[node](cloud.BucketBase.md#node)

#### Defined in

node_modules/constructs/lib/construct.d.ts:305

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

[src/cloud/bucket.ts:26](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/bucket.ts#L26)

## Methods

### \_capture

▸ **_capture**(`_captureScope`, `_metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_captureScope` | `IConstruct` |
| `_metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Overrides

[BucketBase](cloud.BucketBase.md).[_capture](cloud.BucketBase.md#_capture)

#### Defined in

[src/cloud/bucket.ts:49](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/bucket.ts#L49)

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
