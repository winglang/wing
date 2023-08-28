class MyClosure {
  inflight another() -> str {
    return "hello";
  }

  inflight handle() -> num {
    return 42;
  }
}

let f = new MyClosure();

test "test" {
  assert(f() == 42);
  assert(f.another() == "hello");
}
