[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / InflightClient

# Class: InflightClient

[core](../modules/core.md).InflightClient

Utility class with functions about inflight clients.

## Table of contents

### Constructors

- [constructor](core.InflightClient.md#constructor)

### Methods

- [for](core.InflightClient.md#for)

## Constructors

### constructor

• `Private` **new InflightClient**()

#### Defined in

[src/core/inflight.ts:317](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L317)

## Methods

### for

▸ `Static` **for**(`filename`, `clientClass`, `args`): [`Code`](core.Code.md)

Creates a `Code` instance with code for creating an inflight client.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filename` | `string` |
| `clientClass` | `string` |
| `args` | `string`[] |

#### Returns

[`Code`](core.Code.md)

#### Defined in

[src/core/inflight.ts:304](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L304)
