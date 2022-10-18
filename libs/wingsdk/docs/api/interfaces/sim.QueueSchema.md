[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / QueueSchema

# Interface: QueueSchema

[sim](../modules/sim.md).QueueSchema

Schema for cloud.Queue

## Hierarchy

- [`BaseResourceSchema`](sim.BaseResourceSchema.md)

  ↳ **`QueueSchema`**

## Table of contents

### Properties

- [attrs](sim.QueueSchema.md#attrs)
- [callees](sim.QueueSchema.md#callees)
- [callers](sim.QueueSchema.md#callers)
- [children](sim.QueueSchema.md#children)
- [path](sim.QueueSchema.md#path)
- [props](sim.QueueSchema.md#props)
- [type](sim.QueueSchema.md#type)

## Properties

### attrs

• `Readonly` **attrs**: `Object`

The resource-specific attributes that are set after the resource is created.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `queueAddr` | `number` | A unique address of the queue in the simulator. |

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[attrs](sim.BaseResourceSchema.md#attrs)

#### Defined in

[src/sim/schema-resources.ts:34](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L34)

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
| `initialMessages` | `string`[] | Initial messages to be pushed to the queue. |
| `subscribers` | [`QueueSubscriber`](sim.QueueSubscriber.md)[] | Function that should process queue messages. |
| `timeout` | `number` | How long a queue's consumers have to process a message, in milliseconds |

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[props](sim.BaseResourceSchema.md#props)

#### Defined in

[src/sim/schema-resources.ts:26](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L26)

___

### type

• `Readonly` **type**: ``"wingsdk.cloud.Queue"``

The type of the resource.

#### Overrides

[BaseResourceSchema](sim.BaseResourceSchema.md).[type](sim.BaseResourceSchema.md#type)

#### Defined in

[src/sim/schema-resources.ts:25](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L25)
