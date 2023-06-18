//-----------------------------------------------------------------------------
// seconds

assert(12m.seconds == 12 * 60);
assert(duration.fromMinutes(12).seconds == 12 * 60);

test "duration" {
  // TODO: https://github.com/winglang/wing/issues/1629
  // assert(12m.seconds == 12 * 60);
  assert(duration.fromMinutes(12).seconds == 12 * 60);
}

// TODO: https://github.com/winglang/wing/issues/2785