bring cloud;

let bucket = new cloud.Bucket();
bucket.addObject("k", "value");

let put_and_list = ["put", "list"];

class Foo {
  pub inflight mehtod() {
    lift(bucket, put_and_list); // Qualify `bucket` with a preflight expression
    lift(bucket, ["delete"]); // Qualify `bucket` with `delete` via literal
    let b = bucket; // Assign `bucket` to an inflight variable
    
    // `put` should work on `b` since we explicitly qualified `bucket` with `put`
    // no error generated here because of use of `lift()` in this method
    b.put("k2", "value2"); 

    // validate `put` worked and that we can also `list`
    assert(b.list() == ["k", "k2"]);

    // Validate `delete` works
    b.delete("k2");
    assert(bucket.tryGet("k2") == nil);
  }
}

let foo = new Foo();

test "explicit method lift qualification" {
  foo.mehtod();
}

// Similar to the above test, but using a closure
let inflight_closure = inflight () => {
  lift(bucket, ["put"]);
  let b = bucket;
  b.put("k3", "value3"); // Use inflight expression to access explicitly qualified `bucket`
  assert(bucket.get("k3") == "value3");
};

test "explicit closure lift qualification" {
  inflight_closure();
}
