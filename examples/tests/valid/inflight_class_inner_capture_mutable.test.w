bring cloud;

test "inner inflight class capture immutable" {
  let y = MutArray<num>[1];
  let var i = 10;

  class Inner {
    pub dang(): num {
      y.push(2);
    
      // since the inner class is defined within the same scope, it is actually possible to reassign
      // `i` and all will be good with the world.
      i = i + 1;

      return y.at(0) + 10;
    }
  }

  assert(new Inner().dang() == 11);
  assert(y.at(1) == 2); 
  assert(i == 11);
}
