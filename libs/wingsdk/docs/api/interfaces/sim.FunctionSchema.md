[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / FunctionSchema

# Interface: FunctionSchema

[sim](../modules/sim.md).FunctionSchema

Schema for cloud.Function

## Hierarchy

- [`BaseResourceSchema`](sim.BaseResourceSchema.md)

  ↳ **`FunctionSchema`**

## Table of contents

### Properties

- [attrs](sim.FunctionSchema.md#attrs)
- [callees](sim.FunctionSchema.md#callees)
- [callers](sim.FunctionSchema.md#callers)
- [children](sim.FunctionSchema.md#children)
- [path](sim.FunctionSchema.md#path)
- [props](sim.FunctionSchema.md#props)
- [type](sim.FunctionSchema.md#type)

## Properties

### attrs

• `Readonly` **attrs**: `Object`

The resource-specific attributes that are set after the resource is created.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionAddr` | `number` | A unique address of the function in the simulator. |

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[attrs](sim.BaseResourceSchema.md#attrs)

#### Defined in

[src/sim/schema-resources.ts:17](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L17)

___

### callees

• `Optional` `Readonly` **callees**: `string`[]

IDs of resources that this resource calls, triggers, or captures.

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[callees](sim.BaseResourceSchema.md#callees)

#### Defined in

[src/sim/schema.ts:25](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L25)

___

### callers

• `Optional` `Readonly` **callers**: `string`[]

IDs of resources that this resource is called, triggered, or captured by.

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[callers](sim.BaseResourceSchema.md#callers)

#### Defined in

[src/sim/schema.ts:23](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L23)

___

### children

• `Optional` `Readonly` **children**: `Object`

The resource's children indexed by their IDs.

#### Index signature

▪ [key: `string`]: [`BaseResourceSchema`](sim.BaseResourceSchema.md)

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[children](sim.BaseResourceSchema.md#children)

#### Defined in

[src/sim/schema.ts:27](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L27)

___

### path

• `Optional` `Readonly` **path**: `string`

The full path of the resource in the construct tree.

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[path](sim.BaseResourceSchema.md#path)

#### Defined in

[src/sim/schema.ts:15](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L15)

___

### props

• `Readonly` **props**: `Object`

The resource-specific properties needed to create this resource.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `environmentVariables` | `Record`<`string`, `string`\> | A map of environment variables to run the function with. |
| `sourceCodeFile` | `string` | The path to a file containing source code to be run when invoked. |
| `sourceCodeLanguage` | `string` | The language of the function's source code. |

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[props](sim.BaseResourceSchema.md#props)

#### Defined in

[src/sim/schema-resources.ts:9](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L9)

___

### type

• `Readonly` **type**: ``"wingsdk.cloud.Function"``

The type of the resource.

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[type](sim.BaseResourceSchema.md#type)

#### Defined in

[src/sim/schema-resources.ts:8](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L8)
