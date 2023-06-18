class A {
  static inflight b(): str {
    return "my_str";
  }
}

test "test" {
  assert(A.b() == "my_str");
}
