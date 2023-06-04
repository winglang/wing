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

//-----------------------------------------------------------------------------
// fromJson (static)

let PARSE_ERROR = "unable to parse number 123 as a string";

assert(str.fromJson(Json "Hello") == "Hello");
assertThrows(PARSE_ERROR, () => {
  str.fromJson(Json 123); 
});

test "fromJson" {
  assert(str.fromJson(Json "World") == "World");
  try { str.fromJson(Json 123); } catch s { assert(s == PARSE_ERROR); }
}

//-----------------------------------------------------------------------------
// length

assert("hello".length == 5);
assert("".length == 0);

test "length" {
  assert("hello".length == 5);
  assert("".length == 0);
}

//-----------------------------------------------------------------------------
// at()

assert("boom".at(2) == "o");
//TODO: assertThrows("ERROR", () => { "hey".at(-1); });

test "at()" {
  assert("boom".at(0) == "b");
}

//-----------------------------------------------------------------------------
// TODO: missing tests

// concat()
// endsWith()
// indexOf()
// lowercase()
// split()
// startsWith()
// substring()
// trim()
// uppercase()
