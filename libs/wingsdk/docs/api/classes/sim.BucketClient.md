[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [sim](../modules/sim.md) / BucketClient

# Class: BucketClient

[sim](../modules/sim.md).BucketClient

Inflight interface for `Bucket`.

## Implements

- [`IBucketClient`](../interfaces/cloud.IBucketClient.md)

## Table of contents

### Constructors

- [constructor](sim.BucketClient.md#constructor)

### Properties

- [bucketAddr](sim.BucketClient.md#bucketaddr)

### Methods

- [get](sim.BucketClient.md#get)
- [put](sim.BucketClient.md#put)

## Constructors

### constructor

• **new BucketClient**(`bucketAddr`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucketAddr` | `string` |

#### Defined in

[src/sim/bucket.inflight.ts:6](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.inflight.ts#L6)

## Properties

### bucketAddr

• `Private` `Readonly` **bucketAddr**: `string`

#### Defined in

[src/sim/bucket.inflight.ts:6](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.inflight.ts#L6)

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

#### Implementation of

[IBucketClient](../interfaces/cloud.IBucketClient.md).[get](../interfaces/cloud.IBucketClient.md#get)

#### Defined in

[src/sim/bucket.inflight.ts:13](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.inflight.ts#L13)

___

### put

▸ **put**(`key`, `value`): `Promise`<`void`\>

Put an object in the bucket.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBucketClient](../interfaces/cloud.IBucketClient.md).[put](../interfaces/cloud.IBucketClient.md#put)

#### Defined in

[src/sim/bucket.inflight.ts:8](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/sim/bucket.inflight.ts#L8)
