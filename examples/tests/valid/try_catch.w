let var x = "";

// Verify throw works and both catch and finally are executed.
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

// Verify that finally is executed even if catch is skipped.
try {
  x = "I got here";
} catch e {
  x = "caught";
} finally {
  assert(x == "I got here");
  x = "finally";
}
assert(x == "finally");

// Verify that finally is executed even if there's no catch block.
try {
  throw("hello");
} finally {
  x = "finally with no catch";
}
assert(x == "finally with no catch");

// Verify that finally is executed even if there's no catch block and no exception.
try {
} finally {
  x = "finally with no catch and no exception";
}
assert(x == "finally with no catch and no exception");
