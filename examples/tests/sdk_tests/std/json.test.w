//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2785
//-----------------------------------------------------------------------------
bring cloud;

test "has()" {
  let obj = Json { key1: 1, key2: 2};

  assert(Json.has(obj, "key1") == true);
  assert(Json.has(obj, "key3") == false);
}

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

test "parse()" {
  let obj = Json { key1: 1, key2: 2};
  let String = "\{\"key\":1,\"key2\":2}";

  assert(Json.parse("123") == 123);
  assert(Json.parse("true") == true);
  assert(Json.parse("\"foo\"") == "foo");
  /**
   * To be fixed in the compiler
   * see https://github.com/winglang/wing/issues/4131
  */
  // assert(Json.parse("[1,5,false]") == "[1,5,false]");
  // assert(Json.parse(String) == obj);
  /**
   * To uncomment once Json null is implemented
   * see https://github.com/winglang/wing/issues/1819
  */
  // assert(Json.parse("null") == null);
}

test "tryParse()" {
  let obj = Json { key1: 1, key2: 2};
  let String = "\{\"key\":1,\"key2\":2}";

  assert(Json.tryParse("123") == 123);
  assert(Json.tryParse("true") == true);
  assert(Json.tryParse("\"foo\"") == "foo");
  /**
   * To be fixed in the compiler
   * see https://github.com/winglang/wing/issues/4131
  */
  // assert(Json.tryParse("[1,5,false]") == "[1,5,false]");
  // assert(Json.tryParse(String) == obj);
  /**
   * To uncomment once Json null is implemented
   * see https://github.com/winglang/wing/issues/1819
  */
  // assert(Json.tryParse("null") == null);
  assert(Json.tryParse("foo") == nil);
  assert(Json.tryParse("") == nil);
  assert(Json.tryParse(nil) == nil);
}

test "deepCopy(), deepCopyMut()" {
  let original = Json ({
    "string": "wing",
    "number": 123,
    "array": [1, 2, 3],
    "true": true,
    "false": false,
    "object": {
      "key1": "value1",
      "key2": 2,
      "key3": false,
      "key5": [3, 2, 1]
    }
  });
  let mutation = Json{ key1: 1, key2: 2};

  let copy = Json.deepCopy(original);
  let copyMut = Json.deepCopyMut(original);

  assert(copy == copyMut);
  copyMut.set("object", mutation);
  assert(copy != copyMut);

  assert(copyMut.get("object") == mutation);
}

test "delete() for MutJson" {
  let mutObj = MutJson { x: 1, y: 2 };
  mutObj.delete("x");
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

  let JSON_PROPERTY_DOES_NOT_EXIST_ERROR = "Json property \"x\" does not exist";
  assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, () => {
    mutObj.get("x");
  });
  assert(mutObj.delete("random key that doesn't exist") == true);
}