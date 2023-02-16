bring cloud;

// This resource has no inflight methods (no client) but it still needs to be captured
// so we can access its fields.
resource A {
  field: str;
  init() { this.field = "hey"; }
}

let a = new A();
new cloud.Function(inflight () => {
 assert("hey" == a.field);
}) as "test";