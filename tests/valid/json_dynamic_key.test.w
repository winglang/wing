let dynamicKey = "dynamic-key-1";
let anotherKey = "another";
let url = "https://example.com";

// dynamic (interpolated) keys are evaluated at runtime
let obj = Json {
  "{dynamicKey}": "dynamic-value",
  "{anotherKey}": "another-value",
  "{url}": "url-value",
};

assert(obj.get("dynamic-key-1") == "dynamic-value");
assert(obj.get("another") == "another-value");
assert(obj.get("https://example.com") == "url-value");

// plain string and identifier keys still work
let obj2 = Json {
  literal: "hi",
  "quoted": "there",
};
assert(obj2.get("literal") == "hi");
assert(obj2.get("quoted") == "there");
