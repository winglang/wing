bring cloud;

class Knull {
  inflight var optionalVar: str?;
  
  init() {
    this.optionalVar = nil;
  }

  inflight returnNil(t: bool): str? {
    if t {
      return "hello";
    }
    return nil;
  }

  inflight setOptionalValue(msg: str?) {
    this.optionalVar = msg;
  }

  inflight getOptionalValue(): str? {
    return this.optionalVar;
  }
}

let knull = new Knull();

test "nil return" {
  assert(knull.returnNil(true)? == true);
  assert(knull.returnNil(false)? == false);
}

test "optional instance variable" {
  assert(knull.getOptionalValue()? == false);
  knull.setOptionalValue("hello");
  assert(knull.getOptionalValue()? == true);
  assert(knull.getOptionalValue() != nil);
  knull.setOptionalValue(nil);
  assert(knull.getOptionalValue()? == false);
  assert(knull.getOptionalValue() == nil);
}