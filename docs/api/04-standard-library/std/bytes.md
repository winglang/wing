---
title: bytes
id: bytes
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Bytes <a name="Bytes" id="@winglang/sdk.std.Bytes"></a>

Immutable sequence of binary data.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Bytes.at">at</a></code> | Get the byte at the given index. |
| <code><a href="#@winglang/sdk.std.Bytes.copy">copy</a></code> | Create a copy of the `bytes` value. |
| <code><a href="#@winglang/sdk.std.Bytes.slice">slice</a></code> | Get the slice of the `bytes` value from the given start index to the given end index. |
| <code><a href="#@winglang/sdk.std.Bytes.toBase64">toBase64</a></code> | Convert the `bytes` value to a base64 encoded string. |
| <code><a href="#@winglang/sdk.std.Bytes.toHex">toHex</a></code> | Convert the `bytes` value to a hex encoded string. |
| <code><a href="#@winglang/sdk.std.Bytes.toRaw">toRaw</a></code> | Convert the `bytes` value to an array of byte values. |
| <code><a href="#@winglang/sdk.std.Bytes.tryAt">tryAt</a></code> | Get the byte at the given index, returning nil if the index is out of bounds. |

---

##### `at` <a name="at" id="@winglang/sdk.std.Bytes.at"></a>

```wing
at(index: num): num
```

Get the byte at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Bytes.at.parameter.index"></a>

- *Type:* num

index of the value to get.

---

##### `copy` <a name="copy" id="@winglang/sdk.std.Bytes.copy"></a>

```wing
copy(): Bytes
```

Create a copy of the `bytes` value.

##### `slice` <a name="slice" id="@winglang/sdk.std.Bytes.slice"></a>

```wing
slice(startIndex: num, endIndex?: num): Bytes
```

Get the slice of the `bytes` value from the given start index to the given end index.

###### `startIndex`<sup>Required</sup> <a name="startIndex" id="@winglang/sdk.std.Bytes.slice.parameter.startIndex"></a>

- *Type:* num

index to start the slice.

---

###### `endIndex`<sup>Optional</sup> <a name="endIndex" id="@winglang/sdk.std.Bytes.slice.parameter.endIndex"></a>

- *Type:* num

index to end the slice.

---

##### `toBase64` <a name="toBase64" id="@winglang/sdk.std.Bytes.toBase64"></a>

```wing
toBase64(): str
```

Convert the `bytes` value to a base64 encoded string.

##### `toHex` <a name="toHex" id="@winglang/sdk.std.Bytes.toHex"></a>

```wing
toHex(): str
```

Convert the `bytes` value to a hex encoded string.

##### `toRaw` <a name="toRaw" id="@winglang/sdk.std.Bytes.toRaw"></a>

```wing
toRaw(): MutArray<num>
```

Convert the `bytes` value to an array of byte values.

##### `tryAt` <a name="tryAt" id="@winglang/sdk.std.Bytes.tryAt"></a>

```wing
tryAt(index: num): num?
```

Get the byte at the given index, returning nil if the index is out of bounds.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Bytes.tryAt.parameter.index"></a>

- *Type:* num

index of the value to get.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Bytes.concat">concat</a></code> | Concatenate multiple `bytes` values. |
| <code><a href="#@winglang/sdk.std.Bytes.fromBase64">fromBase64</a></code> | Create a new `bytes` value from a base64 encoded string. |
| <code><a href="#@winglang/sdk.std.Bytes.fromHex">fromHex</a></code> | Create a new `bytes` value from a hex encoded string. |
| <code><a href="#@winglang/sdk.std.Bytes.fromRaw">fromRaw</a></code> | Create a new `bytes` value from an array of byte values. |
| <code><a href="#@winglang/sdk.std.Bytes.fromString">fromString</a></code> | Create a new `bytes` value from a string. |
| <code><a href="#@winglang/sdk.std.Bytes.zeros">zeros</a></code> | Create a new `bytes` value with the given length, filled with zeros. |

---

##### `concat` <a name="concat" id="@winglang/sdk.std.Bytes.concat"></a>

```wing
Bytes.concat(...values: Array<Bytes>);
```

Concatenate multiple `bytes` values.

###### `values`<sup>Required</sup> <a name="values" id="@winglang/sdk.std.Bytes.concat.parameter.values"></a>

- *Type:* <a href="#@winglang/sdk.std.Bytes">Bytes</a>

the `bytes` values to concatenate.

---

##### `fromBase64` <a name="fromBase64" id="@winglang/sdk.std.Bytes.fromBase64"></a>

```wing
Bytes.fromBase64(base64: str);
```

Create a new `bytes` value from a base64 encoded string.

###### `base64`<sup>Required</sup> <a name="base64" id="@winglang/sdk.std.Bytes.fromBase64.parameter.base64"></a>

- *Type:* str

The base64 encoded string to create the `bytes` from.

---

##### `fromHex` <a name="fromHex" id="@winglang/sdk.std.Bytes.fromHex"></a>

```wing
Bytes.fromHex(hex: str);
```

Create a new `bytes` value from a hex encoded string.

###### `hex`<sup>Required</sup> <a name="hex" id="@winglang/sdk.std.Bytes.fromHex.parameter.hex"></a>

- *Type:* str

The hex encoded string to create the `bytes` from.

---

##### `fromRaw` <a name="fromRaw" id="@winglang/sdk.std.Bytes.fromRaw"></a>

```wing
Bytes.fromRaw(values: MutArray<num>);
```

Create a new `bytes` value from an array of byte values.

###### `values`<sup>Required</sup> <a name="values" id="@winglang/sdk.std.Bytes.fromRaw.parameter.values"></a>

- *Type:* MutArray&lt;num&gt;

The byte values to create the `bytes` from.

---

##### `fromString` <a name="fromString" id="@winglang/sdk.std.Bytes.fromString"></a>

```wing
Bytes.fromString(value: str);
```

Create a new `bytes` value from a string.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.Bytes.fromString.parameter.value"></a>

- *Type:* str

The string to create the `bytes` from.

---

##### `zeros` <a name="zeros" id="@winglang/sdk.std.Bytes.zeros"></a>

```wing
Bytes.zeros(length: num);
```

Create a new `bytes` value with the given length, filled with zeros.

###### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.Bytes.zeros.parameter.length"></a>

- *Type:* num

The length of the new `bytes` value.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Bytes.property.length">length</a></code> | <code>num</code> | The length of the bytes. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.Bytes.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the bytes.

---


## Structs <a name="Structs" id="Structs"></a>

### BytesToStringOptions <a name="BytesToStringOptions" id="@winglang/sdk.std.BytesToStringOptions"></a>

Options for converting a `bytes` value to a string.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.BytesToStringOptions.Initializer"></a>

```wing
let BytesToStringOptions = BytesToStringOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.BytesToStringOptions.property.encoding">encoding</a></code> | <code>str</code> | The encoding to use when converting the `bytes` value to a string. |

---

##### `encoding`<sup>Required</sup> <a name="encoding" id="@winglang/sdk.std.BytesToStringOptions.property.encoding"></a>

```wing
encoding: str;
```

- *Type:* str
- *Default:* "utf-8"

The encoding to use when converting the `bytes` value to a string.

> [https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings)

---


