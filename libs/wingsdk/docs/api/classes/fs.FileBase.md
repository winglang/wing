[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / FileBase

# Class: FileBase

[fs](../modules/fs.md).FileBase

Represents a file to be synthesized in the app's output directory.

## Hierarchy

- `Construct`

  ↳ **`FileBase`**

  ↳↳ [`JsonFile`](fs.JsonFile.md)

  ↳↳ [`TextFile`](fs.TextFile.md)

## Table of contents

### Constructors

- [constructor](fs.FileBase.md#constructor)

### Properties

- [filePath](fs.FileBase.md#filepath)
- [node](fs.FileBase.md#node)

### Methods

- [render](fs.FileBase.md#render)
- [save](fs.FileBase.md#save)
- [toString](fs.FileBase.md#tostring)
- [isConstruct](fs.FileBase.md#isconstruct)

## Constructors

### constructor

• **new FileBase**(`scope`, `id`, `filePath`)

Defines a file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | construct scope |
| `id` | `string` | construct id |
| `filePath` | `string` | relative file path |

#### Overrides

Construct.constructor

#### Defined in

[src/fs/file-base.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/file-base.ts#L21)

## Properties

### filePath

• `Readonly` **filePath**: `string`

The file's relative path to the output directory.

#### Defined in

[src/fs/file-base.ts:12](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/file-base.ts#L12)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:305

## Methods

### render

▸ `Protected` `Abstract` **render**(): `string`

Returns the contents of the file to save.

#### Returns

`string`

#### Defined in

[src/fs/file-base.ts:39](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/file-base.ts#L39)

___

### save

▸ **save**(`outdir`): `void`

Render the contents of the file and save it to the user's file system.

#### Parameters

| Name | Type |
| :------ | :------ |
| `outdir` | `string` |

#### Returns

`void`

#### Defined in

[src/fs/file-base.ts:29](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/file-base.ts#L29)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`Stability`**

stable

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:319

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`Deprecated`**

use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
