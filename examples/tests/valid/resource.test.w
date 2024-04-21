bring cloud;
bring util;

// User defined resource
class Foo {
  c: cloud.Counter; // Use SDK built in resource in the user defined resource
  pub inflight inflightField: num;

  new() {
    this.c = new cloud.Counter();
  }

  // Inflight init
  inflight new() {
    this.inflightField = 123;
    // Access a cloud resource from inflight init
    this.c.inc(110);
    // Access a some method in the cloud resource's init that's not used anywhere else (to see reference binding works for init)
    this.c.dec(10);
  }

  // Inflight method
  pub inflight fooInc() {
    // Call the SDK built in resource's inflight method from our inflight code
    this.c.inc();
  }

  pub inflight fooGet(): num {
    return this.c.peek(); 
  }

  pub static inflight fooStatic(): str {
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
  pub foo: Foo;
  // Use an enum inside a user defined resource to verify enum capturing works
  e: MyEnum;
  
  new(name: str, b: cloud.Bucket, e: MyEnum) {
    this.name = name;
    this.b = b;
    this.foo = new Foo();
    this.e = e;
  }

  static inflight barStatic(): str {
    return "bar static";
  }

  pub inflight myMethod(): str {
    // Call user defined inflight code from another user defined resource
    this.foo.fooInc();

    // Call static method in a user defined resource that's no myself
    let s = Foo.fooStatic();
    // Call SDK built in resource's client
    this.b.put("foo", "counter is: {this.foo.fooGet()}");
    return this.b.get("foo");
  }

  pub inflight testTypeAccess() {
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
  log(s);

  // TODO: https://github.com/winglang/wing/issues/3244
  assert(s == "counter is: 201"); // Supposed to be: assert(s == "counter is: 101");

  assert(bucket.list().length == 1);
  assert(res.foo.inflightField == 123);
  res.testTypeAccess();
}

class BigPublisher {
  b: cloud.Bucket;
  b2: cloud.Bucket;
  q: cloud.Queue;
  t: cloud.Topic;

  new() {
    this.b = new cloud.Bucket();
    this.b2 = new cloud.Bucket() as "b2";
    this.q = new cloud.Queue();
    this.t = new cloud.Topic();

    this.t.onMessage(inflight () => {
      this.b.put("foo1.txt", "bar");
    });

    this.q.setConsumer(inflight () => {
      this.b.put("foo2.txt", "bar");
    });

    this.b2.onCreate(inflight () => {
      this.q.push("foo");
    });
  }

  pub inflight publish(s: str) {
    this.t.publish(s);
    this.q.push(s);
    this.b2.put("foo", s);
  }

  pub inflight getObjectCount(): num {
    return this.b.list().length;
  }
}

let bigOlPublisher = new BigPublisher();

test "dependency cycles" {
  bigOlPublisher.publish("foo");

  util.waitUntil(inflight () => {
    let count = bigOlPublisher.getObjectCount();
    return count == 2;
  });
  assert(bigOlPublisher.getObjectCount() == 2);
}

// Scope and ID tests
class Dummy {
  pub static getInstance(scope: Dummy): Dummy {
    return new Dummy() as "StaticDummy" in scope;
  }
}
class ScopeAndIdTestClass {
  new() {
    // Create a Dummy in my scope
    let d1 = new Dummy();
    assert(d1.node.path.endsWith("/ScopeAndIdTestClass/Dummy"));
    // Create a Dummy in someone else's scope
    let d2 = new Dummy() in d1;
    assert(d2.node.path.endsWith("/ScopeAndIdTestClass/Dummy/Dummy"));
    // Create a Dummy in someone else's scope (reference)
    let d3 = new Dummy() in Dummy.getInstance(d2);
    assert(d3.node.path.endsWith("/ScopeAndIdTestClass/Dummy/Dummy/StaticDummy/Dummy"));
    // Generate multiple Dummys with different id's
    for i in 0..3 {
      let x = new Dummy() as "tc{i}";
      let expected_path = "/ScopeAndIdTestClass/tc{i}";
      assert(x.node.path.endsWith(expected_path));
    }
  }
}
new ScopeAndIdTestClass();
