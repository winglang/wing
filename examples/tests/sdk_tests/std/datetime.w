bring cloud;
bring util;
bring math;

let d1 = datetime.utcNow();
let d2 = datetime.systemNow();

assert(d2.toUtc().toIso() == d1.toIso());
assert(math.floor(d2.timestamp) == math.floor(d1.timestamp));

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
  let d5 = datetime.utcNow();
  let d6 = datetime.systemNow();
  
  assert(d2.timestamp == d1.timestamp);

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

  assert(math.floor(d7.timestamp) == math.floor(d8.timestamp));
  assert(d4.toUtc().hours == (d4.hours + (d4.timezone / 60)));
  assert(d8.toUtc().hours == (d8.hours + (d8.timezone / 60)));


  let beforeSleep = datetime.systemNow();
  util.sleep(1s);
  assert(math.floor(datetime.systemNow().timestamp - beforeSleep.timestamp) == 1);

}







