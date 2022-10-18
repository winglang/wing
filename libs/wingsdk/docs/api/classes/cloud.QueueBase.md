[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / QueueBase

# Class: QueueBase

[cloud](../modules/cloud.md).QueueBase

Functionality shared between all `Queue` implementations.

## Hierarchy

- [`Resource`](cloud.Resource.md)

  ↳ **`QueueBase`**

  ↳↳ [`Queue`](tfaws.Queue.md)

  ↳↳ [`Queue`](cloud.Queue.md)

  ↳↳ [`Queue`](sim.Queue.md)

## Table of contents

### Constructors

- [constructor](cloud.QueueBase.md#constructor)

### Properties

- [node](cloud.QueueBase.md#node)
- [stateful](cloud.QueueBase.md#stateful)

### Methods

- [\_capture](cloud.QueueBase.md#_capture)
- [onMessage](cloud.QueueBase.md#onmessage)
- [toString](cloud.QueueBase.md#tostring)
- [isConstruct](cloud.QueueBase.md#isconstruct)

## Constructors

### constructor

• **new QueueBase**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`QueueProps`](../interfaces/cloud.QueueProps.md) |

#### Overrides

[Resource](cloud.Resource.md).[constructor](cloud.Resource.md#constructor)

#### Defined in

[src/cloud/queue.ts:34](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L34)

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

[src/cloud/queue.ts:33](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L33)

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

[src/cloud/resource.ts:20](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/resource.ts#L20)

___

### onMessage

▸ `Abstract` **onMessage**(`inflight`, `props?`): [`Function`](cloud.Function.md)

Create a function to consume messages from this queue.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inflight` | [`Inflight`](core.Inflight.md) |
| `props?` | [`QueueOnMessageProps`](../interfaces/cloud.QueueOnMessageProps.md) |

#### Returns

[`Function`](cloud.Function.md)

#### Defined in

[src/cloud/queue.ts:46](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L46)

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
