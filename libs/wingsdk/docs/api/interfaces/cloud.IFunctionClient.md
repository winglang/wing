[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / IFunctionClient

# Interface: IFunctionClient

[cloud](../modules/cloud.md).IFunctionClient

Inflight interface for `Function`.

## Implemented by

- [`FunctionClient`](../classes/tfaws.FunctionClient.md)
- [`FunctionClient`](../classes/sim.FunctionClient.md)

## Table of contents

### Methods

- [invoke](cloud.IFunctionClient.md#invoke)

## Methods

### invoke

▸ **invoke**(`payload`): `Promise`<`string`\>

Invoke the function asynchronously with a given payload.

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/cloud/function.ts:89](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/function.ts#L89)
