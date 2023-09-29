let obj = Json {
  strValue: "test",
  numValue: 1
};

let notStringifyStrValue = "string: ${obj.get("strValue")}";
assert(notStringifyStrValue == "string: \"test\"");
let stringifyNumValue = "number: ${obj.get("numValue")}";
assert(stringifyNumValue == "number: 1");

// string interpolation of Json is equivalent to calling Json.stringify
assert("${obj}" == Json.stringify(obj));
assert("${obj.get("strValue")}" == Json.stringify(obj.get("strValue")));

assert(obj.get("strValue") == Json.parse(Json.stringify(obj.get("strValue"))));
assert(obj.get("strValue") == Json.parse("${obj.get("strValue")}"));
