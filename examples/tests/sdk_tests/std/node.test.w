bring cloud;
bring expect;

let bucket = new cloud.Bucket();
let app = nodeof(bucket).app;
assert(app.workdir.endsWith(".wing"));
assert(app.entrypointDir.endsWith("/sdk_tests/std") || app.entrypointDir.endsWith("\\sdk_tests\\std"));
app.isTestEnvironment; // don't care if it's true or false, just that it compiles

class SingletonBucket {
  pub static of(scope: std.IResource): cloud.Bucket {
    let uid = "SingletonBucket";
    let root = nodeof(scope).root;
    let root_node = nodeof(root);
    return unsafeCast(root_node.tryFindChild(uid)) ?? new cloud.Bucket() as uid in root;
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
