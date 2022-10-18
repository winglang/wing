[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / JsonFile

# Class: JsonFile

[fs](../modules/fs.md).JsonFile

Represents a text file that should be synthesized in the app's outdir.

## Hierarchy

- [`FileBase`](fs.FileBase.md)

  ↳ **`JsonFile`**

## Table of contents

### Constructors

- [constructor](fs.JsonFile.md#constructor)

### Properties

- [filePath](fs.JsonFile.md#filepath)
- [node](fs.JsonFile.md#node)
- [obj](fs.JsonFile.md#obj)

### Methods

- [render](fs.JsonFile.md#render)
- [save](fs.JsonFile.md#save)
- [toString](fs.JsonFile.md#tostring)
- [isConstruct](fs.JsonFile.md#isconstruct)

## Constructors

### constructor

• **new JsonFile**(`scope`, `id`, `filePath`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `filePath` | `string` |
| `props` | [`JsonFileProps`](../interfaces/fs.JsonFileProps.md) |

#### Overrides

[FileBase](fs.FileBase.md).[constructor](fs.FileBase.md#constructor)

#### Defined in

[src/fs/json-file.ts:20](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/json-file.ts#L20)

## Properties

### filePath

• `Readonly` **filePath**: `string`

The file's relative path to the output directory.

#### Inherited from

[FileBase](fs.FileBase.md).[filePath](fs.FileBase.md#filepath)

#### Defined in

[src/fs/file-base.ts:12](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/file-base.ts#L12)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`Stability`**

stable

#### Inherited from

[FileBase](fs.FileBase.md).[node](fs.FileBase.md#node)

#### Defined in

node_modules/constructs/lib/construct.d.ts:305

___

### obj

• `Private` `Readonly` **obj**: `any`

#### Defined in

[src/fs/json-file.ts:18](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/json-file.ts#L18)

## Methods

### render

▸ `Protected` **render**(): `string`

Returns the contents of the file to save.

#### Returns

`string`

#### Overrides

[FileBase](fs.FileBase.md).[render](fs.FileBase.md#render)

#### Defined in

[src/fs/json-file.ts:31](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/json-file.ts#L31)

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

#### Inherited from

[FileBase](fs.FileBase.md).[save](fs.FileBase.md#save)

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

[FileBase](fs.FileBase.md).[toString](fs.FileBase.md#tostring)

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

[FileBase](fs.FileBase.md).[isConstruct](fs.FileBase.md#isconstruct)

#### Defined in

node_modules/constructs/lib/construct.d.ts:299
