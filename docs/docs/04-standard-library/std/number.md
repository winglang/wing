---
title: number
id: number
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Number <a name="Number" id="@winglang/sdk.std.Number"></a>

Number.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Number.fromJson">fromJson</a></code> | Parse a number from Json. |
| <code><a href="#@winglang/sdk.std.Number.fromStr">fromStr</a></code> | Parse a number from string. |

---

##### `fromJson` <a name="fromJson" id="@winglang/sdk.std.Number.fromJson"></a>

```wing
num.fromJson(json: Json, options?: JsonValidationOptions);
```

Parse a number from Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Number.fromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to parse number from.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.std.Number.fromJson.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.std.JsonValidationOptions">JsonValidationOptions</a>

---

##### `fromStr` <a name="fromStr" id="@winglang/sdk.std.Number.fromStr"></a>

```wing
num.fromStr(str: str);
```

Parse a number from string.

###### `str`<sup>Required</sup> <a name="str" id="@winglang/sdk.std.Number.fromStr.parameter.str"></a>

- *Type:* str

to parse number from.

---





