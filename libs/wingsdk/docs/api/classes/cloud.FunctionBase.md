[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / FunctionBase

# Class: FunctionBase

[cloud](../modules/cloud.md).FunctionBase

Functionality shared between all `Function` implementations.

## Hierarchy

- [`Resource`](cloud.Resource.md)

  ↳ **`FunctionBase`**

  ↳↳ [`Function`](tfaws.Function.md)

  ↳↳ [`Function`](cloud.Function.md)

  ↳↳ [`Function`](sim.Function.md)

## Table of contents

### Constructors

- [constructor](cloud.FunctionBase.md#constructor)

### Properties

- [node](cloud.FunctionBase.md#node)
- [stateful](cloud.FunctionBase.md#stateful)

### Methods

- [\_capture](cloud.FunctionBase.md#_capture)
- [addEnvironment](cloud.FunctionBase.md#addenvironment)
- [toString](cloud.FunctionBase.md#tostring)
- [isConstruct](cloud.FunctionBase.md#isconstruct)

## Constructors

### constructor

• **new FunctionBase**(`scope`, `id`, `inflight`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `inflight` | [`Inflight`](core.Inflight.md) |
| `props` | [`FunctionProps`](../interfaces/cloud.FunctionProps.md) |

#### Overrides

[Resource](cloud.Resource.md).[constructor](cloud.Resource.md#constructor)

#### Defined in

[src/cloud/function.ts:29](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/function.ts#L29)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

[Resource](cloud.Resource.md).[node](cloud.Resource.md#node)

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

#### Overrides

[Resource](cloud.Resource.md).[stateful](cloud.Resource.md#stateful)

#### Defined in

[src/cloud/function.ts:28](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/function.ts#L28)

## Methods

### \_capture

▸ `Abstract` **_capture**(`captureScope`, `metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Inherited from

[Resource](cloud.Resource.md).[_capture](cloud.Resource.md#_capture)

#### Defined in

[src/cloud/resource.ts:20](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/resource.ts#L20)

___

### addEnvironment

▸ `Abstract` **addEnvironment**(`key`, `value`): `void`

Add an environment variable to the function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/cloud/function.ts:47](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/cloud/function.ts#L47)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

[Resource](cloud.Resource.md).[toString](cloud.Resource.md#tostring)

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

[Resource](cloud.Resource.md).[isConstruct](cloud.Resource.md#isconstruct)

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
