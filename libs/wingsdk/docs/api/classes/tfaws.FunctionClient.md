[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / FunctionClient

# Class: FunctionClient

[tfaws](../modules/tfaws.md).FunctionClient

Inflight interface for `Function`.

## Implements

- [`IFunctionClient`](../interfaces/cloud.IFunctionClient.md)

## Table of contents

### Constructors

- [constructor](tfaws.FunctionClient.md#constructor)

### Properties

- [functionArn](tfaws.FunctionClient.md#functionarn)
- [lambdaClient](tfaws.FunctionClient.md#lambdaclient)

### Methods

- [invoke](tfaws.FunctionClient.md#invoke)

## Constructors

### constructor

• **new FunctionClient**(`functionArn`, `lambdaClient?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionArn` | `string` |
| `lambdaClient` | `LambdaClient` |

#### Defined in

[src/tf-aws/function.inflight.ts:6](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.inflight.ts#L6)

## Properties

### functionArn

• `Private` `Readonly` **functionArn**: `string`

#### Defined in

[src/tf-aws/function.inflight.ts:7](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.inflight.ts#L7)

___

### lambdaClient

• `Private` `Readonly` **lambdaClient**: `LambdaClient`

#### Defined in

[src/tf-aws/function.inflight.ts:8](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.inflight.ts#L8)

## Methods

### invoke

▸ **invoke**(`payload`): `Promise`<`string`\>

Invoke the function, passing the given payload as an argument.

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

[IFunctionClient](../interfaces/cloud.IFunctionClient.md).[invoke](../interfaces/cloud.IFunctionClient.md#invoke)

#### Defined in

[src/tf-aws/function.inflight.ts:14](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.inflight.ts#L14)
