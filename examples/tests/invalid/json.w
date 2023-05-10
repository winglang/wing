bring cloud;

// Assignment to native types
let j = Json "Hello";
let s: str = j;
//           ^ Expected type to be "str", but got "Json" instead
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
//           ^^^ Unknown symbol "set" (TODO: better error message https://github.com/winglang/wing/issues/1660) 

let bkt = new cloud.Bucket();
let jArr = Json [bkt];
//                ^^^ Expected "Json" elements to be Json Value (https://www.json.org/json-en.html), but got "Bucket" which is not Json Value

let jsonObj = Json { boom: bkt };
//                          ^^^ Expected "Json" elements to be Json Value (https://www.json.org/json-en.html), but got "Bucket" which is not Json Value

let jsonIncomplete = Json;
//                    ^^^^ Expected a "Json" element