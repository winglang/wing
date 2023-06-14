//-----------------------------------------------------------------------------
// seconds
assert(12ms.seconds == 12 / 1000);
assert(12s.seconds == 12);
assert(12m.seconds == 12 * 60);
assert(12h.seconds == 12 * 60 * 60);
assert(12d.seconds == 12 * 60 * 60 * 24);
assert(12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12);
assert(12y.seconds == 12 * 60 * 60 * 24 * 365);

assert(std.Duration.fromMilliseconds(10).seconds == 10ms.seconds);
assert(std.Duration.fromSeconds(10).seconds == 10s.seconds);
assert(std.Duration.fromMinutes(10).seconds == 10m.seconds);
assert(std.Duration.fromHours(10).seconds == 10h.seconds);
assert(std.Duration.fromDays(10).seconds == 10d.seconds);
assert(std.Duration.fromMonths(10).seconds == 10mo.seconds);
assert(std.Duration.fromYears(10).seconds == 10y.seconds);

// TODO: https://github.com/winglang/wing/issues/1629
// test "d" {
//   let d = 12m;
// }

// TODO: https://github.com/winglang/wing/issues/2785