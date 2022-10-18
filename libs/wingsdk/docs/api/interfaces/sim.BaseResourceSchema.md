[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / BaseResourceSchema

# Interface: BaseResourceSchema

[sim](../modules/sim.md).BaseResourceSchema

Schema for individual resources

## Hierarchy

- **`BaseResourceSchema`**

  ↳ [`FunctionSchema`](sim.FunctionSchema.md)

  ↳ [`QueueSchema`](sim.QueueSchema.md)

  ↳ [`BucketSchema`](sim.BucketSchema.md)

  ↳ [`ConstructSchema`](sim.ConstructSchema.md)

## Table of contents

### Properties

- [attrs](sim.BaseResourceSchema.md#attrs)
- [callees](sim.BaseResourceSchema.md#callees)
- [callers](sim.BaseResourceSchema.md#callers)
- [children](sim.BaseResourceSchema.md#children)
- [path](sim.BaseResourceSchema.md#path)
- [props](sim.BaseResourceSchema.md#props)
- [type](sim.BaseResourceSchema.md#type)

## Properties

### attrs

• `Optional` `Readonly` **attrs**: `Object`

The resource-specific attributes that are set after the resource is created.

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[src/sim/schema.ts:21](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L21)

___

### callees

• `Optional` `Readonly` **callees**: `string`[]

IDs of resources that this resource calls, triggers, or captures.

#### Defined in

[src/sim/schema.ts:25](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L25)

___

### callers

• `Optional` `Readonly` **callers**: `string`[]

IDs of resources that this resource is called, triggered, or captured by.

#### Defined in

[src/sim/schema.ts:23](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L23)

___

### children

• `Optional` `Readonly` **children**: `Object`

The resource's children indexed by their IDs.

#### Index signature

▪ [key: `string`]: [`BaseResourceSchema`](sim.BaseResourceSchema.md)

#### Defined in

[src/sim/schema.ts:27](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L27)

___

### path

• `Optional` `Readonly` **path**: `string`

The full path of the resource in the construct tree.

#### Defined in

[src/sim/schema.ts:15](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L15)

___

### props

• `Optional` `Readonly` **props**: `Object`

The resource-specific properties needed to create this resource.

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[src/sim/schema.ts:19](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L19)

___

### type

• `Readonly` **type**: `string`

The type of the resource.

#### Defined in

[src/sim/schema.ts:17](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L17)
