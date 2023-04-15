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
  try {
    throw("hello");
  } finally {
    x = "finally with no catch";
  }
  assert(x == "finally with no catch");
} catch {
  // no op (we just dont want the inner exception to stop the test)
}

// Verify that finally is executed even if there's no catch block and no exception.
try {
} finally {
  x = "finally with no catch and no exception";
}
assert(x == "finally with no catch and no exception");

// Verify we can return from a closure in a finally block.
let return_from_finally = (():num => { try {} finally {return 1;}})();
assert(return_from_finally == 1);
// Verify we can return from a closure in a catch block.
let return_from_catch = (():num => { try {throw("");} catch {return 2;}})();
assert(return_from_catch == 2);
// Verify we can return from a closure in a try block.
let return_from_try = (():num => { try {return 3;} finally {}})();
assert(return_from_try == 3);