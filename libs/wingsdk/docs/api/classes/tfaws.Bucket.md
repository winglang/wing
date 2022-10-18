[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / Bucket

# Class: Bucket

[tfaws](../modules/tfaws.md).Bucket

AWS implementation of `cloud.Bucket`.

## Hierarchy

- [`BucketBase`](cloud.BucketBase.md)

  ↳ **`Bucket`**

## Table of contents

### Constructors

- [constructor](tfaws.Bucket.md#constructor)

### Properties

- [bucket](tfaws.Bucket.md#bucket)
- [node](tfaws.Bucket.md#node)
- [public](tfaws.Bucket.md#public)
- [stateful](tfaws.Bucket.md#stateful)

### Methods

- [\_capture](tfaws.Bucket.md#_capture)
- [toString](tfaws.Bucket.md#tostring)
- [isConstruct](tfaws.Bucket.md#isconstruct)

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

[src/tf-aws/bucket.ts:15](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/bucket.ts#L15)

## Properties

### bucket

• `Private` `Readonly` **bucket**: `S3Bucket`

#### Defined in

[src/tf-aws/bucket.ts:12](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/bucket.ts#L12)

___

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

### public

• `Private` `Readonly` **public**: `boolean`

#### Defined in

[src/tf-aws/bucket.ts:13](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/bucket.ts#L13)

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

## Methods

### \_capture

▸ **_capture**(`captureScope`, `metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Overrides

[BucketBase](cloud.BucketBase.md).[_capture](cloud.BucketBase.md#_capture)

#### Defined in

[src/tf-aws/bucket.ts:64](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/bucket.ts#L64)

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
