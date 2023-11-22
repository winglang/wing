bring cloud;
bring expect;

let bucket = new cloud.Bucket();
let app = std.Node.of(bucket).app;

assert(app.workdir.endsWith(".wing"));
assert(app.isTestEnvironment);
assert(app.entrypointDir.endsWith("/sdk_tests/std"));
expect.equal(std.Node.of(app).id, "root");

class Singleton {
  pub static of(scope: std.IResource): Singleton {
    let uid = "MySingleton";
    let root = std.Node.of(scope).root;
    
    return unsafeCast(root.tryFindChild(uid)) ?? new Singleton() as uid in root;
  }

  s: cloud.Bucket;

  new() {
    this.s = new cloud.Bucket() as "central_store";
  }

  pub inflight store(data: str) {
    this.s.put("data.txt", data);
  }

  pub inflight load(): str? {
    return this.s.tryGet("data.txt");
  }
}

let q1 = new cloud.Queue() as "q1";
let q2 = new cloud.Queue() as "q2";
let store1 = Singleton.of(q1);
let store2 = Singleton.of(q2);

test "singleton" {
  store1.store("hello");
  expect.equal(store2.load(), "hello");
}
