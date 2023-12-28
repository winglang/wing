//-----------------------------------------------------------------------------
// rangeOf

let testRange = (from: num, to: num, inclusive: bool, expected: Array<num>) => {
  let var i = 0;
  if inclusive {
    for x in from..=to {
      assert(x == expected.at(i));
      i += 1;
    }
  } else {
    for x in from..to {
      assert(x == expected.at(i));
      i += 1;
    }
  }
  assert(i == expected.length);
};

let testRangeInflight = inflight (from: num, to: num, inclusive: bool, expected: Array<num>) => {
  let var i = 0;
  if inclusive {
    for x in from..=to {
      assert(x == expected.at(i));
      i += 1;
    }
  } else {
    for x in from..to {
      assert(x == expected.at(i));
      i += 1;
    }
  }
  assert(i == expected.length);
};

testRange(1, 5, true, [1, 2, 3, 4, 5]);
testRange(1, 5, false, [1, 2, 3, 4]);
testRange(1, 1, true, [1]);
testRange(1, 1, false, []);
testRange(-3, 3, true, [-3, -2, -1, 0, 1, 2, 3]);
testRange(-3, 3, false, [-3, -2, -1, 0, 1, 2]);
testRange(5, 0, true, [5, 4, 3, 2, 1, 0]);
testRange(5, 0, false, [5, 4, 3, 2, 1]);

test "ranges work" {
  testRangeInflight(1, 5, true, [1, 2, 3, 4, 5]);
  testRangeInflight(1, 5, false, [1, 2, 3, 4]);
  testRangeInflight(1, 1, true, [1]);
  testRangeInflight(1, 1, false, []);
  testRangeInflight(-3, 3, true, [-3, -2, -1, 0, 1, 2, 3]);
  testRangeInflight(-3, 3, false, [-3, -2, -1, 0, 1, 2]);
  testRangeInflight(5, 0, true, [5, 4, 3, 2, 1, 0]);
  testRangeInflight(5, 0, false, [5, 4, 3, 2, 1]);
}
