// Regression test for https://github.com/winglang/wing/issues/5948
//
// An exception thrown from an inflight constructor (`inflight new()`) must
// be catchable by a `try { ... } catch { ... }` in a test body, just like
// an exception thrown from any other inflight operation.
//
// Before the fix, `$inflight_init` was called eagerly when the lifted
// client was constructed (during the IIFE that initializes the closure),
// so its throw escaped the user's `try` block entirely and the test was
// reported as failed. After the fix, `$inflight_init` runs lazily on the
// first method call, so the error surfaces inside the user's try/catch.

class InflightThrower {
  pub inflight operation() {
    throw "Exception from inflight operation";
  }
}

class InflightConstructorThrower {
  inflight new() {
    throw "Exception from inflight constructor";
  }

  pub inflight operation() {}
}

let constructoThrower = new InflightConstructorThrower();
let opThrower = new InflightThrower();

test "catch exception from test code" {
  try {
    throw "Weee";
  } catch e {}
}

test "catch exception in test from inflight op" {
  try {
    opThrower.operation();
  } catch e {}
}

test "catch exception in test from inflight ctor" {
  try {
    constructoThrower.operation();
  } catch e {}
}
