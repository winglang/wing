//-----------------------------------------------------------------------------
// seconds

assert(12m.seconds == 12 * 60);
assert(std.Duration.fromMinutes(12).seconds == 12 * 60);

test "duration" {
  assert(12m.seconds == 12 * 60);
  assert(std.Duration.fromMinutes(12).seconds == 12 * 60);
}

// TODO: https://github.com/winglang/wing/issues/2785