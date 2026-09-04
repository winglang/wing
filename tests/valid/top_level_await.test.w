bring cloud;

class Util {
  pub extern "./top_level_await.js" static inflight double(value: num): num;
}

test "top-level await in inflight extern" {
  assert(Util.double(2) == 4);
}
