bring cloud;

let bucket1 = new cloud.Bucket() as "b1";
bucket1.addObject("k", "value");
let bucket2 = new cloud.Bucket() as "b2";
let bucket3 = new cloud.Bucket() as "b3";

class Foo {
  pub inflight mehtod() {
    // Qualify `bucket` with `delete`, `put` and `list` (multiple methods)
    // Qualify another preflight object (bucket2) with `put` (test multile qualifications in single statement)
    lift { bucket1: [delete, put, list], bucket2: [put] } { 
      let b1 = bucket1; // Assign `bucket` to an inflight variable
      
      // `put` should work on `b1` since we explicitly qualified `bucket1` with `put`
      // no error generated here because of use of `lift` in this method
      b1.put("k2", "value2"); 

      // validate `put` worked and that we can also `list`
      assert(b1.list() == ["k", "k2"]);

      // Validate `delete` works
      b1.delete("k2");

      // Try the other object
      let b2 = bucket2;
      b2.put("k2", "value2");

      // Nest another `lift` block, this time with the single method format (no square brackets)
      let b3 = bucket3;
      lift { bucket3: put } {
        b3.put("k3", "value3");
      }
    }
    assert(bucket1.tryGet("k2") == nil);
    assert(bucket2.get("k2") == "value2");
    assert(bucket3.get("k3") == "value3");
  }
}

let foo = new Foo();

test "explicit method lift qualification" {
  foo.mehtod();
}

// Similar to the above test, but using a closure
let inflight_closure = inflight () => {
  let b = bucket1;
  lift {bucket1: [put]} {
    b.put("k3", "value3"); // Use inflight expression to access explicitly qualified `bucket`
  }
  assert(bucket1.get("k3") == "value3");
};

test "explicit closure lift qualification" {
  inflight_closure();
}

// Explicit qualification of preflight interface type
interface PreflightInterface {
  inflight method(): str;
}

class PreflightClass impl PreflightInterface {
  pub inflight method(): str {
    return "ahoy there";
  }
}

let bar = new PreflightClass();

test "explicit interface lift qualification" {
  let x: PreflightInterface = bar;
  lift {bar: [method]} {
    assert(x.method() == "ahoy there");
  }
}