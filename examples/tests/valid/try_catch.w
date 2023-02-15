let var x = "";
try {
  throw("hello");
  x = "no way I got here";
} catch e {
  assert(e == "hello");
  x = "caught";
} finally {
  assert(x == "caught");
  x = "finally";
}
assert(x == "finally");

try {
  x = "I got here";
} catch e {
  x = "caught";
} finally {
  assert(x == "I got here");
  x = "finally";
}
assert(x == "finally");