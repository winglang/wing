[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / Queue

# Class: Queue

[cloud](../modules/cloud.md).Queue

Represents a serverless queue.

## Hierarchy

- [`QueueBase`](cloud.QueueBase.md)

  ↳ **`Queue`**

## Table of contents

### Constructors

- [constructor](cloud.Queue.md#constructor)

### Properties

- [node](cloud.Queue.md#node)
- [stateful](cloud.Queue.md#stateful)

### Methods

- [\_capture](cloud.Queue.md#_capture)
- [onMessage](cloud.Queue.md#onmessage)
- [toString](cloud.Queue.md#tostring)
- [isConstruct](cloud.Queue.md#isconstruct)

## Constructors

### constructor

• **new Queue**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`QueueProps`](../interfaces/cloud.QueueProps.md) |

#### Overrides

[QueueBase](cloud.QueueBase.md).[constructor](cloud.QueueBase.md#constructor)

#### Defined in

[src/cloud/queue.ts:67](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/queue.ts#L67)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

[QueueBase](cloud.QueueBase.md).[node](cloud.QueueBase.md#node)

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

[QueueBase](cloud.QueueBase.md).[stateful](cloud.QueueBase.md#stateful)

#### Defined in

[src/cloud/queue.ts:33](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/queue.ts#L33)

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

[QueueBase](cloud.QueueBase.md).[_capture](cloud.QueueBase.md#_capture)

#### Defined in

[src/cloud/queue.ts:75](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/queue.ts#L75)

___

### onMessage

▸ **onMessage**(`inflight`, `props?`): [`Function`](cloud.Function.md)

Create a function to consume messages from this queue.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inflight` | [`Inflight`](core.Inflight.md) |
| `props` | [`QueueOnMessageProps`](../interfaces/cloud.QueueOnMessageProps.md) |

#### Returns

[`Function`](cloud.Function.md)

#### Overrides

[QueueBase](cloud.QueueBase.md).[onMessage](cloud.QueueBase.md#onmessage)

#### Defined in

[src/cloud/queue.ts:79](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/queue.ts#L79)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

[QueueBase](cloud.QueueBase.md).[toString](cloud.QueueBase.md#tostring)

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

[QueueBase](cloud.QueueBase.md).[isConstruct](cloud.QueueBase.md#isconstruct)

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
