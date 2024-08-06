bring expect;
let then: datetime = datetime.utcNow();
let now: datetime = then;


let isOlderOrEqual = inflight (x: datetime, y: datetime) => {
 return y.timestampMs >= x.timestampMs;
}; 

test "datetime is a valid type" {
  let later: datetime = datetime.fromComponents({
      day: now.dayOfMonth, 
      hour: now.hours, 
      year: now.year + 1, 
      min: now.min, 
      month: now.month, 
      ms: now.ms, 
      sec: now.sec, 
      tz: now.timezone
    });

  expect.ok(isOlderOrEqual(then, now));
  expect.ok(isOlderOrEqual(now, later));
}


let decimal: regex = regex.compile("^[0-9]*$");

let testString = inflight (re: regex, s: str) => {
  return re.test(s);
};

test "regex is valid type" {
  let binary: regex = regex.compile("^[0-1]*$");
  expect.equal(testString(decimal, "24"), true);
  expect.equal(testString(decimal, "340523"), true);
  expect.equal(testString(decimal, "a23"), false);

  expect.equal(testString(binary, "01101"), true);
  expect.equal(testString(binary, "0"), true);
  expect.equal(testString(binary, "120010"), false);
}



