[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / FunctionProps

# Interface: FunctionProps

[cloud](../modules/cloud.md).FunctionProps

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

## Hierarchy

- **`FunctionProps`**

  ↳ [`QueueOnMessageProps`](cloud.QueueOnMessageProps.md)

## Table of contents

### Properties

- [env](cloud.FunctionProps.md#env)

## Properties

### env

• `Optional` `Readonly` **env**: `Object`

Environment variables to pass to the function.

**`Default`**

- No environment variables.

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/cloud/function.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/function.ts#L21)
