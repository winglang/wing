// Some inflight object with a method
inflight class Foo {
  pub do():num {
    return 1337;
  }
}

let foo = inflight (): Foo => {
  // Return an object with a method
  return new Foo();
};

test "test qualify closure returning an inflight object" {
  // Call the inflight handler and then call a method on the result in a single satatement.
  // Here we expect the `handle` method to qualify `foo`'s lift and no other qualfications.
  assert(foo().do() == 1337);
}

bring cloud;

let b = new cloud.Bucket();
let bar = inflight (): cloud.Bucket => {
  return b;
};

test "test qualify closure returning a preflight object" {
  lift {b: put} {
    // Call the inflight handler and then call a method on the result in a single satatement.
    // Here we expect the `handle` method to qualify `bar`'s lift and no other qualfications.
    bar().put("a", "value");
  }
  assert(b.get("a") == "value");
}
