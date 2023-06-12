//-----------------------------------------------------------------------------
// seconds
assert(12s.seconds == 12);
assert(12m.seconds == 12 * 60);
assert(12h.seconds == 12 * 60 * 60);
assert(12d.seconds == 12 * 60 * 60 * 24);
assert(12mo.seconds == 12 * 2628000);
assert(12y.seconds == 12 * 31536000);

// TODO: https://github.com/winglang/wing/issues/1629
// test "d" {
//   let d = 12m;
// }

// TODO: https://github.com/winglang/wing/issues/2785