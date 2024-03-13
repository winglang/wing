---
title: struct
id: struct
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Struct <a name="Struct" id="@winglang/sdk.std.Struct"></a>

Shared behavior for all structs.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Struct.fromJson">fromJson</a></code> | Converts a Json to a Struct. |
| <code><a href="#@winglang/sdk.std.Struct.parseJson">parseJson</a></code> | Parse a Json string into a Struct. |
| <code><a href="#@winglang/sdk.std.Struct.schema">schema</a></code> | Retrieve the schema for this struct. |
| <code><a href="#@winglang/sdk.std.Struct.tryFromJson">tryFromJson</a></code> | Converts a Json to a Struct, returning nil if the Json is not valid. |
| <code><a href="#@winglang/sdk.std.Struct.tryParseJson">tryParseJson</a></code> | Parse a Json string into a Struct, returning nil if the Json is not valid. |

---

##### `fromJson` <a name="fromJson" id="@winglang/sdk.std.Struct.fromJson"></a>

```wing
Struct.fromJson(json: Json, options?: JsonValidationOptions);
```

Converts a Json to a Struct.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Struct.fromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.std.Struct.fromJson.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.std.JsonValidationOptions">JsonValidationOptions</a>

---

##### `parseJson` <a name="parseJson" id="@winglang/sdk.std.Struct.parseJson"></a>

```wing
Struct.parseJson(json: str);
```

Parse a Json string into a Struct.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Struct.parseJson.parameter.json"></a>

- *Type:* str

---

##### `schema` <a name="schema" id="@winglang/sdk.std.Struct.schema"></a>

```wing
Struct.schema();
```

Retrieve the schema for this struct.

##### `tryFromJson` <a name="tryFromJson" id="@winglang/sdk.std.Struct.tryFromJson"></a>

```wing
Struct.tryFromJson(json: Json);
```

Converts a Json to a Struct, returning nil if the Json is not valid.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Struct.tryFromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `tryParseJson` <a name="tryParseJson" id="@winglang/sdk.std.Struct.tryParseJson"></a>

```wing
Struct.tryParseJson(json?: str);
```

Parse a Json string into a Struct, returning nil if the Json is not valid.

###### `json`<sup>Optional</sup> <a name="json" id="@winglang/sdk.std.Struct.tryParseJson.parameter.json"></a>

- *Type:* str

---





