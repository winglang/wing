[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / NodeJsCode

# Class: NodeJsCode

[core](../modules/core.md).NodeJsCode

Reference to a piece of Node.js code.

## Hierarchy

- [`Code`](core.Code.md)

  ↳ **`NodeJsCode`**

## Table of contents

### Constructors

- [constructor](core.NodeJsCode.md#constructor)

### Properties

- [language](core.NodeJsCode.md#language)
- [path](core.NodeJsCode.md#path)

### Accessors

- [hash](core.NodeJsCode.md#hash)
- [text](core.NodeJsCode.md#text)

### Methods

- [fromFile](core.NodeJsCode.md#fromfile)
- [fromInline](core.NodeJsCode.md#frominline)

## Constructors

### constructor

• `Private` **new NodeJsCode**(`path`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Overrides

[Code](core.Code.md).[constructor](core.Code.md#constructor)

#### Defined in

[src/core/inflight.ts:116](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L116)

## Properties

### language

• `Readonly` **language**: [`NODE_JS`](../enums/core.Language.md#node_js) = `Language.NODE_JS`

The language of the code.

#### Overrides

[Code](core.Code.md).[language](core.Code.md#language)

#### Defined in

[src/core/inflight.ts:113](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L113)

___

### path

• `Readonly` **path**: `string`

A path to the code in the user's file system that can be referenced
for bundling purposes.

#### Overrides

[Code](core.Code.md).[path](core.Code.md#path)

#### Defined in

[src/core/inflight.ts:114](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L114)

## Accessors

### hash

• `get` **hash**(): `string`

Generate a hash of the code contents.

#### Returns

`string`

#### Inherited from

Code.hash

#### Defined in

[src/core/inflight.ts:79](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L79)

___

### text

• `get` **text**(): `string`

The code contents.

#### Returns

`string`

#### Inherited from

Code.text

#### Defined in

[src/core/inflight.ts:72](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L72)

## Methods

### fromFile

▸ `Static` **fromFile**(`path`): [`NodeJsCode`](core.NodeJsCode.md)

Reference code from a file path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

[`NodeJsCode`](core.NodeJsCode.md)

#### Defined in

[src/core/inflight.ts:99](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L99)

___

### fromInline

▸ `Static` **fromInline**(`text`): [`NodeJsCode`](core.NodeJsCode.md)

Reference code directly from a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`NodeJsCode`](core.NodeJsCode.md)

#### Defined in

[src/core/inflight.ts:106](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/inflight.ts#L106)
