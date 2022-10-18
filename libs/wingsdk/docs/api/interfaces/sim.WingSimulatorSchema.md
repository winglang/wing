[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / WingSimulatorSchema

# Interface: WingSimulatorSchema

[sim](../modules/sim.md).WingSimulatorSchema

Schema for simulator.json

## Table of contents

### Properties

- [root](sim.WingSimulatorSchema.md#root)
- [startOrder](sim.WingSimulatorSchema.md#startorder)

## Properties

### root

• `Readonly` **root**: [`BaseResourceSchema`](sim.BaseResourceSchema.md)

The resource at the root of the tree.

#### Defined in

[src/sim/schema.ts:4](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L4)

___

### startOrder

• `Readonly` **startOrder**: `string`[]

The order resources in which resources should be initialized based on
dependency relationships.

#### Defined in

[src/sim/schema.ts:9](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema.ts#L9)
