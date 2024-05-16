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

test "test" {
  // Call the inflight handler and then call a method on the result in a single satatement.
  // Here we expect the `handle` method to qualify `foo`'s lift and no other qualfications.
  assert(foo().do() == 1337);
}