[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / QueueSubscriber

# Interface: QueueSubscriber

[sim](../modules/sim.md).QueueSubscriber

Schema for cloud.Queue.props.subscribers

## Table of contents

### Properties

- [batchSize](sim.QueueSubscriber.md#batchsize)
- [functionId](sim.QueueSubscriber.md#functionid)

## Properties

### batchSize

• `Readonly` **batchSize**: `number`

Maximum number of messages that will be batched together to the subscriber.

#### Defined in

[src/sim/schema-resources.ts:45](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L45)

___

### functionId

• `Readonly` **functionId**: `string`

Function ID that should be called.

#### Defined in

[src/sim/schema-resources.ts:43](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L43)
