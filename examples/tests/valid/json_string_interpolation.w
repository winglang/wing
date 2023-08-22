let obj = Json {
  strValue: "test",
  numValue: 1
};

let notStringifyStrValue = "string: ${obj.get("strValue")}";
assert(notStringifyStrValue == "string: test");
let stringifyNumValue = "number: ${obj.get("numValue")}";
assert(stringifyNumValue == "number: 1");
