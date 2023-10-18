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

  assert(1s == 1000ms);
  assert(60s == 1m);
  assert(60m == 1h);
  assert(24h == 1d);
  assert(365d == 1y);
  assert(12mo == 1y);
  assert(3600s == 1h);
  assert(86400s == 1d);
  assert(31536000s == 1y);

  // Conversion from milliseconds to all units
  assert(duration.fromMilliseconds(1000).seconds == 1);
  assert(duration.fromMilliseconds(1000).minutes == 1s.minutes);
  assert(duration.fromMilliseconds(1000).hours == 1s.hours);
  assert(duration.fromMilliseconds(1000).days == 1s.days);
  assert(duration.fromMilliseconds(1000).months == 1s.months);
  assert(duration.fromMilliseconds(1000).years == 1s.years);

  // Conversion from seconds to all units
  assert(duration.fromSeconds(60).milliseconds == 60s.milliseconds);
  assert(duration.fromSeconds(60).minutes == 1);
  assert(duration.fromSeconds(60).hours == 1m.hours);
  assert(duration.fromSeconds(60).days == 1m.days);
  assert(duration.fromSeconds(60).months == 1m.months);
  assert(duration.fromSeconds(60).years == 1m.years);

  // Conversion from minutes to all units
  assert(duration.fromMinutes(60).milliseconds == 60m.milliseconds);
  assert(duration.fromMinutes(60).seconds == 60m.seconds);
  assert(duration.fromMinutes(60).hours == 1);
  assert(duration.fromMinutes(60).days == 1h.days);
  assert(duration.fromMinutes(60).months == 1h.months);
  assert(duration.fromMinutes(60).years == 1h.years);

  // Conversion from hours to all units
  assert(duration.fromHours(24).milliseconds == 24h.milliseconds);
  assert(duration.fromHours(24).seconds == 24h.seconds);
  assert(duration.fromHours(24).minutes == 24h.minutes);
  assert(duration.fromHours(24).days == 1);
  assert(duration.fromHours(24).months == 1d.months);
  assert(duration.fromHours(24).years == 1d.years);

  // Conversion from days to all units
  assert(duration.fromDays(365).milliseconds == 365d.milliseconds);
  assert(duration.fromDays(365).seconds == 365d.seconds);
  assert(duration.fromDays(365).minutes == 365d.minutes);
  assert(duration.fromDays(365).hours == 365d.hours);
  assert(duration.fromDays(365).months == 12);
  assert(duration.fromDays(365).years == 1);

  // Conversion from months to all units
  assert(duration.fromMonths(12).milliseconds == 12mo.milliseconds);
  assert(duration.fromMonths(12).seconds == 12mo.seconds);
  assert(duration.fromMonths(12).minutes == 12mo.minutes);
  assert(duration.fromMonths(12).hours == 12mo.hours);
  assert(duration.fromMonths(12).days == 12mo.days);
  assert(duration.fromMonths(12).years == 1);

  // Conversion from years to all units
  assert(duration.fromYears(1).milliseconds == 1y.milliseconds);
  assert(duration.fromYears(1).seconds == 1y.seconds);
  assert(duration.fromYears(1).minutes == 1y.minutes);
  assert(duration.fromYears(1).hours == 1y.hours);
  assert(duration.fromYears(1).days == 1y.days);
  assert(duration.fromYears(1).months == 1y.months);

  // Testing negative values
  assert(-12ms.seconds == -12 / 1000);
  assert(-12s.seconds == -12);
  assert(-12m.seconds == -12 * 60);
  assert(-12h.seconds == -12 * 60 * 60);
  assert(-12d.seconds == -12 * 60 * 60 * 24);
  assert(-12mo.seconds == (-12 * 60 * 60 * 24 * 365) / 12);
  assert(-12y.seconds == -12 * 60 * 60 * 24 * 365);

  assert(duration.fromMilliseconds(-10).seconds == -10ms.seconds);
  assert(duration.fromMinutes(-10).seconds == -10m.seconds);
  assert(duration.fromSeconds(-10).seconds == -10s.seconds);
  assert(duration.fromHours(-10).seconds == -10h.seconds);
  assert(duration.fromDays(-10).seconds == -10d.seconds);
  assert(duration.fromMonths(-10).seconds == -10mo.seconds);
  assert(duration.fromYears(-10).seconds == -10y.seconds);

  // Testing zero
  assert(0ms.seconds == 0);
  assert(0s.seconds == 0);
  assert(0m.seconds == 0);
  assert(0h.seconds == 0);
  assert(0d.seconds == 0);
  assert(0mo.seconds == 0);
  assert(0y.seconds == 0);

  assert(duration.fromMilliseconds(0).seconds == 0ms.seconds);
  assert(duration.fromMinutes(0).seconds == 0m.seconds);
  assert(duration.fromSeconds(0).seconds == 0s.seconds);
  assert(duration.fromHours(0).seconds == 0h.seconds);
  assert(duration.fromDays(0).seconds == 0d.seconds);
  assert(duration.fromMonths(0).seconds == 0mo.seconds);
  assert(duration.fromYears(0).seconds == 0y.seconds);
}