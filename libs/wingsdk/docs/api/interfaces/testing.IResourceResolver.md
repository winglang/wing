[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [testing](../modules/testing.md) / IResourceResolver

# Interface: IResourceResolver

[testing](../modules/testing.md).IResourceResolver

A resolver that can be used to look up other resources in the tree.

## Table of contents

### Methods

- [lookup](testing.IResourceResolver.md#lookup)

## Methods

### lookup

▸ **lookup**(`resourceId`): [`BaseResourceSchema`](sim.BaseResourceSchema.md)

Lookup a resource by its path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceId` | `string` |

#### Returns

[`BaseResourceSchema`](sim.BaseResourceSchema.md)

#### Defined in

[src/testing/simulator.ts:47](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/testing/simulator.ts#L47)
