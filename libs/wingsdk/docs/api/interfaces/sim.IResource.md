[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / IResource

# Interface: IResource

[sim](../modules/sim.md).IResource

Fields shared by all resource implementations for the simulator.

## Hierarchy

- `IConstruct`

  ↳ **`IResource`**

## Implemented by

- [`Bucket`](../classes/sim.Bucket.md)
- [`Function`](../classes/sim.Function.md)
- [`Queue`](../classes/sim.Queue.md)

## Table of contents

### Properties

- [node](sim.IResource.md#node)

### Methods

- [\_toResourceSchema](sim.IResource.md#_toresourceschema)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

IConstruct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:14

## Methods

### \_toResourceSchema

▸ **_toResourceSchema**(): [`BaseResourceSchema`](sim.BaseResourceSchema.md)

#### Returns

[`BaseResourceSchema`](sim.BaseResourceSchema.md)

#### Defined in

[src/sim/resource.ts:9](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/resource.ts#L9)
