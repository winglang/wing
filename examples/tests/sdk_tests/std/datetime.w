bring cloud;
bring util;
bring math;

// check that dates in different timezones are comparable
let d1 = datetime.systemNow();
let d2 = d1.toUtc();
assert(d1.timestampMs == d2.timestampMs);

// create a date from an ISO timestamp
let d3 = datetime.fromIso("2023-07-18T20:18:25.177+03:00");

assert(d3.timestampMs == 1689700705177);
assert(d3.hours == 17);
assert(d3.min == 18);
assert(d3.sec == 25);
assert(d3.ms == 177);
assert(d3.dayOfMonth == 18);
assert(d3.dayOfWeek == 2);
assert(d3.month == 6);
assert(d3.year == 2023);

// create a date from components
let d4 = datetime.fromComponents(year: 2023, month: 6, day: 18, hour: 19, min: 18, sec: 25, ms: 177, tz: -120);

assert(d4.timezone == -120);
assert(d4.timestampMs == 1689700705177);
assert(d4.hours == 19);
assert(d4.min == 18);
assert(d4.sec == 25);
assert(d4.ms == 177);
assert(d4.dayOfMonth == 18);
assert(d4.dayOfWeek == 2);
assert(d4.month == 6);
assert(d4.year == 2023);

assert(d4.toUtc().hours == (d4.hours + (d4.timezone / 60)));

test "inflight datetime" {
  // check that dates in different timezones are comparable
  let d5 = datetime.systemNow();
  let d6 = d5.toUtc();
  assert(d5.timestampMs == d6.timestampMs);

  let d7 = datetime.fromIso("2023-07-18T20:18:25.177-03:00");
  let d8 = datetime.fromComponents(year: 2023, month: 6, day: 18, hour: 20, min: 18, sec: 25, ms: 177, tz: 180);  // UTC-3:00

  assert(d7.timestampMs == 1689722305177);
  assert(d7.hours == 23);
  assert(d7.min == 18);
  assert(d7.sec == 25);
  assert(d7.ms == 177);
  assert(d7.dayOfMonth == 18);
  assert(d7.dayOfWeek == 2);
  assert(d7.month == 6);
  assert(d7.year == 2023);
  assert(d8.hours == 20);

  // check that timezone conversions work
  assert(math.floor(d7.timestamp) == math.floor(d8.timestamp));
  assert(d4.toUtc().hours == (d4.hours + (d4.timezone / 60)));
  assert(d8.toUtc().hours == (d8.hours + (d8.timezone / 60)));

  // check that systemNow doesn't return a fixed value
  let beforeSleep = datetime.systemNow();
  util.sleep(1s);
  let afterSleep = datetime.systemNow();
  assert(afterSleep.timestampMs - beforeSleep.timestampMs > 0);
}
