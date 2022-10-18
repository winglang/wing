[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / Capture

# Interface: Capture

[core](../modules/core.md).Capture

Capture information. A capture is a reference from an Inflight to a
construction-time resource or value. Either the "resource" or "value" field
will be set, but not both.

## Hierarchy

- [`CaptureMetadata`](core.CaptureMetadata.md)

  ↳ **`Capture`**

## Table of contents

### Properties

- [methods](core.Capture.md#methods)
- [resource](core.Capture.md#resource)
- [value](core.Capture.md#value)

## Properties

### methods

• `Optional` `Readonly` **methods**: `string`[]

Which methods are called on the captured resource.

#### Inherited from

[CaptureMetadata](core.CaptureMetadata.md).[methods](core.CaptureMetadata.md#methods)

#### Defined in

[src/core/inflight.ts:33](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L33)

___

### resource

• `Optional` `Readonly` **resource**: [`ICapturableConstruct`](core.ICapturableConstruct.md)

A captured resource

#### Defined in

[src/core/inflight.ts:18](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L18)

___

### value

• `Optional` `Readonly` **value**: `any`

A captured immutable value (like string, number, boolean, a struct, or null).

#### Defined in

[src/core/inflight.ts:23](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L23)
