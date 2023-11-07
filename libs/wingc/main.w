bring cloud;
bring "./lib.w" as lib;

// assert(false);

class MyClosure {
  pub inflight another(): str {
    let ii = inflight () => {
      log("winglang.io");
      log("<a>hi</a>");
      assert(2 + 2 == 2);
    };
    ii();
    return "hello";
  }

  pub bork() {
    // lib.T.err();
  }

  inflight handle(): num {
    lib.T.err();
    this.another();
    return 42;
  }
}

let fn = new MyClosure();
fn.bork();
// let breaking = () => {assert(false);};
// breaking();

new cloud.Function(inflight () => {
  fn.another();
});

test "test" {
  fn();
}
