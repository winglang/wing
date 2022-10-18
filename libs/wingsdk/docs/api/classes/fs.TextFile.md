[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / TextFile

# Class: TextFile

[fs](../modules/fs.md).TextFile

Represents a text file that should be synthesized in the app's outdir.

## Hierarchy

- [`FileBase`](fs.FileBase.md)

  ↳ **`TextFile`**

## Table of contents

### Constructors

- [constructor](fs.TextFile.md#constructor)

### Properties

- [filePath](fs.TextFile.md#filepath)
- [lines](fs.TextFile.md#lines)
- [node](fs.TextFile.md#node)

### Methods

- [addLine](fs.TextFile.md#addline)
- [render](fs.TextFile.md#render)
- [save](fs.TextFile.md#save)
- [toString](fs.TextFile.md#tostring)
- [isConstruct](fs.TextFile.md#isconstruct)

## Constructors

### constructor

• **new TextFile**(`scope`, `id`, `filePath`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `filePath` | `string` |
| `props?` | [`TextFileProps`](../interfaces/fs.TextFileProps.md) |

#### Overrides

[FileBase](fs.FileBase.md).[constructor](fs.FileBase.md#constructor)

#### Defined in

[src/fs/text-file.ts:23](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/text-file.ts#L23)

## Properties

### filePath

• `Readonly` **filePath**: `string`

The file's relative path to the output directory.

#### Inherited from

[FileBase](fs.FileBase.md).[filePath](fs.FileBase.md#filepath)

#### Defined in

[src/fs/file-base.ts:12](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/file-base.ts#L12)

___

### lines

• `Private` `Readonly` **lines**: `string`[]

#### Defined in

[src/fs/text-file.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/text-file.ts#L21)

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

## Methods

### addLine

▸ **addLine**(`line`): `void`

Append a line to the text file's contents.

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | `string` |

#### Returns

`void`

#### Defined in

[src/fs/text-file.ts:37](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/text-file.ts#L37)

___

### render

▸ `Protected` **render**(): `string`

Returns the contents of the file to save.

#### Returns

`string`

#### Overrides

[FileBase](fs.FileBase.md).[render](fs.FileBase.md#render)

#### Defined in

[src/fs/text-file.ts:41](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/fs/text-file.ts#L41)

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
