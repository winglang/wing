bring cloud;

// Assignment to native types
let j = Json "Hello";

let n: num = j;
//           ^ Expected type to be "num", but got "Json" instead
let b: bool = j;
//            ^ Expected type to be "bool", but got "Json" instead
let m: Map<str> = j;
//                ^ Expected type to be "Map<str>", but got "Json" instead
let s2: Set<str> = j;
//                 ^ Expected type to be "Set<str>", but got "Json" instead
let a: Array<str> = j;
//                  ^ Expected type to be "Array<str>", but got "Json" instead

// Immutable Json
let foreverJson = Json {a: "hello"};
foreverJson.set("a", "world!");
//          ^^^ Member "set" doesn't exist in "Json" (TODO: better error message https://github.com/winglang/wing/issues/1660)

let bkt = new cloud.Bucket();
let jArr = Json [bkt];
//               ^^^ Expected "Json" elements to be Json Value (https://www.json.org/json-en.html), but got "Bucket" which is not Json Value

let jsonObj = Json { boom: bkt };
//                         ^^^ Expected "Json" elements to be Json Value (https://www.json.org/json-en.html), but got "Bucket" which is not Json Value

let jsonIncomplete = Json;
//                   ^^^^ Expected a "Json" element

let tryNum: num? = j.tryAsStr();
//                 ^^^^^^^^^^^^ Expected type to be "num?", but got "str?" instead

let tryStr: str? = j.tryAsBool();
//                 ^^^^^^^^^^^^^ Expected type to be "str?", but got "bool?" instead

let tryBool: bool? = j.tryAsNum();
//                   ^^^^^^^^^^^^ Expected type to be "bool?", but got "num?" instead

struct InnerStructyJson  {
  good: bool;
}

struct StructyJson {
  foo: str;
  stuff: Array<num>;
  maybe: InnerStructyJson;
}

struct StructyJsonMap {
  stuff: Map<num>;
}

let notJsonMissingField: StructyJson = {
  foo: "bar",
  stuff: [],
};
//^ Missing required field "maybe" from "StructyJson"

let notJsonMissingFieldArray = {
  "1" => Set<Array<StructyJson>> [[
    {
      foo: "bar",
      stuff: [],
    }
  //^ Missing required field "maybe" from "StructyJson"
  ]]
};


let notJsonBadNesting: StructyJson = {
  foo: "bar",
  stuff: [1, 2, 3],
  maybe: {
    good: 2,
//        ^ Expected type to be "bool", but got "num" instead
  }
};

let notJsonBadArray: StructyJson = {
  foo: "bar",
  stuff: [1, "hi", 3],
//           ^^^^ Expected type to be "num", but got "str" instead
  maybe: {
    good: true,
  }
};


let notJsonMap: StructyJsonMap = {
  stuff: {
    a: 1,
    b: "",
//     ^^ Expected type to be "num", but got "str" instead
    c: 3,
  },
};

let var mutableJson = {
  foo: "bar",
  stuff: [1, 2, 3],
  maybe: {
    good: true,
  }
};
let mutableJsonStruct: StructyJson = mutableJson;
//                                   ^^^^^^^^^^^ Expected type to be "StructyJson", but got "Json" instead

let notAStruct = {
  b: new cloud.Bucket()
//   ^^^^^^^^^^^^^^^^^^ "Bucket" is not a legal JSON value
};

let isBucket = Json new cloud.Bucket();
//                  ^^^^^^^^^^^^^^^^^^ "Bucket" is not a legal JSON value
