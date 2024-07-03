bring cloud;

class Foo {
  inflight var optionalVar: str?;
  
  inflight new() {
    this.optionalVar = nil;
  }

  pub inflight returnNil(t: bool): str? {
    if t {
      return "hello";
    }
    return nil;
  }

  pub inflight setOptionalValue(msg: str?) {
    this.optionalVar = msg;
  }

  pub inflight getOptionalValue(): str? {
    return this.optionalVar;
  }
}

let foo = new Foo();

test "nil return" {
  assert(foo.returnNil(true) != nil);
  assert(foo.returnNil(false) == nil);
}

test "optional instance variable" {
  assert(foo.getOptionalValue() == nil);
  foo.setOptionalValue("hello");
  assert(foo.getOptionalValue() != nil);
  foo.setOptionalValue(nil);
  assert(foo.getOptionalValue() == nil);
}
