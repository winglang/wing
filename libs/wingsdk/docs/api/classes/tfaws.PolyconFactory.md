[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / PolyconFactory

# Class: PolyconFactory

[tfaws](../modules/tfaws.md).PolyconFactory

Polycon factory which resolves `cloud` resources into AWS resources.

## Implements

- `IPolyconFactory`

## Table of contents

### Constructors

- [constructor](tfaws.PolyconFactory.md#constructor)

### Methods

- [resolve](tfaws.PolyconFactory.md#resolve)

## Constructors

### constructor

• **new PolyconFactory**()

## Methods

### resolve

▸ **resolve**(`type`, `scope`, `id`, ...`args`): `IConstruct`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `scope` | `IConstruct` |
| `id` | `string` |
| `...args` | `any`[] |

#### Returns

`IConstruct`

#### Implementation of

IPolyconFactory.resolve

#### Defined in

[src/tf-aws/factory.ts:12](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/factory.ts#L12)
