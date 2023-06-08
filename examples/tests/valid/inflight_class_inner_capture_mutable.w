bring cloud;

test "inner inflight class capture immutable" {
  let y = MutArray<num>[1];
  let var i = 10;

  class Inner {
    dang() -> num {
      y.push(2);

      // TODO: this should be a compiler error (it doesn't)
      // see https://github.com/winglang/wing/issues/2729
      i = i + 1;

      return y.at(0) + 10;
    }
  }

  assert(new Inner().dang() == 11);
  assert(y.at(1) == 2);
  
  assert(i == 10); // we cannot reassign from within the inflight class above, so this should hold
}