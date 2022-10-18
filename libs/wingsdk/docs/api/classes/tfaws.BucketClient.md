[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / BucketClient

# Class: BucketClient

[tfaws](../modules/tfaws.md).BucketClient

Inflight interface for `Bucket`.

## Implements

- [`IBucketClient`](../interfaces/cloud.IBucketClient.md)

## Table of contents

### Constructors

- [constructor](tfaws.BucketClient.md#constructor)

### Properties

- [bucketName](tfaws.BucketClient.md#bucketname)
- [s3Client](tfaws.BucketClient.md#s3client)

### Methods

- [get](tfaws.BucketClient.md#get)
- [put](tfaws.BucketClient.md#put)

## Constructors

### constructor

• **new BucketClient**(`bucketName`, `s3Client?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucketName` | `string` |
| `s3Client` | `S3Client` |

#### Defined in

[src/tf-aws/bucket.inflight.ts:10](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts#L10)

## Properties

### bucketName

• `Private` `Readonly` **bucketName**: `string`

#### Defined in

[src/tf-aws/bucket.inflight.ts:11](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts#L11)

___

### s3Client

• `Private` `Readonly` **s3Client**: `S3Client`

#### Defined in

[src/tf-aws/bucket.inflight.ts:12](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts#L12)

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

[src/tf-aws/bucket.inflight.ts:24](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts#L24)

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

#### Implementation of

[IBucketClient](../interfaces/cloud.IBucketClient.md).[put](../interfaces/cloud.IBucketClient.md#put)

#### Defined in

[src/tf-aws/bucket.inflight.ts:15](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts#L15)
