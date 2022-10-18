[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / BucketBase

# Class: BucketBase

[cloud](../modules/cloud.md).BucketBase

Functionality shared between all `Bucket` implementations.

## Hierarchy

- [`Resource`](cloud.Resource.md)

  ↳ **`BucketBase`**

  ↳↳ [`Bucket`](tfaws.Bucket.md)

  ↳↳ [`Bucket`](cloud.Bucket.md)

  ↳↳ [`Bucket`](sim.Bucket.md)

## Table of contents

### Constructors

- [constructor](cloud.BucketBase.md#constructor)

### Properties

- [node](cloud.BucketBase.md#node)
- [stateful](cloud.BucketBase.md#stateful)

### Methods

- [\_capture](cloud.BucketBase.md#_capture)
- [toString](cloud.BucketBase.md#tostring)
- [isConstruct](cloud.BucketBase.md#isconstruct)

## Constructors

### constructor

• **new BucketBase**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`BucketProps`](../interfaces/cloud.BucketProps.md) |

#### Overrides

[Resource](cloud.Resource.md).[constructor](cloud.Resource.md#constructor)

#### Defined in

[src/cloud/bucket.ts:27](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/bucket.ts#L27)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

[Resource](cloud.Resource.md).[node](cloud.Resource.md#node)

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

#### Overrides

[Resource](cloud.Resource.md).[stateful](cloud.Resource.md#stateful)

#### Defined in

[src/cloud/bucket.ts:26](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/bucket.ts#L26)

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

#### Inherited from

[Resource](cloud.Resource.md).[_capture](cloud.Resource.md#_capture)

#### Defined in

[src/cloud/resource.ts:20](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/resource.ts#L20)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

[Resource](cloud.Resource.md).[toString](cloud.Resource.md#tostring)

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

[Resource](cloud.Resource.md).[isConstruct](cloud.Resource.md#isconstruct)

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
