//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2785

//-----------------------------------------------------------------------------
// keys()
let m = { "hello" => 123, "world" => 99 };
let mkeys = m.keys();
assert(mkeys.length == 2);
assert(mkeys.at(0) == "hello");
assert(mkeys.at(1) == "world");

//-----------------------------------------------------------------------------
// values()
let mvalues = m.values();
assert(mvalues.length == 2);
assert(mvalues.at(0) == 123);
assert(mvalues.at(1) == 99);


//-----------------------------------------------------------------------------
// get()
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

let immutGet = { "mutable" => false };
let mutGet = MutMap<bool>{ "mutable" => true };

assert(immutGet.get("mutable") == false);
assert(mutGet.get("mutable") == true);

let KEY_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"immutable\"";
assertThrows(KEY_DOES_NOT_EXIST_ERROR, () => {
    immutGet.get("immutable");
    mutGet.get("immutable");
  });


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

    let immutGet = { "mutable" => false };
    let mutGet = MutMap<bool>{ "mutable" => true };

    assert(immutGet.get("mutable") == false);
    assert(mutGet.get("mutable") == true);

    let KEY_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"immutable\"";
    assertThrows(KEY_DOES_NOT_EXIST_ERROR, () => {
        immutGet.get("immutable");
        mutGet.get("immutable");
    });
}