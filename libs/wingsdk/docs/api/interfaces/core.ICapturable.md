[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / ICapturable

# Interface: ICapturable

[core](../modules/core.md).ICapturable

Represents something that is capturable by an Inflight.

## Hierarchy

- **`ICapturable`**

  ↳ [`ICapturableConstruct`](core.ICapturableConstruct.md)

## Implemented by

- [`Resource`](../classes/cloud.Resource.md)

## Table of contents

### Methods

- [\_capture](core.ICapturable.md#_capture)

## Methods

### \_capture

▸ **_capture**(`captureScope`, `metadata`): [`Code`](../classes/core.Code.md)

Captures the resource so that it can be referenced inside an Inflight
executed in the given scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `metadata` | [`CaptureMetadata`](core.CaptureMetadata.md) |

#### Returns

[`Code`](../classes/core.Code.md)

#### Defined in

[src/core/inflight.ts:46](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L46)
