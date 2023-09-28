let d = std.Duration.fromMinutes(5);
let n = std.Number.fromStr("12");
assert(d.seconds == 5 * 60);
assert(n == 12);