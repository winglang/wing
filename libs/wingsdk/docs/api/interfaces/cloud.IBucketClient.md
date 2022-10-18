[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [cloud](../modules/cloud.md) / IBucketClient

# Interface: IBucketClient

[cloud](../modules/cloud.md).IBucketClient

Inflight interface for `Bucket`.

## Implemented by

- [`BucketClient`](../classes/tfaws.BucketClient.md)
- [`BucketClient`](../classes/sim.BucketClient.md)

## Table of contents

### Methods

- [get](cloud.IBucketClient.md#get)
- [put](cloud.IBucketClient.md#put)

## Methods

### get

▸ **get**(`key`): `Promise`<`string`\>

Retrieve an object from the bucket. Throws if no object with the given key
exists.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/cloud/bucket.ts:67](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/bucket.ts#L67)

___

### put

▸ **put**(`key`, `body`): `Promise`<`void`\>

Put an object in the bucket.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `body` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/cloud/bucket.ts:61](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/cloud/bucket.ts#L61)
