//-----------------------------------------------------------------------------
// fromJson

assert(num.fromJson(Json 12) == 12);

test "fromJson" {
  assert(num.fromJson(Json 123) == 123);
}


//-----------------------------------------------------------------------------
// fromStr

assert(num.fromStr("42") == 42);

test "fromStr" {
  assert(num.fromStr("888") == 888);
}
