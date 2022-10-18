[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / Code

# Class: Code

[core](../modules/core.md).Code

Reference to a piece of code.

## Hierarchy

- **`Code`**

  ↳ [`NodeJsCode`](core.NodeJsCode.md)

## Table of contents

### Constructors

- [constructor](core.Code.md#constructor)

### Properties

- [language](core.Code.md#language)
- [path](core.Code.md#path)

### Accessors

- [hash](core.Code.md#hash)
- [text](core.Code.md#text)

## Constructors

### constructor

• **new Code**()

## Properties

### language

• `Readonly` `Abstract` **language**: [`NODE_JS`](../enums/core.Language.md#node_js)

The language of the code.

#### Defined in

[src/core/inflight.ts:61](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L61)

___

### path

• `Readonly` `Abstract` **path**: `string`

A path to the code in the user's file system that can be referenced
for bundling purposes.

#### Defined in

[src/core/inflight.ts:67](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L67)

## Accessors

### hash

• `get` **hash**(): `string`

Generate a hash of the code contents.

#### Returns

`string`

#### Defined in

[src/core/inflight.ts:79](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L79)

___

### text

• `get` **text**(): `string`

The code contents.

#### Returns

`string`

#### Defined in

[src/core/inflight.ts:72](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/inflight.ts#L72)
