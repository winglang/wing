bring cloud;

let global_bucket = new cloud.Bucket();

let store_in_bucket = inflight (event: str, file: str): str => {
  global_bucket.put(file, event);
};

let handler1 = inflight (event: str): str => {
	store_in_bucket(event, "file1");
};     

let func1 = new cloud.Function(handler1) as "func1";

test "inflights can call other inflights" {
    func1.invoke("hi1");
}

// -----

class MyResource {
  closure: inflight (str): str;

  init() {
    this.closure = inflight (s: str): str => {
      global_bucket.list();
      return "hello";
    };
  }

  inflight foo(): str {
    return this.closure("anything");
  }
}

let x = new MyResource();

test "variable can be an inflight closure" {
  let val = x.foo();
  assert(val == "hello");
}
