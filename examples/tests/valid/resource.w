bring cloud;

// User defined resource
class Foo {
  c: cloud.Counter; // Use SDK built in resource in the user defined resource
  inflight inflightField: num;

  init() {
    this.c = new cloud.Counter();
  }

  // Inflight init
  inflight init() {
    this.inflightField = 123;
    // Access a cloud resource from inflight init
    this.c.inc(110);
    // Access a some method in the cloud resource's init that's not used anywhere else (to see reference binding works for init)
    this.c.dec(10);
  }

  // Inflight method
  inflight fooInc() {
    // Call the SDK built in resource's inflight method from our inflight code
    this.c.inc();
  }

  inflight fooGet(): num {
    return this.c.peek(); 
  }

  static inflight fooStatic(): str {
    return "foo static";
  }
}

enum MyEnum {
  A,
  B,
  C,
}

class Bar {
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

  static inflight barStatic(): str {
    return "bar static";
  }

  inflight myMethod(): str {
    // Call user defined inflight code from another user defined resource
    this.foo.fooInc();

    // Call static method in a user defined resource that's no myself
    let s = Foo.fooStatic();
    // Call SDK built in resource's client
    this.b.put("foo", "counter is: ${this.foo.fooGet()}");
    return this.b.get("foo");
  }

  inflight testTypeAccess() {
    // We purposefully run these test in an inner scope to validate the compiler analyzes the code
    // correctly and finds type access in inner scopes.
    if true {
      // Test static method of myself
      assert(Bar.barStatic() == "bar static");
      // Test static method of another user defined resource
      assert(Foo.fooStatic() == "foo static");
      // Test enum type access in inflight and enum capturing
      assert(this.e == MyEnum.B); 
    }

  }
}

let bucket = new cloud.Bucket();
let res = new Bar("Arr", bucket, MyEnum.B);

test "test" {
  let s = res.myMethod();
  assert(s == "counter is: 101");
  assert(bucket.list().length == 1);
  assert(res.foo.inflightField == 123);
  res.testTypeAccess();
}

class BigPublisher {
  b: cloud.Bucket;
  b2: cloud.Bucket;
  q: cloud.Queue;
  t: cloud.Topic;

  init() {
    this.b = new cloud.Bucket();
    this.b2 = new cloud.Bucket() as "b2";
    this.q = new cloud.Queue();
    this.t = new cloud.Topic();

    this.t.onMessage(inflight () => {
      this.b.put("foo1.txt", "bar");
    });

    this.q.addConsumer(inflight () => {
      this.b.put("foo2.txt", "bar");
    });

    this.b2.onCreate(inflight () => {
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

test "dependency cycles" {
  bigOlPublisher.publish("foo");
  let count = bigOlPublisher.getObjectCount();
  // assert(count == 2); TODO: This fails due to issue: https://github.com/winglang/wing/issues/2082
}
