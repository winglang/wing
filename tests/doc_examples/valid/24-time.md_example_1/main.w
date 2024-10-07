// This file was auto generated from an example found in: 24-time.md_example_1
// Example metadata: {"valid":true}
let now = datetime.utcNow();

log(now.toIso());

let then = datetime.fromIso("2020-09-09");
log(then.toIso());

log(then.year);
log(then.month);
log(then.dayOfWeek);
log(then.dayOfMonth);
log(then.hours);
log(then.min);
log(then.sec);
log(then.ms);

log(then.timestamp);
log(then.timestampMs);
log(then.timezone);
