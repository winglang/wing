[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / InflightProps

# Interface: InflightProps

[core](../modules/core.md).InflightProps

Options for `Inflight`.

## Table of contents

### Properties

- [captures](core.InflightProps.md#captures)
- [code](core.InflightProps.md#code)
- [entrypoint](core.InflightProps.md#entrypoint)

## Properties

### captures

• `Optional` `Readonly` **captures**: `Object`

Capture information. During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

**`Default`**

- No captures

#### Index signature

▪ [name: `string`]: [`Capture`](core.Capture.md)

#### Defined in

[src/core/inflight.ts:145](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L145)

___

### code

• `Readonly` **code**: [`Code`](../classes/core.Code.md)

Reference to code containing the entrypoint function.

#### Defined in

[src/core/inflight.ts:129](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L129)

___

### entrypoint

• `Readonly` **entrypoint**: `string`

Name of the exported function to run.

**`Example`**

```ts
"exports.handler"
```

#### Defined in

[src/core/inflight.ts:136](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L136)
