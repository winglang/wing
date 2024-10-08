bring cloud;

class Util {
  pub extern "./top_level_await.mjs" static inflight double(value: num): num;
}

test "foo" {
  log(Util.double(10));
}

