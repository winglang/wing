// TODO
// test passing and returning values of different serializable Wing types
// test throwing errors
// test that you cannot call "onStart" or "onStop"
// test for an error when calling a method that doesn't exist

bring expect;
bring sim;

inflight class ResourceWithPropertiesBackend impl sim.IResource {
  var field1: str;
  var field2: (str): str;
  new() {
    this.field1 = "hello";
    this.field2 = (name: str) => { return "Hello, " + name; };
  }

  pub onStart(ctx: sim.IResourceContext) {}
  pub onStop() {}
}

class ResourceWithProperties {
  backend: sim.Resource;
  new() {
    this.backend = new sim.Resource(inflight () => {
      return new ResourceWithPropertiesBackend();
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
}

let r1 = new ResourceWithProperties();

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
