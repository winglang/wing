let dur = 1m;
let dur2: duration = 10m;
let f = (d: duration) => {};
let stringy = "${dur.minutes}:${dur.seconds}";
print(stringy);

if stringy.contains("60") && stringy.split(":").at(0) == "60" {
  print("${stringy.length}!");
}
