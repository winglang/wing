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

if true {
  let a: str? = nil;
  let b: str? = "b";
  let c: str? = "c";
  if let d = a {
    assert(false);
  } elif b? {
    assert(true);
  } elif let e = c {
    assert(false);
  } else {
    assert(false);
  }
}

if true {
  let a: str? = nil;
  let b: str? = nil;
  let c: str? = "c";
  if let d = a {
    assert(false);
  } elif let e = c {
    assert(true);
  } elif b? {
    assert(false);
  } else {
    assert(false);
  }
}


