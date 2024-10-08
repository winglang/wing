// This file was auto generated from an example found in: 36-reflection.md_example_1
// Example metadata: {"valid":true}
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
