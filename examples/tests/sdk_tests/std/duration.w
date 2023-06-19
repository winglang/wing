//-----------------------------------------------------------------------------
// seconds
assert(12ms.seconds == 12 / 1000);
assert(12s.seconds == 12);
assert(12m.seconds == 12 * 60);
assert(12h.seconds == 12 * 60 * 60);
assert(12d.seconds == 12 * 60 * 60 * 24);
assert(12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12);
assert(12y.seconds == 12 * 60 * 60 * 24 * 365);

assert(duration.fromMilliseconds(10).seconds == 10ms.seconds);
assert(duration.fromMinutes(10).seconds == 10m.seconds);
assert(duration.fromSeconds(10).seconds == 10s.seconds);
assert(duration.fromHours(10).seconds == 10h.seconds);
assert(duration.fromDays(10).seconds == 10d.seconds);
assert(duration.fromMonths(10).seconds == 10mo.seconds);
assert(duration.fromYears(10).seconds == 10y.seconds);

assert(1s.milliseconds == 1000);
assert(1s.minutes == 1 / 60);
assert(1s.hours == 1 / (60 * 60));
assert(1s.days == 1 / (60 * 60 * 24));
assert(1s.months == 1 / ((60 * 60 * 24 * 365) / 12));
assert(1s.years == 1 / (60 * 60 * 24 * 365));

test "duration" {
  // TODO: https://github.com/winglang/wing/issues/1629
  // assert(12m.seconds == 12 * 60);
  assert(duration.fromMinutes(12).seconds == 12 * 60);
}

// TODO: https://github.com/winglang/wing/issues/2785