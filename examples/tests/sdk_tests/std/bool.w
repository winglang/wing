//-----------------------------------------------------------------------------
// fromJson

let t = bool.fromJson(Json.parse("true"));
assert(t == true);

let f = bool.fromJson(Json.parse("false"));
assert(f == false);

test "fromJson()" {
    let t = bool.fromJson(Json.parse("true"));
    assert(t == true);

    let f = bool.fromJson(Json.parse("false"));
assert(f == false);
}