---
title: json
id: json
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Json <a name="Json" id="@winglang/sdk.std.Json"></a>

Immutable Json.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Json.asBool">asBool</a></code> | Convert Json element to boolean if possible. |
| <code><a href="#@winglang/sdk.std.Json.asNum">asNum</a></code> | Convert Json element to number if possible. |
| <code><a href="#@winglang/sdk.std.Json.asStr">asStr</a></code> | Convert Json element to string if possible. |
| <code><a href="#@winglang/sdk.std.Json.get">get</a></code> | Returns the value associated with the specified Json key. |
| <code><a href="#@winglang/sdk.std.Json.getAt">getAt</a></code> | Returns a specified element at a given index from Json Array. |
| <code><a href="#@winglang/sdk.std.Json.has">has</a></code> | Checks if a Json object has a given key. |
| <code><a href="#@winglang/sdk.std.Json.tryAsBool">tryAsBool</a></code> | Convert Json element to boolean if possible. |
| <code><a href="#@winglang/sdk.std.Json.tryAsNum">tryAsNum</a></code> | Convert Json element to number if possible. |
| <code><a href="#@winglang/sdk.std.Json.tryAsStr">tryAsStr</a></code> | Convert Json element to string if possible. |
| <code><a href="#@winglang/sdk.std.Json.tryGet">tryGet</a></code> | Optionally returns an specified element from the Json. |
| <code><a href="#@winglang/sdk.std.Json.tryGetAt">tryGetAt</a></code> | Optionally returns a specified element at a given index from Json Array. |

---

##### `asBool` <a name="asBool" id="@winglang/sdk.std.Json.asBool"></a>

```wing
asBool(): bool
```

Convert Json element to boolean if possible.

##### `asNum` <a name="asNum" id="@winglang/sdk.std.Json.asNum"></a>

```wing
asNum(): num
```

Convert Json element to number if possible.

##### `asStr` <a name="asStr" id="@winglang/sdk.std.Json.asStr"></a>

```wing
asStr(): str
```

Convert Json element to string if possible.

##### `get` <a name="get" id="@winglang/sdk.std.Json.get"></a>

```wing
get(key: str): Json
```

Returns the value associated with the specified Json key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Json.get.parameter.key"></a>

- *Type:* str

The key of the Json property.

---

##### `getAt` <a name="getAt" id="@winglang/sdk.std.Json.getAt"></a>

```wing
getAt(index: num): Json
```

Returns a specified element at a given index from Json Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Json.getAt.parameter.index"></a>

- *Type:* num

The index of the element in the Json Array to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.Json.has"></a>

```wing
has(key: str): bool
```

Checks if a Json object has a given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Json.has.parameter.key"></a>

- *Type:* str

The key to check.

---

##### `tryAsBool` <a name="tryAsBool" id="@winglang/sdk.std.Json.tryAsBool"></a>

```wing
tryAsBool(): bool?
```

Convert Json element to boolean if possible.

##### `tryAsNum` <a name="tryAsNum" id="@winglang/sdk.std.Json.tryAsNum"></a>

```wing
tryAsNum(): num?
```

Convert Json element to number if possible.

##### `tryAsStr` <a name="tryAsStr" id="@winglang/sdk.std.Json.tryAsStr"></a>

```wing
tryAsStr(): str?
```

Convert Json element to string if possible.

##### `tryGet` <a name="tryGet" id="@winglang/sdk.std.Json.tryGet"></a>

```wing
tryGet(key: str): Json?
```

Optionally returns an specified element from the Json.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Json.tryGet.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `tryGetAt` <a name="tryGetAt" id="@winglang/sdk.std.Json.tryGetAt"></a>

```wing
tryGetAt(index: num): Json?
```

Optionally returns a specified element at a given index from Json Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Json.tryGetAt.parameter.index"></a>

- *Type:* num

