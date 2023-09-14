class MyClosure {
  pub inflight another(): str {
    return "hello";
  }

  inflight handle(): num {
    return 42;
  }
}

let fn = new MyClosure();

test "test" {
  assert(fn() == 42);
  assert(fn.another() == "hello");
}
