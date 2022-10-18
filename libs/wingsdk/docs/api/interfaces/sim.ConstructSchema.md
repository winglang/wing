[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / ConstructSchema

# Interface: ConstructSchema

[sim](../modules/sim.md).ConstructSchema

Schema for ordinary constructs

## Hierarchy

- [`BaseResourceSchema`](sim.BaseResourceSchema.md)

  ↳ **`ConstructSchema`**

## Table of contents

### Properties

- [attrs](sim.ConstructSchema.md#attrs)
- [callees](sim.ConstructSchema.md#callees)
- [callers](sim.ConstructSchema.md#callers)
- [children](sim.ConstructSchema.md#children)
- [path](sim.ConstructSchema.md#path)
- [props](sim.ConstructSchema.md#props)
- [type](sim.ConstructSchema.md#type)

## Properties

### attrs

• `Optional` `Readonly` **attrs**: `Object`

The resource-specific attributes that are set after the resource is created.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[attrs](sim.BaseResourceSchema.md#attrs)

#### Defined in

[src/sim/schema.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema.ts#L21)

___

### callees

• `Optional` `Readonly` **callees**: `string`[]

IDs of resources that this resource calls, triggers, or captures.

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[callees](sim.BaseResourceSchema.md#callees)

#### Defined in

[src/sim/schema.ts:25](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema.ts#L25)

___

### callers

• `Optional` `Readonly` **callers**: `string`[]

IDs of resources that this resource is called, triggered, or captured by.

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[callers](sim.BaseResourceSchema.md#callers)

#### Defined in

[src/sim/schema.ts:23](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema.ts#L23)

___

### children

• `Optional` `Readonly` **children**: `Object`

The resource's children indexed by their IDs.

#### Index signature

▪ [key: `string`]: [`BaseResourceSchema`](sim.BaseResourceSchema.md)

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[children](sim.BaseResourceSchema.md#children)

#### Defined in

[src/sim/schema.ts:27](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema.ts#L27)

___

### path

• `Optional` `Readonly` **path**: `string`

The full path of the resource in the construct tree.

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[path](sim.BaseResourceSchema.md#path)

#### Defined in

[src/sim/schema.ts:15](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema.ts#L15)

___

### props

• `Optional` `Readonly` **props**: `Object`

The resource-specific properties needed to create this resource.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[BaseResourceSchema](sim.BaseResourceSchema.md).[props](sim.BaseResourceSchema.md#props)

#### Defined in

[src/sim/schema.ts:19](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema.ts#L19)

___

### type

• `Readonly` **type**: ``"constructs.Construct"``

The type of the resource.

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[type](sim.BaseResourceSchema.md#type)

#### Defined in

[src/sim/schema-resources.ts:60](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/schema-resources.ts#L60)
