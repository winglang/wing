bring cloud;
bring expect;

let bucket = new cloud.Bucket();
let app = std.Node.of(bucket).app;
let root = std.Node.of(bucket).root;

assert(app.workdir.endsWith(".wing"));
expect.equal(app.workdir, root.workdir);

assert(app.entrypointDir.endsWith("/sdk_tests/std") || app.entrypointDir.endsWith("\\sdk_tests\\std"));
expect.equal(app.entrypointDir, root.entrypointDir);

app.isTestEnvironment; // don't care if it's true or false, just that it compiles

expect.equal(app, root);

class SingletonBucket {
  pub static of(scope: std.IResource): cloud.Bucket {
    let uid = "SingletonBucket";
    let root = std.Node.of(scope).root;
    return unsafeCast(root.tryFindChild(uid)) ?? new cloud.Bucket() as uid in root;
  }
}

let q1 = new cloud.Queue() as "q1";
let q2 = new cloud.Queue() as "q2";
let store1 = SingletonBucket.of(q1);
let store2 = SingletonBucket.of(q2);

test "singleton" {
  store1.put("hello", "world");
  expect.equal(store2.get("hello"), "world");
}
