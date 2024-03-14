---
title: jsonSchema
id: jsonSchema
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

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






