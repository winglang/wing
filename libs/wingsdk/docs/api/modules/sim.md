[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / sim

# Namespace: sim

## Table of contents

### Classes

- [App](../classes/sim.App.md)
- [Bucket](../classes/sim.Bucket.md)
- [BucketClient](../classes/sim.BucketClient.md)
- [Function](../classes/sim.Function.md)
- [FunctionClient](../classes/sim.FunctionClient.md)
- [PolyconFactory](../classes/sim.PolyconFactory.md)
- [Queue](../classes/sim.Queue.md)
- [QueueClient](../classes/sim.QueueClient.md)
- [Synthesizer](../classes/sim.Synthesizer.md)

### Interfaces

- [AppProps](../interfaces/sim.AppProps.md)
- [BaseResourceSchema](../interfaces/sim.BaseResourceSchema.md)
- [BucketSchema](../interfaces/sim.BucketSchema.md)
- [ConstructSchema](../interfaces/sim.ConstructSchema.md)
- [FunctionSchema](../interfaces/sim.FunctionSchema.md)
- [IResource](../interfaces/sim.IResource.md)
- [QueueSchema](../interfaces/sim.QueueSchema.md)
- [QueueSubscriber](../interfaces/sim.QueueSubscriber.md)
- [WingSimulatorSchema](../interfaces/sim.WingSimulatorSchema.md)

### Type Aliases

- [FunctionId](sim.md#functionid)

### Functions

- [isResource](sim.md#isresource)

## Type Aliases

### FunctionId

Ƭ **FunctionId**: `string`

#### Defined in

[src/sim/schema-resources.ts:4](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/schema-resources.ts#L4)

## Functions

### isResource

▸ **isResource**(`obj`): obj is IResource

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

obj is IResource

#### Defined in

[src/sim/resource.ts:12](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/resource.ts#L12)
