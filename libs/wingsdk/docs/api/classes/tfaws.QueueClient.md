[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / QueueClient

# Class: QueueClient

[tfaws](../modules/tfaws.md).QueueClient

Inflight interface for `Queue`.

## Implements

- [`IQueueClient`](../interfaces/cloud.IQueueClient.md)

## Table of contents

### Constructors

- [constructor](tfaws.QueueClient.md#constructor)

### Properties

- [client](tfaws.QueueClient.md#client)
- [queueUrl](tfaws.QueueClient.md#queueurl)

### Methods

- [push](tfaws.QueueClient.md#push)

## Constructors

### constructor

• **new QueueClient**(`queueUrl`, `client?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `queueUrl` | `string` |
| `client` | `SQSClient` |

#### Defined in

[src/tf-aws/queue.inflight.ts:5](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/queue.inflight.ts#L5)

## Properties

### client

• `Private` `Readonly` **client**: `SQSClient`

#### Defined in

[src/tf-aws/queue.inflight.ts:7](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/queue.inflight.ts#L7)

___

### queueUrl

• `Private` `Readonly` **queueUrl**: `string`

#### Defined in

[src/tf-aws/queue.inflight.ts:6](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/queue.inflight.ts#L6)

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

[src/tf-aws/queue.inflight.ts:10](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/queue.inflight.ts#L10)
