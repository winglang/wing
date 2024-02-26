bring math;

// 2 x 2 x 2 = 8
assert((math.log(8) / math.log(2)) == 3);
// 5 x 5 x 5 x 5 = 625
assert((math.log(625) / math.log(5)) == 4);

test "inflight absolute" {
  let getBaseLog = (var x: num, var y: num): num => {
    return math.log(y) / math.log(x);
  };

  // 2 x 2 x 2 = 8
  assert(getBaseLog(2, 8) == 3);
  // 5 x 5 x 5 x 5 = 625
  assert(getBaseLog(5, 625) == 4);
}
