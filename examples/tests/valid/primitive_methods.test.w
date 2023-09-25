let dur = 1m;
let dur2: duration = 10m;
let f = (d: duration) => {};
let stringy = "${dur.minutes}:${dur.seconds}";
log(stringy);

if stringy.contains("60") && stringy.split(":").at(0) == "60" {
  log("${stringy.length}!");
}

assert(num.fromStr("123") == 123);