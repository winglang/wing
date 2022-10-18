[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / Function

# Class: Function

[cloud](../modules/cloud.md).Function

Represents a serverless function.

## Hierarchy

- [`FunctionBase`](cloud.FunctionBase.md)

  ↳ **`Function`**

## Table of contents

### Constructors

- [constructor](cloud.Function.md#constructor)

### Properties

- [node](cloud.Function.md#node)
- [stateful](cloud.Function.md#stateful)

### Methods

- [\_capture](cloud.Function.md#_capture)
- [addEnvironment](cloud.Function.md#addenvironment)
- [toString](cloud.Function.md#tostring)
- [isConstruct](cloud.Function.md#isconstruct)

## Constructors

### constructor

• **new Function**(`scope`, `id`, `inflight`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `inflight` | [`Inflight`](core.Inflight.md) |
| `props` | [`FunctionProps`](../interfaces/cloud.FunctionProps.md) |

#### Overrides

[FunctionBase](cloud.FunctionBase.md).[constructor](cloud.FunctionBase.md#constructor)

#### Defined in

[src/cloud/function.ts:54](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/function.ts#L54)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

[FunctionBase](cloud.FunctionBase.md).[node](cloud.FunctionBase.md#node)

#### Defined in

node_modules/constructs/lib/construct.d.ts:305

___

### stateful

• `Readonly` **stateful**: ``false``

Whether a resource is stateful, i.e. it stores information that is not
defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

#### Inherited from

[FunctionBase](cloud.FunctionBase.md).[stateful](cloud.FunctionBase.md#stateful)

#### Defined in

[src/cloud/function.ts:28](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/function.ts#L28)

## Methods

### \_capture

▸ **_capture**(`_captureScope`, `_metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_captureScope` | `IConstruct` |
| `_metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Overrides

[FunctionBase](cloud.FunctionBase.md).[_capture](cloud.FunctionBase.md#_capture)

#### Defined in

[src/cloud/function.ts:73](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/function.ts#L73)

___

### addEnvironment

▸ **addEnvironment**(`_key`, `_value`): `void`

Add an environment variable to the function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_key` | `string` |
| `_value` | `string` |

#### Returns

`void`

#### Overrides

[FunctionBase](cloud.FunctionBase.md).[addEnvironment](cloud.FunctionBase.md#addenvironment)

#### Defined in

[src/cloud/function.ts:77](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/function.ts#L77)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

[FunctionBase](cloud.FunctionBase.md).[toString](cloud.FunctionBase.md#tostring)

#### Defined in

node_modules/constructs/lib/construct.d.ts:319

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`Deprecated`**

use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

[FunctionBase](cloud.FunctionBase.md).[isConstruct](cloud.FunctionBase.md#isconstruct)

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
