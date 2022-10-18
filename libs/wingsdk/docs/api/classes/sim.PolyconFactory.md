[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / PolyconFactory

# Class: PolyconFactory

[sim](../modules/sim.md).PolyconFactory

Polycon factory which resolves `cloud` resources into simulated resources.

## Implements

- `IPolyconFactory`

## Table of contents

### Constructors

- [constructor](sim.PolyconFactory.md#constructor)

### Methods

- [resolve](sim.PolyconFactory.md#resolve)

## Constructors

### constructor

• **new PolyconFactory**()

## Methods

### resolve

▸ **resolve**(`polyconId`, `scope`, `id`, ...`args`): `IConstruct`

#### Parameters

| Name | Type |
| :------ | :------ |
| `polyconId` | `string` |
| `scope` | `IConstruct` |
| `id` | `string` |
| `...args` | `any`[] |

#### Returns

`IConstruct`

#### Implementation of

IPolyconFactory.resolve

#### Defined in

[src/sim/factory.ts:12](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/sim/factory.ts#L12)
