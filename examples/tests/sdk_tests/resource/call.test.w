// TODO
// test passing and returning values of different serializable Wing types

bring expect;
bring sim;

inflight class MyResourceBackend impl sim.IResource {
  var field1: str;
  var field2: (str): str;
  new() {
    this.field1 = "hello";
    this.field2 = (name: str) => { return "Hello, " + name; };
  }

  pub onStart(ctx: sim.IResourceContext) {}
  pub onStop() {}

  pub throwsError() {
    throw "Look ma, an error!";
  }
}

class MyResource {
  backend: sim.Resource;
  new() {
    this.backend = new sim.Resource(inflight () => {
      return new MyResourceBackend();
    });
  }
  pub inflight field1(): str {
    return str.fromJson(this.backend.call("field1"));
  }
  pub inflight field2(name: str): str {
    return str.fromJson(this.backend.call("field2", [Json name]));
  }
  pub inflight field1WithArgs(): str {
    // if you are passing arguments to call(), we assume you're trying to call a function.
    // since field1 is a property, this will throw an error
    return str.fromJson(this.backend.call("field1", [Json "arg1", Json "arg2"]));
  }
  pub inflight invalidField(): str {
    return str.fromJson(this.backend.call("invalidField"));
  }
  pub inflight onStart() {
    this.backend.call("onStart");
  }
  pub inflight onStop() {
    this.backend.call("onStop");
  }
  pub inflight throwsError() {
    this.backend.call("throwsError");
  }
}

let r1 = new MyResource();

test "resource.call with a field name returns the field value" {
  expect.equal(r1.field1(), "hello");
  expect.equal(r1.field2("world"), "Hello, world");

  let var msg = "";
  try {
    r1.field1WithArgs();
  } catch err {
    msg = err;
  }
  assert(msg.contains("Property \"field1\" is not a function"));

  try {
    r1.invalidField();
  } catch err {
    msg = err;
  }
  assert(msg.contains("Method or property \"invalidField\" not found"));
}

test "resource.call cannot be used to call onStart or onStop" {
  // These are reserved methods that are called by the simulator for
  // managing the resource's lifecycle
  let var msg = "";
  try {
    r1.onStart();
  } catch err {
    msg = err;
  }
  assert(msg.contains("Cannot call \"onStart\""));

  try {
    r1.onStop();
  } catch err {
    msg = err;
  }
  assert(msg.contains("Cannot call \"onStop\""));
}

test "exceptions thrown by the resource are caught and rethrown by the caller" {
  let var msg = "";
  try {
    r1.throwsError();
  } catch err {
    msg = err;
  }
  assert(msg.contains("Look ma, an error!"));
}
