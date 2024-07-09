bring cloud;
bring ex;
bring ui;
bring util;
bring sim;

// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
//let secret = new cloud.Secret(name: "my-secret");

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();


test "Print"{
  log("Hello World!");
  assert(true);
}

test "without assertions nor prints" {
  util.sleep(10s);
}
