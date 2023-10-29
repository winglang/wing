class MyClosure {
  pub inflight another(): str {
    assert(false);
    return "hello";
  }

  inflight handle(): num {
    this.another();
    return 42;
  }
}

let fn = new MyClosure();
let breaking = () => {assert(false);};
breaking();

test "test" {
  fn();
}
