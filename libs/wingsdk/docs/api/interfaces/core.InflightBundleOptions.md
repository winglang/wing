[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / InflightBundleOptions

# Interface: InflightBundleOptions

[core](../modules/core.md).InflightBundleOptions

Options for `Inflight.bundle`.

## Table of contents

### Properties

- [captureClients](core.InflightBundleOptions.md#captureclients)
- [captureScope](core.InflightBundleOptions.md#capturescope)
- [external](core.InflightBundleOptions.md#external)

## Properties

### captureClients

• `Readonly` **captureClients**: `Record`<`string`, [`Code`](../classes/core.Code.md)\>

A map of capture clients that can be bundled with the Inflight's code.

#### Defined in

[src/core/inflight.ts:268](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L268)

___

### captureScope

• `Optional` `Readonly` **captureScope**: `IConstruct`

Associate the inflight bundle with a given capture scope.

#### Defined in

[src/core/inflight.ts:264](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L264)

___

### external

• `Optional` `Readonly` **external**: `string`[]

List of dependencies to exclude from the bundle.

#### Defined in

[src/core/inflight.ts:272](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L272)
