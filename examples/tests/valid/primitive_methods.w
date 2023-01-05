let dur = 1m;
let stringy = "${dur.minutes}:${dur.seconds}";
print(stringy);

if stringy.includes("60") && (stringy.split(":").at(0) == "60") {
  print("${stringy.length}!")
}
