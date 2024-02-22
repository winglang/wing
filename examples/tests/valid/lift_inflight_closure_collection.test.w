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
  assert(b1.get("k") == "v1");
};


let ar = Array<inflight ():void>[c1, c2];
test "lift closure array" {
  for c in ar {
    c();
  }
}

let map = Map<inflight ():void>{ "k1" => c1, "k2" => c2 };
test "lift closure map" {
  for c in map.values() {
    c();
  }
}

let set = Set<inflight ():void>{c1, c2};
test "lift closure set" {
  for c in set {
    c();
  }
}

let complex = [{"k1" => Set<inflight ():void>{c1, c2}}];
test "lift closure in complex collection" {
  // Use inflight variables to access the complex collection
  // to make sure we don't lift the closure, but the entire collection
  let i = 0;
  let k = "k1";
  let inner_set = complex.at(i).get("k1");
  for c in inner_set {
    c();
  }
}
