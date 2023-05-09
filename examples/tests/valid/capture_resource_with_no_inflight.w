bring cloud;

// This class has no inflight methods (no client) but we can still access its fields inflight
class A {
  field: str;
  init() { this.field = "hey"; }
}

let a = new A();
test "test" {
  assert("hey" == a.field);
}
