bring cloud;

if true {
  let x = 2;
  let f = false;
  if true && x + 2 == 4 {
    if true && x + 3 == 4 {
      assert(false);
    } elif true && x + 3 == 6 {
      assert(false);
    } elif false || x + 3 == 5 {
      assert(true);
    } elif !f {
      assert(!!!f);
    } else {
      assert(false);
    }
  } else {
    assert(false);
  }
}

test "test" {
  if true {
    let x = 2;
    if true && x + 2 == 4 {
      if true && x + 3 == 4 {
        assert(false);
      } elif true && x + 3 == 6 {
        assert(false);
      } elif false || x + 3 == 5 {
        assert(true);
      } else {
        assert(false);
      }
    } else {
      assert(false);
    }
  }
}
