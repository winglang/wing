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

  let JSON_PROPERTY_DOES_NOT_EXIST_ERROR = "Json property \"c\" does not exist";
  let obj = Json { a: 1, b: 2 };
  let mutObj = MutJson { a: 1, b: 2 };

  assert(obj.get("b") == 2);
  assert(mutObj.get("b") == 2);

  assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, () => {
    obj.get("c");
  });
  assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, () => {
    mutObj.get("c");
  });
}

test "getAt()" {
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

  let INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
  let jsonArray = Json ["foo", "bar", "baz"];
  let mutJsonArray = MutJson [1, 2, 3];

  assert(jsonArray.getAt(2) == "baz");
  assert(mutJsonArray.getAt(2) == 3);

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    jsonArray.getAt(3);
    mutJsonArray.getAt(3);
  });
}

test "set()" {
  let mutObj = MutJson { x: 1, y: 2 };

  mutObj.set("x", -1);
  mutObj.set("z", 3);

  assert(mutObj.get("x") == -1);
  assert(mutObj.get("z") == 3);
}

test "setAt()" {
  let mutJsonArray = MutJson [1, 2, 3];

  mutJsonArray.setAt(0, -1);
  mutJsonArray.setAt(3, 3);

  assert(mutJsonArray.getAt(0) == -1);
  assert(mutJsonArray.getAt(3) == 3);
}

test "stringify()" {
  let obj = Json { a: 1, b: 2 };

  let stringified = Json.stringify(obj);
  let stringifiedIndent = Json.stringify(obj, indent: 2);

  assert(stringified == "\{\"a\":1,\"b\":2}");
  assert(stringifiedIndent == "\{\n  \"a\": 1,\n  \"b\": 2\n}");
}

test "keys(), values(), entries()" {
  let obj = Json { 
    a: 1,
    b: [3, 7, 9],
    c: { foo: "bar" }
  };

  let entries = Json.entries(obj);
  let keys = Json.keys(obj);
  let values = Json.values(obj);

  let var i = 0;
  for e in entries {
    assert(e.key == keys.at(i));
    assert(e.value == values.at(i));
    i += 1;
  }
}

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