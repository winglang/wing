let jsonNumber  = Json 123;
let jsonBool    = Json true;
let jsonArray   = Json [ 1, 2, 3 ];
let jsonObj     = Json { boom: 123 };
let jsonMutObj = MutJson {
  hello: 123,
  world: [ 1, "cat", 3 ],
  "boom boom": { hello: 1233 }
};

let message = "Coolness";

// Reassign
jsonMutObj.set("hello", message);

assert(jsonMutObj.get("hello") == message);
// Support `dot` and `[]` Access https://github.com/winglang/wing/issues/1680
// assert(jsonMutObj.hello == message)
// assert(jsonMutObj["hello"] == message)

// Assignment from natives
let someNumber: num = 999;

let jj = Json someNumber;
let jj1 = Json {foo: someNumber};
let jj2 = Json [ someNumber, {bar: someNumber} ];

let getStr = () -> str {
  return "hello";
};

let jj3 = Json getStr();
assert(jj3 == Json "hello");

class Foo {
  SumStr: str;
  init() {
    this.SumStr = "wow!";
  }
}

let f = new Foo();
let jj4 = Json f.SumStr;
assert(jj4 == Json "wow!");

let someJson = MutJson {
  x: someNumber
};

assert(someJson.get("x") == someNumber);
someJson.set("x", 111);
assert(someJson.get("x") == 111);

// assign Map to Json
let x: Json = {cool: "beans"};

// Nested Gets and Sets
let nestedJson = MutJson {
  a: "hello",
  b: {
    c: "world",
    d: {
      foo: "foo",
      bar: 123
    }
  }
};

nestedJson.get("b").get("d").set("foo", "tastic");
assert(nestedJson.get("b").get("d").get("foo") == "tastic");
assert(nestedJson.get("b").get("d").get("bar") == 123);

// Heterogenous Array
let b = "buckle";
let arr = Json [1, 2, b, "my", "shoe", 3, 4, [ "shut", "the", "door"]];
assert(arr.getAt(0) == 1);
assert(arr.getAt(2) == b);
assert(arr.getAt(7).getAt(0) == "shut");

// Nested Json with mixed Json and non-json literals
Json {
  a: Json [1, 2, "world"],
  b: [1, 2, "world"], // Verify the type-checker knows we're still in a Json after handling `a` above
};

// Empty Jsons
let emptyJson = Json {};
let emptyJsonArr = Json [];

// start mutjson empty
let emptyMutJson = MutJson {};
let emptyMutJsonArr = MutJson [];

// then get crazy with it
emptyMutJson.set("cool", MutJson{a: 1, b: 2});
emptyMutJson.get("cool").set("a", 3);

emptyMutJsonArr.setAt(0, MutJson{a: 1, b: 2});
emptyMutJsonArr.getAt(0).set("a", 3);

// Wanna see something nuts?
let theTowerOfJson = MutJson {
  a: {},
  b: {
    c: {},
    d: [
      [
        [
          {}
        ]
      ],
    ],
  },
  e: {
    f: {
      g: {},
      h: [
        {},
        []
      ]
    },
  }
};

theTowerOfJson.get("e").get("f").get("h").getAt(0).set("a", 1);
let thatSuperNestedValue = theTowerOfJson.get("e").get("f").get("h").getAt(0).get("a");
assert(num.fromJson(thatSuperNestedValue) == 1);

// Unested Json Arrays
let unestedJsonArr = Json [1, 2, 3];
assert(unestedJsonArr.getAt(0) == 1);