The index of the element in the Json Array to return.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Json.deepCopy">deepCopy</a></code> | Creates an immutable deep copy of the Json. |
| <code><a href="#@winglang/sdk.std.Json.deepCopyMut">deepCopyMut</a></code> | Creates a mutable deep copy of the Json. |
| <code><a href="#@winglang/sdk.std.Json.delete">delete</a></code> | Deletes a key in a given Json. |
| <code><a href="#@winglang/sdk.std.Json.entries">entries</a></code> | Returns the entries from the Json. |
| <code><a href="#@winglang/sdk.std.Json.keys">keys</a></code> | Returns the keys from the Json. |
| <code><a href="#@winglang/sdk.std.Json.parse">parse</a></code> | Parse a string into a Json. |
| <code><a href="#@winglang/sdk.std.Json.stringify">stringify</a></code> | Formats Json as string. |
| <code><a href="#@winglang/sdk.std.Json.tryParse">tryParse</a></code> | Try to parse a string into a Json. |
| <code><a href="#@winglang/sdk.std.Json.values">values</a></code> | Returns the values from the Json. |

---

##### `deepCopy` <a name="deepCopy" id="@winglang/sdk.std.Json.deepCopy"></a>

```wing
Json.deepCopy(json: MutJson);
```

Creates an immutable deep copy of the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.deepCopy.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.MutJson">MutJson</a>

to copy.

---

##### `deepCopyMut` <a name="deepCopyMut" id="@winglang/sdk.std.Json.deepCopyMut"></a>

```wing
Json.deepCopyMut(json: Json);
```

Creates a mutable deep copy of the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.deepCopyMut.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to copy.

---

##### `delete` <a name="delete" id="@winglang/sdk.std.Json.delete"></a>

```wing
Json.delete(json: MutJson, key: str);
```

Deletes a key in a given Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.delete.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.MutJson">MutJson</a>

to delete key from.

---

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Json.delete.parameter.key"></a>

- *Type:* str

the key to delete.

---

##### `entries` <a name="entries" id="@winglang/sdk.std.Json.entries"></a>

```wing
Json.entries(json: Json);
```

Returns the entries from the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.entries.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

map to get the entries from.

---

##### `keys` <a name="keys" id="@winglang/sdk.std.Json.keys"></a>

```wing
Json.keys(json: any);
```

Returns the keys from the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.keys.parameter.json"></a>

- *Type:* any

map to get the keys from.

---

##### `parse` <a name="parse" id="@winglang/sdk.std.Json.parse"></a>

```wing
Json.parse(str: str);
```

Parse a string into a Json.

###### `str`<sup>Required</sup> <a name="str" id="@winglang/sdk.std.Json.parse.parameter.str"></a>

- *Type:* str

to parse as Json.

---

##### `stringify` <a name="stringify" id="@winglang/sdk.std.Json.stringify"></a>

```wing
Json.stringify(json: any, options?: JsonStringifyOptions);
```

Formats Json as string.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.stringify.parameter.json"></a>

- *Type:* any

to format as string.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.std.Json.stringify.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.std.JsonStringifyOptions">JsonStringifyOptions</a>

---

##### `tryParse` <a name="tryParse" id="@winglang/sdk.std.Json.tryParse"></a>

```wing
Json.tryParse(str?: str);
```

Try to parse a string into a Json.

###### `str`<sup>Optional</sup> <a name="str" id="@winglang/sdk.std.Json.tryParse.parameter.str"></a>

- *Type:* str

to parse as Json.

---

##### `values` <a name="values" id="@winglang/sdk.std.Json.values"></a>

```wing
Json.values(json: Json);
```

Returns the values from the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.values.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

map to get the values from.

---



### JsonSchema <a name="JsonSchema" id="@winglang/sdk.std.JsonSchema"></a>

Struct Schema.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.JsonSchema.Initializer"></a>

