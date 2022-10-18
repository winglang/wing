[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / Function

# Class: Function

[sim](../modules/sim.md).Function

Simulator implementation of `cloud.Function`.

## Hierarchy

- [`FunctionBase`](cloud.FunctionBase.md)

  ↳ **`Function`**

## Implements

- [`IResource`](../interfaces/sim.IResource.md)

## Table of contents

### Constructors

- [constructor](sim.Function.md#constructor)

### Properties

- [callees](sim.Function.md#callees)
- [callers](sim.Function.md#callers)
- [code](sim.Function.md#code)
- [env](sim.Function.md#env)
- [node](sim.Function.md#node)
- [stateful](sim.Function.md#stateful)

### Accessors

- [addr](sim.Function.md#addr)

### Methods

- [\_addCallers](sim.Function.md#_addcallers)
- [\_capture](sim.Function.md#_capture)
- [\_toResourceSchema](sim.Function.md#_toresourceschema)
- [addEnvironment](sim.Function.md#addenvironment)
- [toString](sim.Function.md#tostring)
- [isConstruct](sim.Function.md#isconstruct)

## Constructors

### constructor

• **new Function**(`scope`, `id`, `inflight`, `props`)

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

[src/sim/function.ts:25](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L25)

## Properties

### callees

• `Private` `Readonly` **callees**: `string`[]

#### Defined in

[src/sim/function.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L21)

___

### callers

• `Private` `Readonly` **callers**: `string`[]

#### Defined in

[src/sim/function.ts:20](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L20)

___

### code

• `Private` `Readonly` **code**: [`Code`](core.Code.md)

#### Defined in

[src/sim/function.ts:23](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L23)

___

### env

• `Private` `Readonly` **env**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/sim/function.ts:22](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L22)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Implementation of

[IResource](../interfaces/sim.IResource.md).[node](../interfaces/sim.IResource.md#node)

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

## Accessors

### addr

• `Private` `get` **addr**(): `string`

#### Returns

`string`

#### Defined in

[src/sim/function.ts:57](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L57)

## Methods

### \_addCallers

▸ **_addCallers**(...`callers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...callers` | `string`[] |

#### Returns

`void`

#### Defined in

[src/sim/function.ts:64](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L64)

___

### \_capture

▸ **_capture**(`captureScope`, `_metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `_metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Overrides

[FunctionBase](cloud.FunctionBase.md).[_capture](cloud.FunctionBase.md#_capture)

#### Defined in

[src/sim/function.ts:71](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L71)

___

### \_toResourceSchema

▸ **_toResourceSchema**(): [`FunctionSchema`](../interfaces/sim.FunctionSchema.md)

#### Returns

[`FunctionSchema`](../interfaces/sim.FunctionSchema.md)

#### Implementation of

[IResource](../interfaces/sim.IResource.md).[_toResourceSchema](../interfaces/sim.IResource.md#_toresourceschema)

#### Defined in

[src/sim/function.ts:89](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L89)

___

### addEnvironment

▸ **addEnvironment**(`name`, `value`): `void`

Add an environment variable to the function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Overrides

[FunctionBase](cloud.FunctionBase.md).[addEnvironment](cloud.FunctionBase.md#addenvironment)

#### Defined in

[src/sim/function.ts:103](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/function.ts#L103)

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
