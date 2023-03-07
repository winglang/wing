bring cloud;

// This resource has no inflight methods (no client) but we can still access its fields inflight
resource A {
  field: str;
  init() { this.field = "hey"; }
}

let a = new A();
new cloud.Function(inflight () => {
 assert("hey" == a.field);
}) as "test";