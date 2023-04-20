bring cloud;

// User defined resource
resource Foo {
  c: cloud.Counter; // Use SDK built in resource in the user defined resource
  inflight inflight_field: num;

  init() {
    this.c = new cloud.Counter();
  }

  // Inflight init
  inflight init() {
    this.inflight_field = 123;
    // Access a cloud resource from inflight init
    this.c.inc(110);
    // Access a some method in the cloud resource's init that's not used anywhere else (to see reference binding works for init)
    this.c.dec(10);
  }

  // Inflight method
  inflight foo_inc() {
    // Call the SDK built in resource's inflight method from our inflight code
    this.c.inc();
  }

  inflight foo_get(): num {
    return this.c.peek(); 
  }

  static inflight foo_static(): str {
    return "foo static";
  }
}

enum MyEnum {
  A,
  B,
  C,
}

resource Bar {
  name: str;
  b: cloud.Bucket;
  // Use a user defined resource inside another user defined resource
  foo: Foo;
  // Use an enum inside a user defined resource to verify enum capturing works
  e: MyEnum;
  
  init(name: str, b: cloud.Bucket, e: MyEnum) {
    this.name = name;
    this.b = b;
    this.foo = new Foo();
    this.e = e;
  }

  static inflight bar_static(): str {
    return "bar static";
  }

  inflight my_method(): str {
    // Call user defined inflight code from another user defined resource
    this.foo.foo_inc();

    // Call static method in a user defined resource that's no myself
    let s = Foo.foo_static();

    // Call SDK built in resource's client
    this.b.put("foo", "counter is: ${this.foo.foo_get()}");
    return this.b.get("foo");
  }

  inflight test_type_access() {
    // We purposefully run these test in an inner scope to validate the compiler analyzes the code
    // correctly and finds type access in inner scopes.
    if true {
      // Test static method of myself
      assert(Bar.bar_static() == "bar static");
      // Test static method of another user defined resource
      assert(Foo.foo_static() == "foo static");
      // Test enum type access in inflight and enum capturing
      assert(this.e == MyEnum.B); 
    }

  }
}

let bucket = new cloud.Bucket();
let res = new Bar("Arr", bucket, MyEnum.B);
new cloud.Function(inflight () => {
  let s = res.my_method();
  assert(s == "counter is: 101");
  assert(bucket.list().length == 1);
  assert(res.foo.inflight_field == 123);
  res.test_type_access();
}) as "test";

resource BigPublisher {
  b: cloud.Bucket;
  b2: cloud.Bucket;
  q: cloud.Queue;
  t: cloud.Topic;

  init() {
    this.b = new cloud.Bucket();
    this.b2 = new cloud.Bucket() as "b2";
    this.q = new cloud.Queue();
    this.t = new cloud.Topic();

    this.t.on_message(inflight () => {
      this.b.put("foo1.txt", "bar");
    });

    this.q.add_consumer(inflight () => {
      this.b.put("foo2.txt", "bar");
    });

    this.b2.on_create(inflight () => {
      this.q.push("foo");
    });
  }

  inflight publish(s: str) {
    this.t.publish(s);
    this.q.push(s);
    this.b2.put("foo", s);
  }

  inflight getObjectCount(): num {
    return this.b.list().length;
  }
}

let bigOlPublisher = new BigPublisher();
new cloud.Function(inflight () => {
  bigOlPublisher.publish("foo");
  let count = bigOlPublisher.getObjectCount();
  // assert(count == 2); TODO: This fails due to issue: https://github.com/winglang/wing/issues/2082
}) as "test: dependency cycles";
