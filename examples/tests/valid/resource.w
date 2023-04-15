bring cloud;

// User defined resource
resource Foo {
  c: cloud.Counter; // Use SDK built in resource in the user defined resource
  inflight inflight_field: num;

  init() {
    this.c = new cloud.Counter();
  }

  inflight init() {
    this.inflight_field = 123;
    // Access a cloud resource from inflight init
    this.c.inc(100); 
  }

  // Our resource has an inflight method
  inflight foo_inc() {
    // Call the SDK built in resource's inflight method from our inflight code
    this.c.inc();
  }

  inflight foo_get(): num {
    return this.c.peek(); 
  }
}

resource Bar {
  name: str;
  b: cloud.Bucket;
  // Use a user defined resource inside another user defined resource
  foo: Foo;
  
  init(name: str, b: cloud.Bucket) {
    this.name = name;
    this.b = b;
    this.foo = new Foo();
  }

  inflight my_method(): str {
    // Call user defined inflight code from another user defined resource
    this.foo.foo_inc();
    // Call SDK built in resource's client
    this.b.put("foo", "counter is: ${this.foo.foo_get()}");
    return this.b.get("foo");
  }
}

let bucket = new cloud.Bucket();
let res = new Bar("Arr", bucket);
new cloud.Function(inflight () => {
  let s = res.my_method();
  assert(s == "counter is: 101");
  assert(bucket.list().length == 1);
  assert(res.foo.inflight_field == 123);
}) as "test";
