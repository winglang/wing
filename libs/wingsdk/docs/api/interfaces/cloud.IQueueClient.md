[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / IQueueClient

# Interface: IQueueClient

[cloud](../modules/cloud.md).IQueueClient

Inflight interface for `Queue`.

## Implemented by

- [`QueueClient`](../classes/tfaws.QueueClient.md)
- [`QueueClient`](../classes/sim.QueueClient.md)

## Table of contents

### Methods

- [push](cloud.IQueueClient.md#push)

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

#### Defined in

[src/cloud/queue.ts:97](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/queue.ts#L97)
