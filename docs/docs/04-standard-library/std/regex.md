---
title: regex
id: regex
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Regex <a name="Regex" id="@winglang/sdk.std.Regex"></a>

- *Implements:* <a href="#@winglang/sdk.std.ILiftable">ILiftable</a>

Represents a compiled regular expression pattern.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Regex.find">find</a></code> | Finds the first occurrence of the pattern within the text. |
| <code><a href="#@winglang/sdk.std.Regex.findAll">findAll</a></code> | Finds all non-overlapping occurrences of the pattern within the text. |
| <code><a href="#@winglang/sdk.std.Regex.findAllIndex">findAllIndex</a></code> | Finds the start and end index of all matches within the text. |
| <code><a href="#@winglang/sdk.std.Regex.findIndex">findIndex</a></code> | Finds the start and end index of the first match within the text. |
| <code><a href="#@winglang/sdk.std.Regex.findSubmatch">findSubmatch</a></code> | Finds the first match and its submatches. |
| <code><a href="#@winglang/sdk.std.Regex.findSubmatchIndex">findSubmatchIndex</a></code> | Finds the start and end index of the match and all submatches. |
| <code><a href="#@winglang/sdk.std.Regex.replaceAll">replaceAll</a></code> | Replaces all occurrences of the match with a replacement string. |
| <code><a href="#@winglang/sdk.std.Regex.test">test</a></code> | Checks if the regular expression matches the provided text. |

---

##### `find` <a name="find" id="@winglang/sdk.std.Regex.find"></a>

```wing
find(text: str): str?
```

Finds the first occurrence of the pattern within the text.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.find.parameter.text"></a>

- *Type:* str

The text to search within.

---

##### `findAll` <a name="findAll" id="@winglang/sdk.std.Regex.findAll"></a>

```wing
findAll(text: str): MutArray<str>
```

Finds all non-overlapping occurrences of the pattern within the text.

Returns an empty array if no matches are found.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.findAll.parameter.text"></a>

- *Type:* str

The text to search within.

---

##### `findAllIndex` <a name="findAllIndex" id="@winglang/sdk.std.Regex.findAllIndex"></a>

```wing
findAllIndex(text: str): MutArray<MutArray<num>>
```

Finds the start and end index of all matches within the text.

Indices are zero-based.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.findAllIndex.parameter.text"></a>

- *Type:* str

The text to search within.

---

##### `findIndex` <a name="findIndex" id="@winglang/sdk.std.Regex.findIndex"></a>

```wing
findIndex(text: str): MutArray<num>?
```

Finds the start and end index of the first match within the text.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.findIndex.parameter.text"></a>

- *Type:* str

The text to search within.

---

##### `findSubmatch` <a name="findSubmatch" id="@winglang/sdk.std.Regex.findSubmatch"></a>

```wing
findSubmatch(text: str): MutArray<str>?
```

Finds the first match and its submatches.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.findSubmatch.parameter.text"></a>

- *Type:* str

The text to search within.

---

##### `findSubmatchIndex` <a name="findSubmatchIndex" id="@winglang/sdk.std.Regex.findSubmatchIndex"></a>

```wing
findSubmatchIndex(text: str): MutArray<MutArray<num>>?
```

Finds the start and end index of the match and all submatches.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.findSubmatchIndex.parameter.text"></a>

- *Type:* str

The text to search within.

---

##### `replaceAll` <a name="replaceAll" id="@winglang/sdk.std.Regex.replaceAll"></a>

```wing
replaceAll(text: str, replacement: str): str
```

Replaces all occurrences of the match with a replacement string.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.replaceAll.parameter.text"></a>

- *Type:* str

The text to search and replace within.

---

###### `replacement`<sup>Required</sup> <a name="replacement" id="@winglang/sdk.std.Regex.replaceAll.parameter.replacement"></a>

- *Type:* str

The replacement string.

---

##### `test` <a name="test" id="@winglang/sdk.std.Regex.test"></a>

```wing
test(text: str): bool
```

Checks if the regular expression matches the provided text.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.std.Regex.test.parameter.text"></a>

- *Type:* str

The text to check against.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Regex.compile">compile</a></code> | Compiles the provided regex pattern into a `Regex` object. |

---

##### `compile` <a name="compile" id="@winglang/sdk.std.Regex.compile"></a>

```wing
regex.compile(pattern: str);
```

Compiles the provided regex pattern into a `Regex` object.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@winglang/sdk.std.Regex.compile.parameter.pattern"></a>

- *Type:* str

The regex pattern to compile.

---





