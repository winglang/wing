[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / Queue

# Class: Queue

[sim](../modules/sim.md).Queue

Simulator implementation of `cloud.Queue`.

## Hierarchy

- [`QueueBase`](cloud.QueueBase.md)

  ↳ **`Queue`**

## Implements

- [`IResource`](../interfaces/sim.IResource.md)

## Table of contents

### Constructors

- [constructor](sim.Queue.md#constructor)

### Properties

- [callees](sim.Queue.md#callees)
- [callers](sim.Queue.md#callers)
- [initialMessages](sim.Queue.md#initialmessages)
- [node](sim.Queue.md#node)
- [stateful](sim.Queue.md#stateful)
- [subscribers](sim.Queue.md#subscribers)
- [timeout](sim.Queue.md#timeout)

### Accessors

- [addr](sim.Queue.md#addr)

### Methods

- [\_capture](sim.Queue.md#_capture)
- [\_toResourceSchema](sim.Queue.md#_toresourceschema)
- [onMessage](sim.Queue.md#onmessage)
- [toString](sim.Queue.md#tostring)
- [isConstruct](sim.Queue.md#isconstruct)

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

[src/sim/queue.ts:17](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L17)

## Properties

### callees

• `Private` `Readonly` **callees**: `string`[]

#### Defined in

[src/sim/queue.ts:13](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L13)

___

### callers

• `Private` `Readonly` **callers**: `string`[]

#### Defined in

[src/sim/queue.ts:12](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L12)

___

### initialMessages

• `Private` `Readonly` **initialMessages**: `string`[] = `[]`

#### Defined in

[src/sim/queue.ts:16](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L16)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Implementation of

[IResource](../interfaces/sim.IResource.md).[node](../interfaces/sim.IResource.md#node)

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

[src/cloud/queue.ts:33](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L33)

___

### subscribers

• `Private` `Readonly` **subscribers**: [`QueueSubscriber`](../interfaces/sim.QueueSubscriber.md)[]

#### Defined in

[src/sim/queue.ts:15](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L15)

___

### timeout

• `Private` `Readonly` **timeout**: [`Duration`](core.Duration.md)

#### Defined in

[src/sim/queue.ts:14](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L14)

## Accessors

### addr

• `Private` `get` **addr**(): `string`

#### Returns

`string`

#### Defined in

[src/sim/queue.ts:82](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L82)

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

[QueueBase](cloud.QueueBase.md).[_capture](cloud.QueueBase.md#_capture)

#### Defined in

[src/sim/queue.ts:89](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L89)

___

### \_toResourceSchema

▸ **_toResourceSchema**(): [`QueueSchema`](../interfaces/sim.QueueSchema.md)

#### Returns

[`QueueSchema`](../interfaces/sim.QueueSchema.md)

#### Implementation of

[IResource](../interfaces/sim.IResource.md).[_toResourceSchema](../interfaces/sim.IResource.md#_toresourceschema)

#### Defined in

[src/sim/queue.ts:68](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L68)

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

[src/sim/queue.ts:25](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.ts#L25)

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
