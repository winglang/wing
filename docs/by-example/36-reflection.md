---
title: Type reflection
id: type-reflection
slug: /type-reflection
sidebar_label: Type reflection
description: Type reflection
keywords: [Wing language, Type reflection]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/36-reflection.md
---

The `@type` intrinsic function returns a reflection of the type passed to it.

You can access its `.kind` property to get the kind of the type, and use various helper methods like `.asStruct()`, `.asClass()`, `.asInterface()`, etc. to access related properties.

```js playground example title="main.w"
let generateJsonSchema = (structType: std.reflect.Type): str => {
  if let st = structType.asStruct() {
    let schema = MutJson {
      type: "object",
      properties: {},
      required: []
    };

    for name in st.fields.keys() {
      let fieldSchema = MutJson {};
      let var field = st.fields[name].child;
      let var required = true;
      if let opt = field.asOptional() {
        required = false;
        field = opt.child;
      }

      if field.kind == "str" {
        fieldSchema["type"] = "string";
      } else if field.kind == "num" {
        fieldSchema["type"] = "number";
      } // ...handle other types

      schema["properties"][name] = fieldSchema;
      if required {
        // TODO: https://github.com/winglang/wing/issues/6929
        unsafeCast(schema["required"])?.push(name);
      }
    }

    return Json.stringify(schema);
  }

  throw "input must be a struct type";
};

struct User {
  name: str;
  age: num;
  email: str?;
}

log(generateJsonSchema(@type(User)));
```

```bash title="Wing console output"
# Run locally with wing console
{"type":"object","properties":{"age":{"type":"number"},"email":{"type":"string"},"name":{"type":"string"}},"required":["age","name"]}
```


