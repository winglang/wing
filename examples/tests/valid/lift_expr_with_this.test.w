class Foo {
  pub value: str;
  new() { this.value = "hello"; }
}

let foo_this = new Foo();
test "test" {
  assert(foo_this.value == "hello");
}
