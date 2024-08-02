bring cloud;

if true {
  let x = 2;
  let f = false;
  if true && x + 2 == 4 {
    if true && x + 3 == 4 {
      assert(false);
    } else if true && x + 3 == 6 {
      assert(false);
    } else if false || x + 3 == 5 {
      assert(true);
    } else if !f {
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
      } else if true && x + 3 == 6 {
        assert(false);
      } else if false || x + 3 == 5 {
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
  } else if b != nil {
    assert(true);
  } else if let e = c {
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
  } else if let e = c {
    assert(true);
  } else if b != nil {
    assert(false);
  } else {
    assert(false);
  }
}


