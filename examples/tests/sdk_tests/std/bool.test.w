bring "./../../valid/assertions.w" as assertions;

let PARSE_ERROR = "unable to parse bool:\n- instance is not of a type(s) boolean";

//-----------------------------------------------------------------------------
// fromJson

let t = bool.fromJson(Json.parse("true"));
assert(t == true);

assertions.PreflightAssert.throws(PARSE_ERROR, () => {
  bool.fromJson(Json 123); 
});

let f = bool.fromJson(Json.parse("false"));
assert(f == false);

test "fromJson()" {
  let t = bool.fromJson(Json.parse("true"));
  assert(t == true);

  let f = bool.fromJson(Json.parse("false"));
  assert(f == false);

  assertions.Assert.throws(PARSE_ERROR, () => {
    bool.fromJson(Json 123);
  });
}