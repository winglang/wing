//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2785
//-----------------------------------------------------------------------------
bring cloud;

test "get()" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  };

  let JSON_PROPERTY_DOES_NOT_EXIST_ERROR = "Json property does not exist";
  let obj = Json { a: 1, b: 2 };
  let mutObj = MutJson { x: 1, y: 2 };

  assert(obj.get("b") == 2);
  assert(mutObj.get("y") == 2);

  assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, () => {
    obj.get("c");
  });
  assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, () => {
    mutObj.get("z");
  });
}

test "set()" {
  let obj = MutJson { a: 1 };
  obj.set("b", 2);
  assert(obj.get("b") == 2);
}

//-----------------------------------------------------------------------------
// setAt() & getAt()
// let d = MutJson { d: 3 };
// a.setAt(2, d);
// let e = a.getAt(2);
// assert(e.get("d") == 3);

// test "setAt()" {
//   let x = MutJson { a: 1 };
//   let a = MutJson { c: 3 };
//   x.setAt(2, a);
//   let d = x.getAt(2);
//   assert(d.get("c") == 3);
// }

//-----------------------------------------------------------------------------
// tryParse()
assert(Json.tryParse(nil) == nil);
assert(Json.tryParse("boom") == nil);
assert(Json.tryParse("") == nil);

/*
Will add test later:
test "setWithNonMutJsonObject()" {
let var error = "";
try {
    let f = MutJson { e: 4 };
    f.set("f", 9);
 } catch e {
     error = e;
 }

 log(error);
 assert(error == "");
}
*/

//-----------------------------------------------------------------------------
// stringify()

test "stringify()" {
  let obj = Json { a: 1, b: 2 };

  let stringified = Json.stringify(obj);
  let stringifiedIndent = Json.stringify(obj, indent: 2);

  assert(stringified == "{\"a\":1,\"b\":2}");
  assert(stringifiedIndent == "{\n  \"a\": 1,\n  \"b\": 2\n}");
}