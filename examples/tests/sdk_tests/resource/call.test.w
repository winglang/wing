// TODO
// test passing and returning values of different serializable Wing types

bring expect;
bring sim;

enum MyEnum {
  A,
  B,
  C
}

struct MyStruct {
  field1: str;
  field2: num;
}

inflight class MyResourceBackend impl sim.IResource {
  var field1: str;
  var field2: (str): str;
  var ctx: sim.IResourceContext?;
  new() {
    this.field1 = "hello";
    this.field2 = (name: str) => { return "Hello, " + name; };
    this.ctx = nil;
  }

  pub onStart(ctx: sim.IResourceContext) {
    this.ctx = ctx;
  }
  pub onStop() {}

  pub throwsError() {
    throw "Look ma, an error!";
  }

  pub printLogs() {
    this.ctx!.log("an info log");
    this.ctx!.log("another info log", sim.LogLevel.INFO);
    this.ctx!.log("a debug log", sim.LogLevel.DEBUG);
    this.ctx!.log("a verbose log", sim.LogLevel.VERBOSE);
    this.ctx!.log("a warn log", sim.LogLevel.WARN);
    this.ctx!.log("an error log", sim.LogLevel.ERROR);
  }

  pub methodNum(arg: num): num { return arg * 2; }
  pub methodStr(arg: str): str { return arg + arg; }
  pub methodBool(arg: bool): bool { return !arg; }
  pub methodOptNum1(arg: num?): num? { return arg; }
  pub methodOptNum2(arg: num?): num? { return nil; }
  pub methodJson(arg: Json): Json { return { value: arg }; }
  pub methodEnum(arg: MyEnum): MyEnum { assert(arg == MyEnum.A); return MyEnum.B; }
  pub methodArray(arg: Array<num>): Array<num> { return arg.slice(1, arg.length - 1); }
  pub methodMap(arg: Map<num>): Map<num> {
    let var res = MutMap<num>{};
    for key in arg.keys() {
      res[key] = arg[key] * 2;
    }
    return res.copy();
  }
  pub methodStruct(arg: MyStruct): MyStruct {
    return MyStruct{ field1: arg.field1 + arg.field1, field2: arg.field2 * 2 };
  }
  pub methodWithVariadics(arg1: str, ...arg2: Array<num>): num {
    let var res = num.fromStr(arg1);
    for arg in arg2 {
      res += arg;
    }
    return res;
  }
  pub methodWithComplexTypes1(arg1: Array<MyStruct>): Map<num> {
    return { "field1Length": arg1[0].field1.length };
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
    // calling a function-typed property works as expected
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
  pub inflight printLogs() {
    this.backend.call("printLogs");
  }

  pub inflight methodNum(arg: num): num {
    return num.fromJson(this.backend.call("methodNum", [Json arg]));
  }
  pub inflight methodStr(arg: str): str {
    return str.fromJson(this.backend.call("methodStr", [Json arg]));
  }
  pub inflight methodBool(arg: bool): bool {
    return bool.fromJson(this.backend.call("methodBool", [Json arg]));
  }
  pub inflight methodOptNum1(arg: num?): num? {
    // TODO: need a way to convert from Json to num?
    return unsafeCast(this.backend.call("methodOptNum1", [Json arg]));
  }
  pub inflight methodOptNum2(arg: num?): num? {
    // TODO: need a way to convert from Json to num?
    return unsafeCast(this.backend.call("methodOptNum2", [Json arg]));
  }
  pub inflight methodJson(arg: Json): Json {
    return this.backend.call("methodJson", [arg]);
  }
  pub inflight methodEnum(arg: MyEnum): MyEnum {
    // TODO: safer way to convert to and from enums
    return unsafeCast(this.backend.call("methodEnum", [Json "{arg}"]));
  }
  pub inflight methodArray(arg: Array<num>): Array<num> {
    // TODO: Array.fromJson - https://github.com/winglang/wing/issues/1796
    return unsafeCast(this.backend.call("methodArray", [Json arg]));
  }
  pub inflight methodMap(arg: Map<num>): Map<num> {
    // TODO: Map.fromJson - https://github.com/winglang/wing/issues/1796
    return unsafeCast(this.backend.call("methodMap", [Json arg]));
  }
  pub inflight methodStruct(arg: MyStruct): MyStruct {
    return MyStruct.fromJson(this.backend.call("methodStruct", [Json arg]));
  }
  pub inflight methodWithVariadics(arg1: str, arg2: num, arg3: num): num {
    // TODO: spreading variadic arguments?
    return num.fromJson(this.backend.call("methodWithVariadics", [Json arg1, Json arg2, Json arg3]));
  }
  pub inflight methodWithComplexTypes1(arg1: Array<MyStruct>): Map<num> {
    // TODO: Map.fromJson - https://github.com/winglang/wing/issues/1796
    return unsafeCast(this.backend.call("methodWithComplexTypes1", [Json arg1]));
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
  // managing the resource's lifecycle.
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

test "resource.call can accept and return various kinds of values" {
  expect.equal(r1.methodNum(42), 84);
  expect.equal(r1.methodStr("hello"), "hellohello");
  expect.equal(r1.methodBool(true), false);
  expect.equal(r1.methodOptNum1(42), 42);
  expect.equal(r1.methodOptNum2(42), nil);
  expect.equal(r1.methodJson({ value: 42 }), { value: { value: 42 } });
  expect.equal(r1.methodEnum(MyEnum.A), MyEnum.B);
  expect.equal(r1.methodArray([1, 2, 3]), [2]);
  expect.equal(r1.methodMap({ a: 1, b: 2 }), { a: 2, b: 4 });
  expect.equal(r1.methodStruct({ field1: "hello", field2: 42 }), { field1: "hellohello", field2: 84 });
  expect.equal(r1.methodWithVariadics("1", 2, 3), 6);
  expect.equal(r1.methodWithComplexTypes1([{ field1: "hello", field2: 42 }]), { field1Length: 5 });
}

test "resource can log messages at different levels" {
  r1.printLogs();
}
