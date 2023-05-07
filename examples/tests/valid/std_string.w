bring cloud;

let s1 = "some string";
let s2 = "s are immutable";
assert(s1.length == 11);
assert(s1.at(7) == "r");
assert(s1.concat(s2) == "some strings are immutable");
assert(s1.contains("some"));
assert(!"some".contains(s1));
assert(s1.ends_with("string"));
assert(s1.index_of("s") == 0);
assert("Some String".lowercase() == "some string");
assert(s1.split(" ").at(0) == "some");
assert(s1.starts_with("some"));
assert(s1.substring(5) == "string");
assert(s1.substring(5, 7) == "st");
assert("   some string   ".trim() == "some string");
assert("Some String".uppercase() == "SOME STRING");
assert("hello" + " world" == "hello world");
  
// For debugging the test
new cloud.Function(inflight () => {
  log("index of \"s\" in s1 is ${s1.index_of("s")}");
  log(s1.split(" ").at(1));
  log(s1.concat(s2));
}) as "test:string";