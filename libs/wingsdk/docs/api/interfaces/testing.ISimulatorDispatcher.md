[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [testing](../modules/testing.md) / ISimulatorDispatcher

# Interface: ISimulatorDispatcher

[testing](../modules/testing.md).ISimulatorDispatcher

Represents a class that can start and stop the simulation of an individual
resource.

## Table of contents

### Methods

- [start](testing.ISimulatorDispatcher.md#start)
- [stop](testing.ISimulatorDispatcher.md#stop)

## Methods

### start

▸ **start**(`type`, `props`, `context`): `Promise`<`any`\>

Start simulating a resource. This function should return an object/map
containing the resource's attributes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `props` | `any` |
| `context` | [`SimulatorContext`](testing.SimulatorContext.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/testing/simulator.ts:250](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L250)

___

### stop

▸ **stop**(`type`, `attrs`): `Promise`<`void`\>

Stop the resource's simulation and clean up any file system resources it
created.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `attrs` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/testing/simulator.ts:256](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L256)
