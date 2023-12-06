---
title: string
id: string
---


# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### String <a name="String" id="@winglang/sdk.std.String"></a>

String.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.String.at">at</a></code> | Returns the character at the specified index. |
| <code><a href="#@winglang/sdk.std.String.concat">concat</a></code> | Combines the text of two (or more) strings and returns a new string. |
| <code><a href="#@winglang/sdk.std.String.contains">contains</a></code> | Checks if string includes substring. |
| <code><a href="#@winglang/sdk.std.String.endsWith">endsWith</a></code> | Does this string end with the given searchString? |
| <code><a href="#@winglang/sdk.std.String.indexOf">indexOf</a></code> | Returns the index of the first occurrence of searchString found. |
| <code><a href="#@winglang/sdk.std.String.lowercase">lowercase</a></code> | Returns this string in lower case. |
| <code><a href="#@winglang/sdk.std.String.replace">replace</a></code> | Replaces the first occurence of a substring within a string. |
| <code><a href="#@winglang/sdk.std.String.replaceAll">replaceAll</a></code> | Replaces all occurrences of a substring within a string. |
| <code><a href="#@winglang/sdk.std.String.split">split</a></code> | Splits string by separator. |
| <code><a href="#@winglang/sdk.std.String.startsWith">startsWith</a></code> | Does this string start with the given searchString? |
| <code><a href="#@winglang/sdk.std.String.substring">substring</a></code> | Returns a string between indexStart, indexEnd. |
| <code><a href="#@winglang/sdk.std.String.trim">trim</a></code> | Removes white spaces from start and end of this string. |
| <code><a href="#@winglang/sdk.std.String.uppercase">uppercase</a></code> | Returns this string in upper case. |

---

##### `at` <a name="at" id="@winglang/sdk.std.String.at"></a>

```wing
at(index: num): str
```

Returns the character at the specified index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.String.at.parameter.index"></a>

- *Type:* num

position of the character.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.String.concat"></a>

```wing
concat(strN: str): str
```

Combines the text of two (or more) strings and returns a new string.

###### `strN`<sup>Required</sup> <a name="strN" id="@winglang/sdk.std.String.concat.parameter.strN"></a>

- *Type:* str

one or more strings to concatenate to this string.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.String.contains"></a>

```wing
contains(searchString: str): bool
```

Checks if string includes substring.

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.contains.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `endsWith` <a name="endsWith" id="@winglang/sdk.std.String.endsWith"></a>

```wing
endsWith(searchString: str): bool
```

Does this string end with the given searchString?

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.endsWith.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `indexOf` <a name="indexOf" id="@winglang/sdk.std.String.indexOf"></a>

```wing
indexOf(searchString: str): num
```

Returns the index of the first occurrence of searchString found.

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.indexOf.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `lowercase` <a name="lowercase" id="@winglang/sdk.std.String.lowercase"></a>

```wing
lowercase(): str
```

Returns this string in lower case.

##### `replace` <a name="replace" id="@winglang/sdk.std.String.replace"></a>

```wing
replace(searchString: str, replaceString: str): str
```

Replaces the first occurence of a substring within a string.

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.replace.parameter.searchString"></a>

- *Type:* str

The substring to search for.

---

###### `replaceString`<sup>Required</sup> <a name="replaceString" id="@winglang/sdk.std.String.replace.parameter.replaceString"></a>

- *Type:* str

The replacement substring.

---

##### `replaceAll` <a name="replaceAll" id="@winglang/sdk.std.String.replaceAll"></a>

```wing
replaceAll(searchString: str, replaceString: str): str
```

Replaces all occurrences of a substring within a string.

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.replaceAll.parameter.searchString"></a>

- *Type:* str

The substring to search for.

---

###### `replaceString`<sup>Required</sup> <a name="replaceString" id="@winglang/sdk.std.String.replaceAll.parameter.replaceString"></a>

- *Type:* str

The replacement substring.

---

##### `split` <a name="split" id="@winglang/sdk.std.String.split"></a>

```wing
split(separator: str): MutArray<str>
```

Splits string by separator.

###### `separator`<sup>Required</sup> <a name="separator" id="@winglang/sdk.std.String.split.parameter.separator"></a>

- *Type:* str

separator to split by.

---

##### `startsWith` <a name="startsWith" id="@winglang/sdk.std.String.startsWith"></a>

```wing
startsWith(searchString: str): bool
```

Does this string start with the given searchString?

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.startsWith.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `substring` <a name="substring" id="@winglang/sdk.std.String.substring"></a>

```wing
substring(indexStart: num, indexEnd?: num): str
```

Returns a string between indexStart, indexEnd.

###### `indexStart`<sup>Required</sup> <a name="indexStart" id="@winglang/sdk.std.String.substring.parameter.indexStart"></a>

- *Type:* num

index of the character we slice at.

---

###### `indexEnd`<sup>Optional</sup> <a name="indexEnd" id="@winglang/sdk.std.String.substring.parameter.indexEnd"></a>

- *Type:* num

optional - index of the character we end slicing at.

---

##### `trim` <a name="trim" id="@winglang/sdk.std.String.trim"></a>

```wing
trim(): str
```

Removes white spaces from start and end of this string.

##### `uppercase` <a name="uppercase" id="@winglang/sdk.std.String.uppercase"></a>

```wing
uppercase(): str
```

Returns this string in upper case.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.String.fromJson">fromJson</a></code> | Parse string from Json. |

---

##### `fromJson` <a name="fromJson" id="@winglang/sdk.std.String.fromJson"></a>

```wing
str.fromJson(json: Json, options?: JsonValidationOptions);
```

Parse string from Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.String.fromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to create string from.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.std.String.fromJson.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.std.JsonValidationOptions">JsonValidationOptions</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.String.property.length">length</a></code> | <code>num</code> | The length of the string. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.String.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the string.

---