```wing
new JsonSchema(schema: Json);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.JsonSchema.Initializer.parameter.schema">schema</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | *No description.* |

---

##### `schema`<sup>Required</sup> <a name="schema" id="@winglang/sdk.std.JsonSchema.Initializer.parameter.schema"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.JsonSchema.asStr">asStr</a></code> | Retrieve the json schema as a string. |
| <code><a href="#@winglang/sdk.std.JsonSchema.validate">validate</a></code> | Attempt to validate a json object against the schema. |

---

##### `asStr` <a name="asStr" id="@winglang/sdk.std.JsonSchema.asStr"></a>

```wing
asStr(): str
```

Retrieve the json schema as a string.

##### `validate` <a name="validate" id="@winglang/sdk.std.JsonSchema.validate"></a>

```wing
validate(obj: Json, options?: JsonValidationOptions): void
```

Attempt to validate a json object against the schema.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.std.JsonSchema.validate.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

the Json object to validate.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.std.JsonSchema.validate.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.std.JsonValidationOptions">JsonValidationOptions</a>

---




### MutJson <a name="MutJson" id="@winglang/sdk.std.MutJson"></a>

Mutable Json.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutJson.asBool">asBool</a></code> | Convert Json element to boolean if possible. |
| <code><a href="#@winglang/sdk.std.MutJson.asNum">asNum</a></code> | Convert Json element to number if possible. |
| <code><a href="#@winglang/sdk.std.MutJson.asStr">asStr</a></code> | Convert Json element to string if possible. |
| <code><a href="#@winglang/sdk.std.MutJson.delete">delete</a></code> | Removes the specified element from a map. |
| <code><a href="#@winglang/sdk.std.MutJson.get">get</a></code> | Returns the value associated with the specified Json key. |
| <code><a href="#@winglang/sdk.std.MutJson.getAt">getAt</a></code> | Returns a specified element at a given index from MutJson Array. |
| <code><a href="#@winglang/sdk.std.MutJson.has">has</a></code> | Checks if a Json object has a given key. |
| <code><a href="#@winglang/sdk.std.MutJson.set">set</a></code> | Adds or updates an element in MutJson with a specific key and value. |
| <code><a href="#@winglang/sdk.std.MutJson.setAt">setAt</a></code> | Set element in MutJson Array with a specific key and value. |
| <code><a href="#@winglang/sdk.std.MutJson.tryAsBool">tryAsBool</a></code> | Convert Json element to boolean if possible. |
| <code><a href="#@winglang/sdk.std.MutJson.tryAsNum">tryAsNum</a></code> | Convert Json element to number if possible. |
| <code><a href="#@winglang/sdk.std.MutJson.tryAsStr">tryAsStr</a></code> | Convert Json element to string if possible. |
| <code><a href="#@winglang/sdk.std.MutJson.tryGet">tryGet</a></code> | Optionally returns an specified element from the Json. |
| <code><a href="#@winglang/sdk.std.MutJson.tryGetAt">tryGetAt</a></code> | Optionally returns a specified element at a given index from Json Array. |

---

##### `asBool` <a name="asBool" id="@winglang/sdk.std.MutJson.asBool"></a>

```wing
asBool(): bool
```

Convert Json element to boolean if possible.

##### `asNum` <a name="asNum" id="@winglang/sdk.std.MutJson.asNum"></a>

```wing
asNum(): num
```

Convert Json element to number if possible.

##### `asStr` <a name="asStr" id="@winglang/sdk.std.MutJson.asStr"></a>

```wing
asStr(): str
```

Convert Json element to string if possible.

##### `delete` <a name="delete" id="@winglang/sdk.std.MutJson.delete"></a>

```wing
delete(key: str): bool
```

Removes the specified element from a map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.delete.parameter.key"></a>

- *Type:* str

The key.

---

##### `get` <a name="get" id="@winglang/sdk.std.MutJson.get"></a>

```wing
get(key: str): MutJson
```

Returns the value associated with the specified Json key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.get.parameter.key"></a>

- *Type:* str

The key of the Json property.

---

##### `getAt` <a name="getAt" id="@winglang/sdk.std.MutJson.getAt"></a>

```wing
getAt(index: num): MutJson
```

Returns a specified element at a given index from MutJson Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutJson.getAt.parameter.index"></a>

- *Type:* num

The index of the element in the MutJson Array to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.MutJson.has"></a>

```wing
has(key: str): bool
```

Checks if a Json object has a given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.has.parameter.key"></a>

- *Type:* str

The key to check.

---

##### `set` <a name="set" id="@winglang/sdk.std.MutJson.set"></a>

```wing
set(key: str, value: MutJson): void
```

Adds or updates an element in MutJson with a specific key and value.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.set.parameter.key"></a>

- *Type:* str

The key of the element to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutJson.set.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.MutJson">MutJson</a>

The value of the element to add.

---

##### `setAt` <a name="setAt" id="@winglang/sdk.std.MutJson.setAt"></a>

```wing
setAt(index: num, value: MutJson): void
```

Set element in MutJson Array with a specific key and value.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutJson.setAt.parameter.index"></a>

- *Type:* num

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutJson.setAt.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.MutJson">MutJson</a>

The value of the element to set.

---

##### `tryAsBool` <a name="tryAsBool" id="@winglang/sdk.std.MutJson.tryAsBool"></a>

```wing
tryAsBool(): bool?
```

Convert Json element to boolean if possible.

##### `tryAsNum` <a name="tryAsNum" id="@winglang/sdk.std.MutJson.tryAsNum"></a>

```wing
tryAsNum(): num?
```

Convert Json element to number if possible.

##### `tryAsStr` <a name="tryAsStr" id="@winglang/sdk.std.MutJson.tryAsStr"></a>

```wing
tryAsStr(): str?
```

Convert Json element to string if possible.

##### `tryGet` <a name="tryGet" id="@winglang/sdk.std.MutJson.tryGet"></a>

```wing
tryGet(key: str): MutJson?
```

Optionally returns an specified element from the Json.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.tryGet.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `tryGetAt` <a name="tryGetAt" id="@winglang/sdk.std.MutJson.tryGetAt"></a>

```wing
tryGetAt(index: num): MutJson?
```

Optionally returns a specified element at a given index from Json Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutJson.tryGetAt.parameter.index"></a>

- *Type:* num

The index of the element in the Json Array to return.

---




## Structs <a name="Structs" id="Structs"></a>

### JsonEntry <a name="JsonEntry" id="@winglang/sdk.std.JsonEntry"></a>

Json entry representation.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.JsonEntry.Initializer"></a>

```wing
let JsonEntry = JsonEntry{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.JsonEntry.property.key">key</a></code> | <code>str</code> | The entry key. |
| <code><a href="#@winglang/sdk.std.JsonEntry.property.value">value</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The entry value. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.JsonEntry.property.key"></a>

```wing
key: str;
```

- *Type:* str

The entry key.

---

##### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.JsonEntry.property.value"></a>

```wing
value: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The entry value.

---

### JsonStringifyOptions <a name="JsonStringifyOptions" id="@winglang/sdk.std.JsonStringifyOptions"></a>

Options for stringify() method.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.JsonStringifyOptions.Initializer"></a>

```wing
let JsonStringifyOptions = JsonStringifyOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.JsonStringifyOptions.property.indent">indent</a></code> | <code>num</code> | Indentation spaces number. |

---

##### `indent`<sup>Required</sup> <a name="indent" id="@winglang/sdk.std.JsonStringifyOptions.property.indent"></a>

```wing
indent: num;
```

- *Type:* num

Indentation spaces number.

---

### JsonValidationOptions <a name="JsonValidationOptions" id="@winglang/sdk.std.JsonValidationOptions"></a>

Options for validating Json.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.JsonValidationOptions.Initializer"></a>

```wing
let JsonValidationOptions = JsonValidationOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.JsonValidationOptions.property.unsafe">unsafe</a></code> | <code>bool</code> | Unsafe mode to skip validation (may lead to runtime errors). |

---

##### `unsafe`<sup>Optional</sup> <a name="unsafe" id="@winglang/sdk.std.JsonValidationOptions.property.unsafe"></a>

```wing
unsafe: bool;
```

- *Type:* bool

Unsafe mode to skip validation (may lead to runtime errors).

---


