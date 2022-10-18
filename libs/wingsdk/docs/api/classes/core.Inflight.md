[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / Inflight

# Class: Inflight

[core](../modules/core.md).Inflight

Represents a unit of application code that can be executed by a cloud
resource.

## Table of contents

### Constructors

- [constructor](core.Inflight.md#constructor)

### Properties

- [captures](core.Inflight.md#captures)
- [code](core.Inflight.md#code)
- [entrypoint](core.Inflight.md#entrypoint)

### Methods

- [bundle](core.Inflight.md#bundle)
- [makeClients](core.Inflight.md#makeclients)

## Constructors

### constructor

• **new Inflight**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`InflightProps`](../interfaces/core.InflightProps.md) |

#### Defined in

[src/core/inflight.ts:171](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L171)

## Properties

### captures

• `Readonly` **captures**: `Object`

Capture information. During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

#### Index signature

▪ [name: `string`]: [`Capture`](../interfaces/core.Capture.md)

#### Defined in

[src/core/inflight.ts:169](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L169)

___

### code

• `Readonly` **code**: [`Code`](core.Code.md)

Reference to code containing the entrypoint function.

#### Defined in

[src/core/inflight.ts:156](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L156)

___

### entrypoint

• `Readonly` **entrypoint**: `string`

Name of the exported function which will be run.

#### Defined in

[src/core/inflight.ts:161](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L161)

## Methods

### bundle

▸ **bundle**(`options`): [`Code`](core.Code.md)

Bundle this inflight process so that it can be used in the given capture
scope.

Returns the path to a JavaScript file that has been rewritten to include
all dependencies and captured values or clients. The file is isolated in
its own directory so that it can be zipped up and uploaded to cloud
providers.

High level implementation:
1. Read the file (let's say its path is path/to/foo.js)
2. Create a new javascript file named path/to/foo.prebundle.js, including a
   map of all capture clients, a new handler that calls the original
   handler with the clients passed in, and a copy of the user's code from
   path/to/foo.js.
3. Use esbuild to bundle all dependencies, outputting the result to
   path/to/foo.js.bundle/index.js.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`InflightBundleOptions`](../interfaces/core.InflightBundleOptions.md) |

#### Returns

[`Code`](core.Code.md)

#### Defined in

[src/core/inflight.ts:195](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L195)

___

### makeClients

▸ **makeClients**(`captureScope`): `Record`<`string`, [`Code`](core.Code.md)\>

Resolve this inflight's captured objects into a map of clients that be
safely referenced at runtime.

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |

#### Returns

`Record`<`string`, [`Code`](core.Code.md)\>

#### Defined in

[src/core/inflight.ts:248](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L248)
