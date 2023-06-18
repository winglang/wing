test "test" {
  assert(num.fromStr("1234") == 1234);
  assert(std.Number.fromJson(123) == 123);
}
