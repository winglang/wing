[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / Function

# Class: Function

[tfaws](../modules/tfaws.md).Function

AWS implementation of `cloud.Function`.

## Hierarchy

- [`FunctionBase`](cloud.FunctionBase.md)

  ↳ **`Function`**

## Table of contents

### Constructors

- [constructor](tfaws.Function.md#constructor)

### Properties

- [env](tfaws.Function.md#env)
- [function](tfaws.Function.md#function)
- [node](tfaws.Function.md#node)
- [policyStatements](tfaws.Function.md#policystatements)
- [role](tfaws.Function.md#role)
- [stateful](tfaws.Function.md#stateful)

### Accessors

- [\_functionName](tfaws.Function.md#_functionname)

### Methods

- [\_capture](tfaws.Function.md#_capture)
- [addEnvironment](tfaws.Function.md#addenvironment)
- [addPolicyStatements](tfaws.Function.md#addpolicystatements)
- [toString](tfaws.Function.md#tostring)
- [isConstruct](tfaws.Function.md#isconstruct)

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

[src/tf-aws/function.ts:26](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L26)

## Properties

### env

• `Private` `Readonly` **env**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/tf-aws/function.ts:22](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L22)

___

### function

• `Private` `Readonly` **function**: `LambdaFunction`

#### Defined in

[src/tf-aws/function.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L21)

___

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

### policyStatements

• `Private` `Readonly` **policyStatements**: `any`[] = `[]`

#### Defined in

[src/tf-aws/function.ts:24](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L24)

___

### role

• `Private` `Readonly` **role**: `IamRole`

#### Defined in

[src/tf-aws/function.ts:23](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L23)

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

### \_functionName

• `get` **_functionName**(): `string`

#### Returns

`string`

#### Defined in

[src/tf-aws/function.ts:196](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L196)

## Methods

### \_capture

▸ **_capture**(`captureScope`, `metadata`): [`Code`](core.Code.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureScope` | `IConstruct` |
| `metadata` | [`CaptureMetadata`](../interfaces/core.CaptureMetadata.md) |

#### Returns

[`Code`](core.Code.md)

#### Overrides

[FunctionBase](cloud.FunctionBase.md).[_capture](cloud.FunctionBase.md#_capture)

#### Defined in

[src/tf-aws/function.ts:151](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L151)

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

[src/tf-aws/function.ts:178](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L178)

___

### addPolicyStatements

▸ **addPolicyStatements**(...`statements`): `void`

Add a policy statement to the Lambda role.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...statements` | [`PolicyStatement`](../interfaces/tfaws.PolicyStatement.md)[] |

#### Returns

`void`

#### Defined in

[src/tf-aws/function.ts:185](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/tf-aws/function.ts#L185)

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
