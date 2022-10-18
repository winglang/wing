[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / QueueOnMessageProps

# Interface: QueueOnMessageProps

[cloud](../modules/cloud.md).QueueOnMessageProps

Options for Queue.onMessage.

## Hierarchy

- [`FunctionProps`](cloud.FunctionProps.md)

  ↳ **`QueueOnMessageProps`**

## Table of contents

### Properties

- [batchSize](cloud.QueueOnMessageProps.md#batchsize)
- [env](cloud.QueueOnMessageProps.md#env)

## Properties

### batchSize

• `Optional` `Readonly` **batchSize**: `number`

The maximum number of messages to send to subscribers at once.

**`Default`**

1

#### Defined in

[src/cloud/queue.ts:60](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/queue.ts#L60)

___

### env

• `Optional` `Readonly` **env**: `Object`

Environment variables to pass to the function.

**`Default`**

- No environment variables.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[FunctionProps](cloud.FunctionProps.md).[env](cloud.FunctionProps.md#env)

#### Defined in

[src/cloud/function.ts:21](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/function.ts#L21)
