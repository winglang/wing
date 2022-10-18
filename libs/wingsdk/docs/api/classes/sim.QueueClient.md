[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / QueueClient

# Class: QueueClient

[sim](../modules/sim.md).QueueClient

Inflight interface for `Queue`.

## Implements

- [`IQueueClient`](../interfaces/cloud.IQueueClient.md)

## Table of contents

### Constructors

- [constructor](sim.QueueClient.md#constructor)

### Properties

- [ws](sim.QueueClient.md#ws)

### Methods

- [push](sim.QueueClient.md#push)

## Constructors

### constructor

• **new QueueClient**(`queueAddr`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `queueAddr` | `number` |

#### Defined in

[src/sim/queue.inflight.ts:7](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.inflight.ts#L7)

## Properties

### ws

• `Private` `Readonly` **ws**: `WebSocket`

#### Defined in

[src/sim/queue.inflight.ts:6](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.inflight.ts#L6)

## Methods

### push

▸ **push**(`message`): `Promise`<`void`\>

Push a message to the queue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Payload to send to the queue. |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IQueueClient](../interfaces/cloud.IQueueClient.md).[push](../interfaces/cloud.IQueueClient.md#push)

#### Defined in

[src/sim/queue.inflight.ts:11](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/queue.inflight.ts#L11)
