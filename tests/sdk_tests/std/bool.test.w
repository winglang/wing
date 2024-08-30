let assertThrows = (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    assert(actual.contains(expected));
    error = true;
  }

  assert(error);
};

let PARSE_ERROR = "unable to parse bool";

//-----------------------------------------------------------------------------
// fromJson

let t = bool.fromJson(Json.parse("true"));
assert(t == true);

assertThrows(PARSE_ERROR, () => {
  bool.fromJson(Json 123); 
});

let f = bool.fromJson(Json.parse("false"));
assert(f == false);

test "fromJson()" {
  let t = bool.fromJson(Json.parse("true"));
  assert(t == true);

  let f = bool.fromJson(Json.parse("false"));
  assert(f == false);

  try { bool.fromJson(Json 123); } catch s { assert(s.contains(PARSE_ERROR)); }
}