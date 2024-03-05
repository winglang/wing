// Inflight closures need to be qualified with `handle` to correct set up their permissions
// Make sure this happens when they are used in collections too.

bring cloud;

let b1 = new cloud.Bucket() as "b1";
b1.addObject("k", "v1");
let b2 = new cloud.Bucket() as "b2";
b2.addObject("k", "v2");

let c1 = inflight () => {
  assert(b1.get("k") == "v1");
};

let c2 = inflight () => {
  assert(b2.get("k") == "v2");
};


let ar = Array<inflight ():void>[c1, c2];
// Define an explicit cloud.Function that'll be used in the test. This is so
// when generating terraform snapshots we'll see the correct permissions.
// Writing the test directly in the `test` statement will skip them when
// generating the tf-aws snapshots.
let f1 = new cloud.Function(inflight () => {
  for c in ar {
    c();
  }
}) as "f1";
test "lift closure array" {
  f1.invoke();
}

let map = Map<inflight ():void>{ "k1" => c1, "k2" => c2 };
let f2 = new cloud.Function(inflight () => {
  for c in map.values() {
    c();
  }
}) as "f2";
test "lift closure map" {
  f2.invoke();
}

let set = Set<inflight ():void>[c1, c2];
let f3 = new cloud.Function(inflight () => {
  for c in set {
    c();
  }
}) as "f3";
test "lift closure set" {
  f3.invoke();
}

let complex = [{"k1" => Set<inflight ():void>[c1, c2]}];
let f4 = new cloud.Function(inflight () => {
  // Use inflight variables to access the complex collection
  // to make sure we don't lift the closure, but the entire collection
  let i = 0;
  let k = "k1";
  for c in complex.at(i).get(k) {
    c();
  }
}) as "f4";
test "lift closure in complex collection" {
  f4.invoke();
}
