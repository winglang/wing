[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / ICapturableConstruct

# Interface: ICapturableConstruct

[core](../modules/core.md).ICapturableConstruct

Represents a construct that is capturable by an Inflight.

## Hierarchy

- [`ICapturable`](core.ICapturable.md)

- `IConstruct`

  ↳ **`ICapturableConstruct`**

## Table of contents

### Properties

- [node](core.ICapturableConstruct.md#node)

### Methods

- [\_capture](core.ICapturableConstruct.md#_capture)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

IConstruct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:14

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

#### Inherited from

[ICapturable](core.ICapturable.md).[_capture](core.ICapturable.md#_capture)

#### Defined in

[src/core/inflight.ts:46](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L46)
