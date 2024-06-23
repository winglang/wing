bring cloud;

let jsonNumber  = Json 123;
let jsonBool    = Json true;
let jsonArray   = Json [ 1, 2, 3 ];
let jsonMap     = Json { "1" => 1, "2" => 2, "3" => 3 };
let jsonObj     = Json { boom: 123 };

for j in [jsonNumber, jsonBool, jsonArray, jsonMap, jsonObj] {
  assert(j == Json.parse(Json.stringify(j)));
}

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

let getStr = (): str => {
  return "hello";
};

let jj3 = Json getStr();
assert(jj3 == Json "hello");

class Foo {
  pub SumStr: str;
  new() {
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

let x: Json = {cool :"beans"};

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


let jsonElements = Json {
  strings: {
    single: "Hello",
    array: ["Hello", "World", "!"]
  },
  numbers: {
    one: 1,
    two: 2,
    three: 3
  },
  bools: {
    t: true,
    f: false
  }
};

if let val = jsonElements.tryGet("strings")?.tryGet("single")?.asStr() {
  assert(val == "Hello");
} else {
  // This should not happen
  assert(false);
}

if let vals = jsonElements.tryGet("strings")?.tryGet("array") {
  // Try getting an index
  if let hello = vals.tryGetAt(0) {
    assert(hello == "Hello");
  } else {
    // This should not happen
    assert(false);
  }
} else {
  // This should not happen
  assert(false);
}

if let two = jsonElements.tryGet("numbers")?.tryGet("two")?.tryAsNum() {
  assert(two + 2 == 4);
} else {
  // This should not happen
  assert(false);
}

if let truth = jsonElements.tryGet("bools")?.tryGet("t")?.tryAsBool() {
  assert(truth);
} else {
  // This should not happen
  assert(false);
}

// tryGet Chains where members are missing
if let val = jsonElements.tryGet("strings")?.tryGet("non")?.tryGet("existant")?.tryGet("element") {
  assert(false); // nothing should have been found
}

// tryGetAt chains with missing members
if let val = jsonElements.tryGet("cant")?.tryGetAt(1000)?.tryGetAt(42) {
  assert(false); // nothing should have been found
}
// Json keyword is optional
let notSpecified = {
  foo: "bar"
};

assert(notSpecified.get("foo") == "bar");

// Check that empty {} is a Json
let empty = {};
assert(empty.has("something") == false);

struct Base {
  base: str;
}

struct LastOne extends Base {
  hi: num;
}

struct InnerStructyJson  {
  good: bool;
  inner_stuff: Array<LastOne>;
}

struct StructyJson {
  foo: str;
  stuff: Array<num>;
  maybe: InnerStructyJson?;
  buckets: Array<cloud.Bucket>?;
}

let arrayStruct: Array<StructyJson> = [ { foo: "", stuff: [] } ];
let setStruct: Set<StructyJson> = Set<StructyJson>[ { foo: "", stuff: [] } ];
let mapStruct: Map<StructyJson> = { "1" => ({ foo: "", stuff: [] }) };
let deepCollectionStruct: Map<Array<Set<StructyJson>>> = { "1" => [ Set<StructyJson>[ { foo: "", stuff: [] } ] ] };

let notJsonMissingField: StructyJson = {
  foo: "bar",
  stuff: [],
};

let notJsonWithInnerArray: StructyJson = {
  foo: "bar",
  stuff: [],
  buckets: [new cloud.Bucket() as "B1InList"]
};

let notJson: StructyJson = {
  foo: "bar",
  stuff: [1, 2, 3],
  maybe: {
    good: true,
    inner_stuff: [{ hi: 1, base: "base" }]
  }
};

let var mutableJson: StructyJson = {
  foo: "bar",
  stuff: [1, 2, 3],
  maybe: {
    good: true,
    inner_stuff: [{ hi: 1, base: "base" }]
  }
};

struct HasBucket {
  a: cloud.Bucket;
}
struct HasInnerBucket {
  a: HasBucket;
}

let hasBucket: HasInnerBucket = {
  a: {
    a: new cloud.Bucket()
  }
};

let numVar = 1;
let strVar = "s";
let punnedJson1 = {numVar, strVar};
assert(punnedJson1["numVar"] == 1);
assert(punnedJson1["strVar"] == "s");
let punnedMutJson1 = MutJson {numVar};
punnedMutJson1.set("numVar", punnedMutJson1["numVar"].asNum() + 1);
assert(punnedMutJson1["numVar"] == 2);

struct StructToPun {
  numVar: num;
  strVar: str;
}
let structToPunFromJson: StructToPun = Json {numVar, strVar};
assert(structToPunFromJson.numVar == 1);
assert(structToPunFromJson.strVar == "s");