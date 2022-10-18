[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / QueueProps

# Interface: QueueProps

[cloud](../modules/cloud.md).QueueProps

Properties for `Queue`.

## Table of contents

### Properties

- [initialMessages](cloud.QueueProps.md#initialmessages)
- [timeout](cloud.QueueProps.md#timeout)

## Properties

### initialMessages

• `Optional` `Readonly` **initialMessages**: `string`[]

Initialize the queue with a set of messages.

**`Default`**

[]

#### Defined in

[src/cloud/queue.ts:26](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L26)

___

### timeout

• `Optional` `Readonly` **timeout**: [`Duration`](../classes/core.Duration.md)

How long a queue's consumers have to process a message.

**`Default`**

Duration.fromSeconds(10)

#### Defined in

[src/cloud/queue.ts:20](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L20)
