bring cloud;

// User defined resource
class Foo {
  c: cloud.Counter; // Use SDK built in resource in the user defined resource
  inflight inflightField: num;

  init() {
    this.c = new cloud.Counter();
  }

  inflight init() {
    this.inflightField = 123;
    // Access a cloud resource from inflight init
    this.c.inc(110);
    // Access a some method in the cloud resource's init that's not used anywhere else (to see reference binding works for init)
    this.c.dec(10);
  }

  // Our resource has an inflight method
  inflight fooInc() {
    // Call the SDK built in resource's inflight method from our inflight code
    this.c.inc();
  }

  inflight fooGet(): num {
    return this.c.peek(); 
  }
}

class Bar {
  name: str;
  b: cloud.Bucket;
  // Use a user defined resource inside another user defined resource
  foo: Foo;
  
  init(name: str, b: cloud.Bucket) {
    this.name = name;
    this.b = b;
    this.foo = new Foo();
  }

  inflight myMethod(): str {
    // Call user defined inflight code from another user defined resource
    this.foo.fooInc();
    // Call SDK built in resource's client
    this.b.put("foo", "counter is: ${this.foo.fooGet()}");
    return this.b.get("foo");
  }
}

let bucket = new cloud.Bucket();
let res = new Bar("Arr", bucket);
new cloud.Function(inflight () => {
  let s = res.myMethod();
  assert(s == "counter is: 101");
  assert(bucket.list().length == 1);
  assert(res.foo.inflightField == 123);
}) as "test";

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
new cloud.Function(inflight () => {
  bigOlPublisher.publish("foo");
  let count = bigOlPublisher.getObjectCount();
  // assert(count == 2); TODO: This fails due to issue: https://github.com/winglang/wing/issues/2082
}) as "test: dependency cycles";